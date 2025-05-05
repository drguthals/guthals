import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

async function getBookDetails(url: string): Promise<{
  coverImage: string | null;
  title: string | null;
  authors: Array<{
    name: string;
    link: string | null;
  }>;
  publishDate: Date | null;
}> {
  try {
    const response = await fetch(`https://api.rainforestapi.com/request?api_key=${process.env.RAINFOREST_API_KEY}&type=product&url=${encodeURIComponent(url)}`);
    const data = await response.json();
    
    const coverImage = data.product.main_image?.link || null;
    const title = data.product.title || null;
    
    // Get all authors with their links
    const authors = data.product.authors?.map((author: { name: string; link?: string }) => ({
      name: author.name,
      link: author.link || null
    })) || [];

    // If no authors found but there's a brand, use that
    if (authors.length === 0 && data.product.brand) {
      authors.push({ name: data.product.brand, link: null });
    }

    const publishDate = data.product.publication_date ? new Date(data.product.publication_date) : null;

    console.log('Processed Amazon Data:', {
      coverImage,
      title,
      authors,
      publishDate
    });
    
    return {
      coverImage,
      title,
      authors,
      publishDate
    };
  } catch (error) {
    console.error('Error fetching book data:', error);
    return { 
      coverImage: null, 
      title: null, 
      authors: [], 
      publishDate: null
    };
  }
}

async function findOrCreateAuthor(name: string, amazonLink: string | null) {
  // Try to find existing author
  let author = await prisma.author.findFirst({
    where: { name }
  });

  // Create new author if doesn't exist
  if (!author) {
    author = await prisma.author.create({
      data: {
        name,
        amazonAuthorUrl: amazonLink,
      }
    });
  } else if (amazonLink && !author.amazonAuthorUrl) {
    // Update existing author with Amazon link if they don't have one
    author = await prisma.author.update({
      where: { id: author.id },
      data: { amazonAuthorUrl: amazonLink }
    });
  }

  return author;
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const id = params.id;
    const body = await request.json();
    let { coverImage, title, publishDate } = body;
    
    if (body.url) {
      const details = await getBookDetails(body.url);
      coverImage = coverImage || details.coverImage;
      title = title || details.title;
      publishDate = publishDate || details.publishDate;

      // Create or find all authors
      if (details.authors.length > 0) {
        // Get the first author for the main book relationship
        const mainAuthor = await findOrCreateAuthor(
          details.authors[0].name,
          details.authors[0].link
        );
        body.authorId = mainAuthor.id;

        // Create any additional authors
        for (let i = 1; i < details.authors.length; i++) {
          await findOrCreateAuthor(
            details.authors[i].name,
            details.authors[i].link
          );
        }
      }
    }
    
    const book = await prisma.book.update({
      where: { id },
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
    return NextResponse.json({ error: 'Error updating book' }, { status: 500 });
  }
} 