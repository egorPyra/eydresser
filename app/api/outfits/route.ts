import { NextResponse } from 'next/server';
import { prisma } from '@/prisma/prisma-client';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json(
        { error: 'Необходимо указать параметр userId' },
        { status: 400 }
      );
    }
    const userIdInt = parseInt(userId);

    const outfits = await prisma.outfit.findMany({
      where: {
        userId: userIdInt,
      },
      include: {
        clothes: {
          include: {
            clothes: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json({outfits: outfits}, { status: 200 });
  } catch (error) {
    console.error('Ошибка при получении нарядов:', error);
    return NextResponse.json(
      { error: 'Ошибка при получении нарядов' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  return NextResponse.json({ message: "This is a placeholder for the POST request" }, { status: 200 });
}
