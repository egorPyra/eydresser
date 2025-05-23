import { NextRequest, NextResponse } from 'next/server';
import { analyzeClothing } from '../../../tools';

/**
 * API-маршрут для анализа изображения одежды
 * 
 * Пример запроса:
 * POST /api/analyze-clothing
 * Body: { "imageUrl": "https://example.com/image.jpg" }
 */
export async function POST(request: NextRequest) {
  try {
    // Получаем данные запроса
    const data = await request.json();
    const { imageUrl } = data;
    
    // Проверяем наличие URL изображения
    if (!imageUrl) {
      return NextResponse.json(
        { error: 'URL изображения обязателен' },
        { status: 400 }
      );
    }
    
    // Анализируем изображение с использованием OpenAI
    const clothingAttributes = await analyzeClothing(imageUrl);
    
    // Возвращаем результат анализа
    return NextResponse.json(clothingAttributes);
  } catch (error: any) {
    console.error('Ошибка при анализе изображения:', error);
    return NextResponse.json(
      { 
        error: 'Ошибка при анализе изображения', 
        details: error.message || 'Неизвестная ошибка' 
      },
      { status: 500 }
    );
  }
}

// Обрабатываем другие HTTP методы
export async function GET() {
  return NextResponse.json(
    { error: 'Метод не разрешен. Используйте POST запрос.' },
    { status: 405 }
  );
}

export async function PUT() {
  return NextResponse.json(
    { error: 'Метод не разрешен. Используйте POST запрос.' },
    { status: 405 }
  );
}

export async function DELETE() {
  return NextResponse.json(
    { error: 'Метод не разрешен. Используйте POST запрос.' },
    { status: 405 }
  );
}

export async function PATCH() {
  return NextResponse.json(
    { error: 'Метод не разрешен. Используйте POST запрос.' },
    { status: 405 }
  );
}
