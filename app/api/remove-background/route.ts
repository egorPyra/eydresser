import { NextRequest, NextResponse } from 'next/server';
import { removeBackground } from '../../../tools';

export async function POST(req: NextRequest) {
  try {
    // Получаем данные из запроса
    const body = await req.json();
    const { imageUrl } = body;
    
    if (!imageUrl) {
      return NextResponse.json(
        { error: 'URL изображения не предоставлен', details: 'Необходимо указать URL изображения' },
        { status: 400 }
      );
    }
    
    // Получаем API ключ
    const apiKey = process.env.PHOTOROOM_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: 'Ошибка конфигурации', details: 'API ключ PhotoRoom не настроен на сервере' },
        { status: 500 }
      );
    }
    
    try {
      // Удаляем фон с изображения (использует sandbox режим для тестирования)
      const imageBuffer = await removeBackground(imageUrl, apiKey, { useSandbox: true });
      
      // Преобразуем буфер в base64
      const base64Image = `data:image/png;base64,${imageBuffer.toString('base64')}`;
      
      // Возвращаем изображение без фона в формате base64
      return NextResponse.json({ imageWithoutBackground: base64Image });
    } catch (error: any) {
      console.error('Ошибка при удалении фона:', error);
      return NextResponse.json(
        { error: 'Ошибка при обработке изображения', details: error.message },
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
