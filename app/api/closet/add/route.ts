import { NextResponse } from 'next/server';
import { prisma } from '../../../../prisma/prisma-client';

export async function POST(req: Request) {
    try {
      const { name, image, userId } = await req.json(); // Принимаем JSON данные
      
      const newClothes = await prisma.clothes.create({
        data: {
          name,
          imageUrl: image,  // Сохраняем ссылку на изображение
          userId: parseInt(userId, 10),
        },
      });
  
      return NextResponse.json({ newClothes });
    } catch (error) {
      console.error("Error adding item:", error);
      return NextResponse.json({ error: 'Failed to add item' }, { status: 500 });
    }
  }
  