import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma'; // You'll need to set up your Prisma client

export async function GET() {
    try {
        const books = await prisma.book.findMany();
        return NextResponse.json(books);
    } catch (error) {
        return NextResponse.json({ error: 'Error fetching books' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const book = await prisma.book.create({
            data: {
                title: body.title,
                url: body.url,
            },
        });
        return NextResponse.json(book);
    } catch (error) {
        console.error('Error details:', error);
        return NextResponse.json({ error: 'Error creating book' }, { status: 500 });
    }
}