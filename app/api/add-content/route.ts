import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';
 
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get('title');
  const subtitle = searchParams.get('subtitle');
  const description = searchParams.get('description');
  const year = searchParams.get('year');
  const role = searchParams.get('role');
  const page = searchParams.get('page');
  const image = searchParams.get('image');
  const type = searchParams.get('type');
  const status = searchParams.get('status');

  try {
    if (!title ) throw new Error('Title required');
    await sql`INSERT INTO Content (Title, Subtitle, Description, Year, Role, Page, Image, Type, Status) VALUES (${title}, ${subtitle}, ${description}, ${year}, ${role}, ${page}, ${image}, ${type}, ${status});`;
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
 
  const content = await sql`SELECT * FROM Content;`;
  return NextResponse.json({ content }, { status: 200 });
}