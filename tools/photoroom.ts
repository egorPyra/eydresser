import axios from 'axios';
import { createReadStream } from 'fs';
import { tmpdir } from 'os';
import * as fs from 'fs/promises';
import * as path from 'path';

/**
 * Интерфейс параметров для удаления фона
 */
export interface RemoveBackgroundOptions {
  /** 
   * Тип выходного изображения (по умолчанию 'PNG')
   */
  format?: 'PNG' | 'JPG';
  
  /** 
   * Качество выходного JPG изображения (1-100, по умолчанию 80)
   */
  quality?: number;
  
  /** 
   * Использовать sandbox режим (с водяными знаками)
   */
  useSandbox?: boolean;
}

/**
 * Класс для взаимодействия с PhotoRoom API
 */
export class PhotoRoomAPI {
  private apiKey: string;
  private baseUrl = 'https://sdk.photoroom.com/v1/segment';
  
  /**
   * Создает экземпляр API клиента для PhotoRoom
   * @param apiKey API ключ для доступа к PhotoRoom API
   */
  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }
  
  /**
   * Удаляет фон с изображения по URL
   * @param imageUrl URL изображения
   * @param options Дополнительные параметры для обработки
   * @returns Promise с буфером обработанного изображения
   */
  async removeBackgroundFromUrl(imageUrl: string, options: RemoveBackgroundOptions = {}): Promise<Buffer> {
    try {
      // Скачиваем изображение во временный файл
      const imagePath = await this.downloadImage(imageUrl);
      
      // Удаляем фон
      const result = await this.removeBackgroundFromPath(imagePath, options);
      
      // Удаляем временный файл
      await fs.unlink(imagePath);
      
      return result;
    } catch (error) {
      console.error('Ошибка при удалении фона по URL:', error);
      throw new Error(`Не удалось удалить фон изображения: ${error.message}`);
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
      
      await fs.writeFile(imagePath, Buffer.from(response.data));
      
      return imagePath;
    } catch (error) {
      console.error('Ошибка при скачивании изображения:', error);
      throw new Error(`Не удалось скачать изображение: ${error.message}`);
    }
  }
  
  /**
   * Удаляет фон из файла изображения
   * @param imagePath Путь к файлу изображения
   * @param options Дополнительные параметры для обработки
   * @returns Promise с буфером обработанного изображения
   */
  async removeBackgroundFromPath(imagePath: string, options: RemoveBackgroundOptions = {}): Promise<Buffer> {
    try {
      // Формируем FormData для отправки
      const formData = new FormData();
      
      // Читаем файл изображения
      const imageFile = await fs.readFile(imagePath);
      
      // Создаем Blob из файла
      const blob = new Blob([imageFile]);
      
      // Добавляем файл в формдату
      formData.append('image_file', blob, path.basename(imagePath));
            
      formData.append('format', 'png');
      
      // Определяем, использовать ли sandbox API ключ
      const apiKey = options.useSandbox ? `sandbox_${this.apiKey}` : this.apiKey;
      
      // Отправляем запрос к API
      const response = await axios({
        method: 'POST',
        url: this.baseUrl,
        headers: {
          'x-api-key': apiKey,
          'Accept': (options.format === 'JPG' ? 'image/jpeg' : 'image/png') + ", application/json",
        },
        data: formData,
        responseType: 'arraybuffer'
      });
      
      return Buffer.from(response.data);
    } catch (error) {
      console.error('Ошибка при удалении фона:', error);
      
      // Если ошибка содержит данные в формате JSON, пытаемся их распарсить
      if (error.response && error.response.data) {
        try {
          const errorData = JSON.parse(Buffer.from(error.response.data).toString());
          throw new Error(`PhotoRoom API: ${errorData.message || 'Ошибка API'}`);
        } catch (parseError) {
          throw new Error(`Не удалось удалить фон изображения: ${error.message}`);
        }
      }
      
      throw new Error(`Не удалось удалить фон изображения: ${error.message}`);
    }
  }
  
  /**
   * Удаляет фон из буфера изображения
   * @param imageBuffer Буфер с данными изображения
   * @param options Дополнительные параметры для обработки
   * @returns Promise с буфером обработанного изображения
   */
  async removeBackgroundFromBuffer(imageBuffer: Buffer, options: RemoveBackgroundOptions = {}): Promise<Buffer> {
    try {
      // Сохраняем буфер во временный файл
      const tempDir = tmpdir();
      const randomName = `image-${Date.now()}.jpg`;
      const imagePath = path.join(tempDir, randomName);
      
      await fs.writeFile(imagePath, imageBuffer);
      
      // Удаляем фон
      const result = await this.removeBackgroundFromPath(imagePath, options);
      
      // Удаляем временный файл
      await fs.unlink(imagePath);
      
      return result;
    } catch (error) {
      console.error('Ошибка при удалении фона из буфера:', error);
      throw new Error(`Не удалось удалить фон изображения: ${error.message}`);
    }
  }
  
  /**
   * Сохраняет обработанное изображение без фона в файл
   * @param inputImagePath Путь к исходному изображению
   * @param outputImagePath Путь для сохранения результата
   * @param options Дополнительные параметры для обработки
   */
  async removeBackgroundAndSave(inputImagePath: string, outputImagePath: string, options: RemoveBackgroundOptions = {}): Promise<void> {
    try {
      // Удаляем фон
      const resultBuffer = await this.removeBackgroundFromPath(inputImagePath, options);
      
      // Сохраняем результат в файл
      await fs.writeFile(outputImagePath, resultBuffer);
    } catch (error) {
      console.error('Ошибка при сохранении изображения без фона:', error);
      throw new Error(`Не удалось сохранить изображение без фона: ${error.message}`);
    }
  }
}

/**
 * Функция-обертка для быстрого удаления фона по URL изображения
 * @param imageUrl URL изображения
 * @param apiKey API ключ PhotoRoom (опционально, по умолчанию берется из переменной окружения PHOTOROOM_API_KEY)
 * @param options Дополнительные параметры для обработки
 * @returns Promise с буфером обработанного изображения
 */
export async function removeBackground(
  imageUrl: string, 
  apiKey?: string,
  options: RemoveBackgroundOptions = {}
): Promise<Buffer> {
  // Используем ключ API из аргументов или берем из переменной окружения
  const key = apiKey || process.env.PHOTOROOM_API_KEY;
  
  if (!key) {
    throw new Error('API ключ PhotoRoom не предоставлен. Укажите его в аргументах или установите переменную окружения PHOTOROOM_API_KEY');
  }
  
  const photoRoom = new PhotoRoomAPI(key);
  return await photoRoom.removeBackgroundFromUrl(imageUrl, options);
}

export default removeBackground;
