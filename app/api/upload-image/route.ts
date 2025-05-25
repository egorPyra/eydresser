import { NextRequest, NextResponse } from 'next/server';
import { uploadBufferToS3 } from '../../../tools';

export const runtime = 'nodejs';


export async function POST(req: NextRequest) {
  try {
    // Проверяем, что запрос содержит multipart/form-data
    const contentType = req.headers.get('content-type') || '';
    if (!contentType.includes('multipart/form-data')) {
      return NextResponse.json(
        { error: 'Неверный тип содержимого', details: 'Требуется multipart/form-data' },
        { status: 400 }
      );
    }
    
    try {
      // Получаем FormData из запроса
      const formData = await req.formData();
      
      // Получаем файл из формы
      const file = formData.get('image') as File;
      
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
      
      // Преобразуем File в Buffer для загрузки
      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      
      // Загружаем изображение в Yandex S3
      const { url, key } = await uploadBufferToS3(buffer, file.name, file.type);
      
      // Возвращаем URL загруженного изображения
      return NextResponse.json({ 
        success: true, 
        url: url,
        key: key 
      });
      
    } catch (error: any) {
      console.error('Ошибка при загрузке изображения:', error);
      return NextResponse.json(
        { error: 'Ошибка при загрузке изображения', details: error.message },
        { status: 500 }
      );
    }
  } catch (error: any) {
    console.error('Ошибка сервера:', error);
    return NextResponse.json(
      { error: 'Внутренняя ошибка сервера', details: error.message },
      { status: 500 }
    );
  }
}
