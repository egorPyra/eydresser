import { NextResponse } from 'next/server';
import { prisma } from '../../../../prisma/prisma-client';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get('userId');

  if (!userId) {
    return NextResponse.json({ error: "User ID is required" }, { status: 400 });
  }

  try {
    const outfits = await prisma.outfit.findMany({
      where: { userId: parseInt(userId, 10) },
      include: { clothes: true }  // Include associated clothes for each outfit
    });

    return NextResponse.json({ outfits });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch outfits" }, { status: 500 });
  }
}
