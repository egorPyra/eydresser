import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../../prisma/prisma-client';

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const { userId, clothesId, type, color, material, season } = body;
    
    if (!userId || !clothesId) {
      return NextResponse.json({ error: 'Отсутствуют обязательные параметры' }, { status: 400 });
    }
    
    // Преобразуем ID из строки в число, так как в схеме они числовые
    const clothesIdNum = parseInt(clothesId);
    const userIdNum = parseInt(userId);
    
    // Обновляем параметры одежды
    const updatedClothes = await prisma.clothes.update({
      where: {
        id: clothesIdNum,
        userId: userIdNum,
      },
      data: {
        type: type || '',
        color: color || '',
        material: material || '',
        season: season || '',
      },
    });
    
    return NextResponse.json({ success: true, clothes: updatedClothes }, { status: 200 });
  } catch (error) {
    console.error('Ошибка при обновлении параметров одежды:', error);
    return NextResponse.json({ error: 'Внутренняя ошибка сервера' }, { status: 500 });
  }
}