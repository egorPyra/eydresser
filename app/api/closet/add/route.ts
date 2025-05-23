import { NextResponse, NextRequest } from 'next/server';
import { prisma } from '../../../../prisma/prisma-client';
import { uploadBufferToS3, removeBackground, analyzeClothing } from '../../../../tools';

export const config = {
  api: {
    bodyParser: false,  // Отключаем встроенный парсер для обработки FormData
  },
};

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
        
        // Преобразуем File в Buffer для загрузки
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        
        // Шаг 1: Создаем временный URL для отправки в PhotoRoom
        const tempFileName = `temp-image-${Date.now()}`;
        const { url: tempImageUrl } = await uploadBufferToS3(buffer, tempFileName, file.type);
        
        // Шаг 2: Удаляем фон с помощью PhotoRoom API
        console.log('Удаляем фон изображения...');
        const processedImageBuffer = await removeBackground(tempImageUrl);
        
        // Шаг 3: Загружаем обработанное изображение в Yandex S3
        console.log('Загружаем обработанное изображение в S3...');
        const { url, key } = await uploadBufferToS3(processedImageBuffer, file.name, 'image/png');
        
        // Шаг 4: Отправляем обработанное изображение в OpenAI Vision API для анализа
        console.log('Анализируем изображение с помощью OpenAI Vision API...');
        const clothingAttributes = await analyzeClothing(url);
        
        // Шаг 5: Создаем запись в базе данных с атрибутами
        const newClothes = await prisma.clothes.create({
          data: {
            name,
            imageUrl: url,  // Сохраняем ссылку на изображение без фона
            userId: parseInt(userId, 10),
          },
        });
        
        // Возвращаем данные с URL изображения и атрибутами
        return NextResponse.json({
          newClothes,
          url,
          key,
          attributes: clothingAttributes
        });
      } 
      // Обработка обычного JSON запроса (как раньше)
      else {
        const { name, image, userId } = await req.json(); // Принимаем JSON данные
           const newClothes = await prisma.clothes.create({
        data: {
          name,
          imageUrl: image,  // Сохраняем ссылку на изображение
          userId: parseInt(userId, 10),
        },
      });
  
        return NextResponse.json({ newClothes });
      }
    } catch (error) {
      console.error("Error adding item:", error);
      return NextResponse.json({ error: 'Failed to add item' }, { status: 500 });
    }
}
  