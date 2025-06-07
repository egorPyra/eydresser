// /api/closet/unlink-from-outfits.ts
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../../prisma/prisma-client';

export async function POST(req: NextRequest) {
  try {
    const { clothesId } = await req.json();
    await prisma.outfitClothes.deleteMany({
      where: { clothesId },
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Ошибка при удалении связей:', error);
    return NextResponse.json({ error: 'Ошибка сервера' }, { status: 500 });
  }
}
