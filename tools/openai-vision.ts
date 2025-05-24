import OpenAI from 'openai';
import axios from 'axios';
import { createReadStream } from 'fs';
import { tmpdir } from 'os';
import { join } from 'path';
import * as fs from 'fs/promises';
import * as path from 'path';

// Тип для представления характеристик одежды
interface ClothingAttributes {
  type: string;   
  color: string;   
  season: string;  
  material: string;
}

/**
 * Класс для взаимодействия с OpenAI API для анализа изображений одежды
 */
export class ClothingAnalyzer {
  private openai: OpenAI;
  
  /**
   * Создает экземпляр анализатора одежды
   * @param apiKey API ключ для доступа к OpenAI
   */
  constructor(apiKey: string) {
    this.openai = new OpenAI({
      apiKey: apiKey
    });
  }
  
  /**
   * Анализирует изображение одежды по URL
   * @param imageUrl URL изображения для анализа
   * @returns Объект с характеристиками одежды
   */
  async analyzeImageFromUrl(imageUrl: string): Promise<ClothingAttributes> {
    try {
      // Скачиваем изображение временно для анализа
      const imagePath = await this.downloadImage(imageUrl);
      
      // Анализируем скачанное изображение
      const result = await this.analyzeImageFromPath(imagePath);
      
      // Удаляем временный файл
      await fs.unlink(imagePath);
      
      return result;
    } catch (error) {
      console.error('Ошибка при анализе изображения по URL:', error);
      const errorMessage = (error instanceof Error) ? error.message : String(error);
      throw new Error(`Не удалось проанализировать изображение по URL: ${errorMessage}`);
    }
  }

  /**
   * Скачивает изображение по URL и сохраняет его во временном файле
   * @param url URL изображения для скачивания
   * @returns Путь к сохраненному файлу
   */
  private async downloadImage(url: string): Promise<string> {
    try {
      const response = await axios({
        url,
        method: 'GET',
        responseType: 'arraybuffer'
      });
      
      const tempDir = tmpdir();
      const randomName = `image-${Date.now()}.jpg`;
      const imagePath = path.join(tempDir, randomName);
      
      await fs.writeFile(imagePath, response.data);
      
      return imagePath;
    } catch (error) {
      console.error('Ошибка при скачивании изображения:', error);
      const errorMessage = (error instanceof Error) ? error.message : String(error);
      throw new Error(`Не удалось скачать изображение: ${errorMessage}`);
    }
  }

  /**
   * Анализирует изображение одежды по пути к файлу
   * @param imagePath Путь к файлу изображения
   * @returns Объект с характеристиками одежды
   */
  async analyzeImageFromPath(imagePath: string): Promise<ClothingAttributes> {
    try {
      // Читаем файл изображения
      const imageBuffer = await fs.readFile(imagePath);
      
      // Преобразуем изображение в base64
      const base64Image = imageBuffer.toString('base64');
      
      // Формируем запрос к OpenAI API
      const response = await this.openai.chat.completions.create({
        model: "o4-mini",
        response_format: { type: "json_object" },
        messages: [
          {
            role: "system",
            content: `
            Ты - эксперт по моде и одежде. Проанализируй изображение и определи следующие характеристики одежды:
            1. Тип одежды (футболка, джинсы, платье, куртка и т.д.)
            2. Основной цвет
            3. Материал, если виден (джинса, хлопок, кожа и т.д.)
            4. Сезон (лето, зима, весна/осень, всесезонная)
            
            Ответ дай СТРОГО в формате JSON со следующей структурой:
            {
              "type": "строка",
              "color": "строка",
              "material": "строка",
              "season": "строка"
            }
            
            Если какой-то параметр невозможно определить, верни "" (пустую строку) для этого поля.
            `
          },
          {
            role: "user",
            content: [
              {
                type: "image_url",
                image_url: {
                  url: `data:image/jpeg;base64,${base64Image}`
                }
              },
              {
                type: "text",
                text: "Проанализируй эту одежду и верни характеристики в формате JSON."
              }
            ]
          }
        ],
      });

      // Извлекаем JSON ответ из ответа API
      const content = response.choices[0].message.content;
      if (!content) {
        throw new Error("API вернул пустой ответ");
      }

      // Парсим JSON ответ
      const clothingData: ClothingAttributes = JSON.parse(content);
      return clothingData;
    } catch (error) {
      console.error('Ошибка при анализе изображения:', error);
      const errorMessage = (error instanceof Error) ? error.message : String(error);
      throw new Error(`Не удалось проанализировать изображение: ${errorMessage}`);
    }
  }
}

/**
 * Функция-обертка для быстрого анализа одежды по URL изображения
 * @param imageUrl URL изображения для анализа
 * @param apiKey API ключ OpenAI (опционально, по умолчанию берется из переменной окружения OPENAI_API_KEY)
 * @returns Объект с характеристиками одежды
 */
export async function analyzeClothing(imageUrl: string, apiKey?: string): Promise<ClothingAttributes> {
  // Используем ключ API из аргументов или берем из переменной окружения
  const key = apiKey || process.env.OPENAI_API_KEY;
  
  if (!key) {
    throw new Error('API ключ OpenAI не предоставлен. Укажите его в аргументах или установите переменную окружения OPENAI_API_KEY');
  }
  
  const analyzer = new ClothingAnalyzer(key);
  return await analyzer.analyzeImageFromUrl(imageUrl);
}

export default analyzeClothing;
