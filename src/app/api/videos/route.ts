import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
    try {
        const videos = await prisma.video.findMany();
        return NextResponse.json(videos);
    } catch (error) {
        return NextResponse.json({ error: 'Error fetching videos' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const video = await prisma.video.create({
            data: {
                title: body.title,
                url: body.url,
            },
        });
        return NextResponse.json(video);
    } catch (error) {
        return NextResponse.json({ error: 'Error creating video' }, { status: 500 });
    }
}