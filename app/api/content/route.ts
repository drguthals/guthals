import { type NextRequest } from 'next/server'
import { Type } from '@prisma/client';
import { helpers } from "@/prisma/helpers";

export async function GET (request: NextRequest) {
  // Define the allowed enum values
  const allowedTypes = Object.values(Type);
  const searchParams = request.nextUrl.searchParams
  const type = searchParams.get('type')

  // Validate the type parameter
  if ( !type || !allowedTypes.includes(type as Type)) {
    return Response.json({ error: 'Invalid type parameter' }, { status: 400 });
  }

  try {
    const data = await helpers.getContentByType(type as Type);
    return Response.json(data);
  } catch (error) {
    return Response.json({ error: 'Failed to fetch data' }, { status: 500 });
  } 
}