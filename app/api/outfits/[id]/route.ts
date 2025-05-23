import { NextResponse } from 'next/server';
import { prisma } from '@/prisma/prisma-client';

// GET /api/outfits/[id]
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    
    if (!id) {
      return NextResponse.json(
        { error: 'ID образа не указан' },
        { status: 400 }
      );
    }
    
    const outfitId = parseInt(id);
    
    // Проверяем существование образа
    const outfit = await prisma.outfit.findUnique({
      where: {
        id: outfitId,
      },
      include: {
        clothes: {
          include: {
            clothes: true,
          },
        },
      },
    });

    if (!outfit) {
      return NextResponse.json(
        { error: 'Образ не найден' },
        { status: 404 }
      );
    }

    return NextResponse.json(outfit, { status: 200 });
  } catch (error) {
    console.error('Ошибка при получении образа:', error);
    return NextResponse.json(
      { error: 'Ошибка при получении данных образа' },
      { status: 500 }
    );
  }
}

// PUT /api/outfits/[id] - обновление существующего образа
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    
    if (!id) {
      return NextResponse.json(
        { error: 'ID образа не указан' },
        { status: 400 }
      );
    }
    
    const outfitId = parseInt(id);
    const data = await request.json();
    const { name, clothes, userId } = data;
    
    if (!name || !clothes || !userId) {
      return NextResponse.json(
        { error: 'Необходимо указать name, clothes и userId' },
        { status: 400 }
      );
    }
    
    // Проверяем существование образа
    const existingOutfit = await prisma.outfit.findUnique({
      where: {
        id: outfitId,
      },
    });

    if (!existingOutfit) {
      return NextResponse.json(
        { error: 'Образ не найден' },
        { status: 404 }
      );
    }

    // Проверяем, принадлежит ли образ запрашивающему пользователю
    if (existingOutfit.userId !== parseInt(userId)) {
      return NextResponse.json(
        { error: 'У вас нет прав на редактирование этого образа' },
        { status: 403 }
      );
    }

    // Обновление образа - сначала удаляем все связи с одеждой
    await prisma.outfitClothes.deleteMany({
      where: {
        outfitId: outfitId,
      },
    });

    // Обновляем основные данные образа
    const updatedOutfit = await prisma.outfit.update({
      where: {
        id: outfitId,
      },
      data: {
        name,
        clothes: {
          create: clothes.map((item: any) => ({
            clothesId: item.id,
            positionX: item.positionX,
            positionY: item.positionY,
            rotation: item.rotation || 0,
          })),
        },
      },
      include: {
        clothes: true,
      },
    });

    return NextResponse.json(updatedOutfit, { status: 200 });
  } catch (error) {
    console.error('Ошибка при обновлении образа:', error);
    return NextResponse.json(
      { error: 'Ошибка при обновлении образа' },
      { status: 500 }
    );
  }
}

// DELETE /api/outfits/[id] - удаление образа
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    
    if (!id) {
      return NextResponse.json(
        { error: 'ID образа не указан' },
        { status: 400 }
      );
    }
    
    if (!userId) {
      return NextResponse.json(
        { error: 'Необходимо указать параметр userId' },
        { status: 400 }
      );
    }
    
    const outfitId = parseInt(id);
    const userIdInt = parseInt(userId);
    
    // Проверяем существование образа
    const existingOutfit = await prisma.outfit.findUnique({
      where: {
        id: outfitId,
      },
    });

    if (!existingOutfit) {
      return NextResponse.json(
        { error: 'Образ не найден' },
        { status: 404 }
      );
    }

    // Проверяем, принадлежит ли образ запрашивающему пользователю
    if (existingOutfit.userId !== userIdInt) {
      return NextResponse.json(
        { error: 'У вас нет прав на удаление этого образа' },
        { status: 403 }
      );
    }

    // Удаляем связанные данные и сам образ
    await prisma.$transaction([
      // Сначала удаляем все связи с одеждой
      prisma.outfitClothes.deleteMany({
        where: {
          outfitId: outfitId,
        },
      }),
      // Затем удаляем сам образ
      prisma.outfit.delete({
        where: {
          id: outfitId,
        },
      }),
    ]);

    return NextResponse.json(
      { message: 'Образ успешно удален' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Ошибка при удалении образа:', error);
    return NextResponse.json(
      { error: 'Ошибка при удалении образа' },
      { status: 500 }
    );
  }
}
