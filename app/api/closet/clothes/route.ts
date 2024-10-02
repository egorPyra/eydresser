import { NextResponse } from 'next/server';
import { prisma } from '../../../../prisma/prisma-client';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get('userId');

  if (!userId) {
    return NextResponse.json({ error: "User ID is required" }, { status: 400 });
  }

  try {
    const clothes = await prisma.clothes.findMany({
      where: { userId: parseInt(userId, 10) },
      include: { outfitClothes: true }  // To include outfits associated with clothes, if needed
    });

    return NextResponse.json({ clothes });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch clothes" }, { status: 500 });
  }
}
