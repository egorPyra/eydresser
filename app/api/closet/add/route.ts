import { NextResponse, NextRequest } from 'next/server';
import { prisma } from '../../../../prisma/prisma-client';
import { uploadBufferToS3, analyzeClothing } from '../../../../tools';
import { PhotoRoomAPI } from '../../../../tools/photoroom';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    // Проверяем тип содержимого
    const contentType = req.headers.get('content-type') || '';

    // Обработка запроса с FormData (загрузка файла)
    if (contentType.includes('multipart/form-data')) {
      const formData = await req.formData();

      // Получаем файл и данные пользователя из FormData
      const file = formData.get('image') as File;
      const userId = formData.get('userId') as string;
      let name = formData.get('name') as string;

      if (!file) {
        return NextResponse.json(
          { error: 'Файл не найден', details: 'Файл изображения не найден в запросе' },
          { status: 400 }
        );
      }

      // Проверяем, что загружается изображение
      if (!file.type.startsWith('image/')) {
        return NextResponse.json(
          { error: 'Неверный формат файла', details: 'Поддерживаются только изображения' },
          { status: 400 }
        );
      }

      // Используем имя файла, если имя не предоставлено
      if (!name) {
        name = file.name.split('.')[0] || 'Предмет одежды';
      }

      // Преобразуем File в Buffer для обработки
      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      // Шаг 1: Удаляем фон напрямую из буфера с изображением
      console.log('Удаляем фон изображения...');
      const photoRoom = new PhotoRoomAPI(process.env.PHOTOROOM_API_KEY || '');
      const processedImageBuffer = await photoRoom.removeBackgroundFromBuffer(buffer);

      // Шаг 2: Загружаем обработанное изображение в Yandex S3
      console.log('Загружаем обработанное изображение в S3...');
      const { url, key } = await uploadBufferToS3(processedImageBuffer, file.name, 'image/png');

      // Шаг 3: Отправляем обработанное изображение в OpenAI Vision API для анализа
      console.log('Анализируем изображение с помощью OpenAI Vision API...');
      const clothingAttributes = await analyzeClothing(url);
      console.log('Атрибуты одежды:', clothingAttributes);

      // Шаг 4: Создаем запись в базе данных с атрибутами
      const newClothes = await prisma.clothes.create({
        data: {
          name,
          imageUrl: url,  // Сохраняем ссылку на изображение без фона
          userId: parseInt(userId, 10),
          type: clothingAttributes.type || '',
          color: clothingAttributes.color || '',
          season: clothingAttributes.season || '',
          material: clothingAttributes.material || ''
        },
      });

      // Возвращаем данные с URL изображения и атрибутами
      return NextResponse.json({
        newClothes,
      });
    }
    // Обработка обычного JSON запроса (как раньше)
    else {
      return NextResponse.json(
        { error: 'Неправильный формат', details: 'Требуется multipart/form-data' },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error("Error adding item:", error);
    return NextResponse.json({ error: 'Failed to add item' }, { status: 500 });
  }
}
