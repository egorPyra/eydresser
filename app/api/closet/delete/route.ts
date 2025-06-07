import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../../prisma/prisma-client';

export async function DELETE(req: NextRequest) {
  try {
    const body = await req.json();
    const { userId, clothesId } = body;

    if (!userId || !clothesId) {
      return NextResponse.json({ error: 'Отсутствуют обязательные параметры' }, { status: 400 });
    }

    const clothesIdNum = parseInt(clothesId);
    const userIdNum = parseInt(userId);

    // Убедимся, что вещь принадлежит пользователю
    const item = await prisma.clothes.findFirst({
      where: {
        id: clothesIdNum,
        userId: userIdNum,
      },
    });

    if (!item) {
      return NextResponse.json({ error: 'Вещь не найдена' }, { status: 404 });
    }

    await prisma.clothes.delete({
      where: { id: clothesIdNum },
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('Ошибка при удалении одежды:', error);
    return NextResponse.json({ error: 'Внутренняя ошибка сервера' }, { status: 500 });
  }
}
