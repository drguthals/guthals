import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
    try {
        const books = await prisma.book.findMany();
        return NextResponse.json(books);
    } catch (error) {
        console.error('Error details:', error);
        return NextResponse.json({ error: 'Error fetching books' }, { status: 500 });
    }
}

async function getBookImage(url: string): Promise<string | null> {
  try {
    const response = await fetch(`https://api.rainforestapi.com/request?api_key=${process.env.RAINFOREST_API_KEY}&type=product&url=${encodeURIComponent(url)}`);
    const data = await response.json();
    return data.product.main_image?.link || null;
  } catch (error) {
    console.error('Error fetching book data:', error);
    return null;
  }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        let { title, author, publishDate } = body;
        let coverImage = null;
        
        if (body.url) {
            const details = await getBookDetails(body.url);
            coverImage = details.coverImage;
            title = title || details.title;
            author = author || details.author;
            publishDate = publishDate || details.publishDate;
        }
        
        const book = await prisma.book.create({
            data: {
                title,
                url: body.url,
                coverImage,
                publishDate,
            },
        });
        
        return NextResponse.json(book);
    } catch (error) {
        console.error('Error details:', error);
        return NextResponse.json({ error: 'Error creating book' }, { status: 500 });
    }
}

async function getBookDetails(url: string): Promise<{
  coverImage: string | null;
  title: string | null;
  author: string | null;
  publishDate: Date | null;
}> {
  try {
    const response = await fetch(`https://api.rainforestapi.com/request?api_key=${process.env.RAINFOREST_API_KEY}&type=product&url=${encodeURIComponent(url)}`);
    const data = await response.json();
    
    return {
      coverImage: data.product.main_image?.link || null,
      title: data.product.title || null,
      author: data.product.author || data.product.brand || null,
      publishDate: data.product.publication_date ? new Date(data.product.publication_date) : null,
    };
  } catch (error) {
    console.error('Error fetching book data:', error);
    return { coverImage: null, title: null, author: null, publishDate: null };
  }
}

export async function PUT(request: Request) {
    try {
        const body = await request.json();
        let coverImage = body.coverImage;
        
        if (!coverImage && body.url) {
            coverImage = await getBookImage(body.url);
            console.log('Fetched cover image:', coverImage);
        }
        
        const book = await prisma.book.update({
            where: {
                id: body.id
            },
            data: {
                title: body.title,
                url: body.url,
                coverImage: coverImage,
            },
        });
        
        return NextResponse.json(book);
    } catch (error) {
        console.error('Error details:', error);
        return NextResponse.json({ error: 'Error updating book' }, { status: 500 });
    }
}