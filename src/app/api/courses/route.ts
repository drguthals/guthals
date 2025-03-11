import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
    try {
        const courses = await prisma.course.findMany();
        return NextResponse.json(courses);
    } catch (error) {
        return NextResponse.json({ error: 'Error fetching courses' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const course = await prisma.course.create({
            data: {
                title: body.title,
                url: body.url,
            },
        });
        return NextResponse.json(course);
    } catch (error) {
        return NextResponse.json({ error: 'Error creating course' }, { status: 500 });
    }
}