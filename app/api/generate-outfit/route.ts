import { generateOutfitFromClothes } from '../../../tools/generateOutfitFromClothes';
import { prisma } from '../../../prisma/prisma-client';

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  try {
    const { userId, prompt } = await req.json();

    if (!userId || !prompt) {
      return new Response(JSON.stringify({ error: 'userId и prompt обязательны' }), { status: 400 });
    }

    // Получаем одежду пользователя
    const clothes = await prisma.clothes.findMany({
      where: { userId },
      select: {
        id: true,
        type: true,
        color: true,
        material: true,
        season: true,
        imageUrl: true,
      },
    });

    const result = await generateOutfitFromClothes(clothes, prompt);

    // Добавляем imageUrl и name к каждому элементу
    const enriched = result.map((item) => {
      const original = clothes.find((c) => c.id === item.id);
      return {
        ...item,
        imageUrl: original?.imageUrl || '',
        name: original?.type || '',
      };
    });

    return new Response(JSON.stringify({ images: enriched }), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: 'Ошибка при генерации образа' }), { status: 500 });
  }
}
