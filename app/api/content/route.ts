import { type NextRequest } from 'next/server'
import { PrismaClient, Type } from '@prisma/client';

const prisma = new PrismaClient();

// Define the allowed enum values
const allowedTypes = Object.values(Type);

export async function GET (request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const type = searchParams.get('type')

  // Validate the type parameter
  if ( !type || !allowedTypes.includes(type as Type)) {
    return Response.json({ error: 'Invalid type parameter' }, { status: 400 });
  }

  try {
    const data = await prisma.content.findMany({
      where: {
        type: type as Type
      },
      select: {
        id: true,
        key: true,
        title: true,
        subtitle: true,
        exturl: true,
        image: true,
      }
    });
    return Response.json(data);
  } catch (error) {
    return Response.json({ error: 'Failed to fetch data' }, { status: 500 });
  } 
}