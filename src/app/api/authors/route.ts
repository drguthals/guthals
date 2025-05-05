import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
    try {
        const authors = await prisma.author.findMany({
            include: {
                languages: true,
                books: true,
                videos: true,
                courses: true,
                research: true,
                blogPosts: true,
            }
        });
        return NextResponse.json(authors);
    } catch (error) {
        console.error('Error details:', error);
        return NextResponse.json({ error: 'Error fetching authors' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const author = await prisma.author.create({
            data: {
                name: body.name,
                email: body.email,
                prefix: body.prefix,
                suffix: body.suffix,
                pronouns: body.pronouns,
                title: body.title,
                company: body.company,
                bio: body.bio,
                image: body.image,
                timezone: body.timezone,
                website: body.website,
                externalLinks: body.externalLinks,
                languages: {
                    create: body.languages?.map((lang: any) => ({
                        code: lang.code,
                        name: lang.name,
                        proficiency: lang.proficiency,
                    })) || [],
                },
            },
            include: {
                languages: true,
            },
        });
        return NextResponse.json(author);
    } catch (error) {
        console.error('Error details:', error);
        return NextResponse.json({ error: 'Error creating author' }, { status: 500 });
    }
} 