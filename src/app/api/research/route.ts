import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
    try {
        const research = await prisma.research.findMany();
        return NextResponse.json(research);
    } catch (error) {
        return NextResponse.json({ error: 'Error fetching research' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const research = await prisma.research.create({
            data: {
                title: body.title,
                url: body.url,
            },
        });
        return NextResponse.json(research);
    } catch (error) {
        return NextResponse.json({ error: 'Error creating research' }, { status: 500 });
    }
}