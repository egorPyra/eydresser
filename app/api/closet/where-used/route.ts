// /api/closet/where-used.ts
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../../prisma/prisma-client';

export async function POST(req: NextRequest) {
  try {
    const { clothesId } = await req.json();

    const outfits = await prisma.outfitClothes.findMany({
      where: { clothesId },
      select: { outfitId: true },
    });

    return NextResponse.json({ outfitIds: outfits.map(o => o.outfitId) });
  } catch (error) {
    console.error('Ошибка при поиске использования вещи:', error);
    return NextResponse.json({ error: 'Ошибка сервера' }, { status: 500 });
  }
}
