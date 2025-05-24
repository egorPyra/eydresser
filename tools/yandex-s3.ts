import {
  S3Client,
  PutObjectCommand,
  PutObjectCommandInput,
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { v4 as uuidv4 } from 'uuid';

// Типы для конфигурации Yandex S3
interface YandexS3Config {
  accessKeyId: string;
  secretAccessKey: string;
  bucketName: string;
  region: string;
  endpoint: string;
}

// Типы для результата загрузки файла
interface UploadResult {
  url: string;
  key: string;
}

/**
 * Создает клиента S3 для Yandex Object Storage
 */
const createS3Client = (config: YandexS3Config): S3Client => {
  return new S3Client({
    region: config.region,
    endpoint: config.endpoint,
    credentials: {
      accessKeyId: config.accessKeyId,
      secretAccessKey: config.secretAccessKey,
    },
    forcePathStyle: true, // Обязательно для Yandex Object Storage
  });
};

/**
 * Загружает файл из буфера в Yandex S3 и возвращает URL
 * @param buffer - Буфер с файлом
 * @param filename - Имя файла
 * @param contentType - MIME тип файла
 * @returns Объект с url и ключом загруженного файла
 */
export const uploadBufferToS3 = async (
  buffer: Buffer,
  filename: string,
  contentType: string
): Promise<UploadResult> => {
  // Получаем конфигурацию из переменных окружения
  const config: YandexS3Config = {
    accessKeyId: process.env.YANDEX_S3_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.YANDEX_S3_SECRET_ACCESS_KEY || '',
    bucketName: process.env.YANDEX_S3_BUCKET_NAME || '',
    region: process.env.YANDEX_S3_REGION || 'ru-central1',
    endpoint: process.env.YANDEX_S3_ENDPOINT || 'https://storage.yandexcloud.net',
  };

  // Проверка наличия необходимых конфигураций
  if (!config.accessKeyId || !config.secretAccessKey || !config.bucketName) {
    throw new Error('Не настроены учетные данные Yandex S3');
  }

  // Создаем уникальный ключ для файла, сохраняя расширение
  const extension = filename.split('.').pop() || '';
  const key = `uploads/${uuidv4()}.${extension}`;

  const s3Client = createS3Client(config);

  // Параметры для загрузки
  const params: PutObjectCommandInput = {
    Bucket: config.bucketName,
    Key: key,
    Body: buffer,
    ContentType: contentType,
  };

  // Загружаем файл
  await s3Client.send(new PutObjectCommand(params));

  // Генерируем URL для доступа к файлу
  const url = `https://${config.bucketName}.storage.yandexcloud.net/${key}`;

  return { url, key };
};

/**
 * Загружает файл из FormData в Yandex S3
 * @param file - Объект File из формы загрузки
 * @returns Объект с url и ключом загруженного файла
 */
export const uploadFileToS3 = async (file: File): Promise<UploadResult> => {
  // Преобразуем File в Buffer
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  return uploadBufferToS3(buffer, file.name, file.type);
};

/**
 * Получает подписанный URL для загрузки файла напрямую из браузера
 * (опциональная функция для прямой загрузки в S3 из браузера)
 * @param filename - Имя файла
 * @param contentType - MIME тип файла
 * @returns Подписанный URL и ключ файла
 */
export const getPresignedUploadUrl = async (
  filename: string,
  contentType: string
): Promise<{ uploadUrl: string; key: string }> => {
  // Получаем конфигурацию из переменных окружения
  const config: YandexS3Config = {
    accessKeyId: process.env.YANDEX_S3_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.YANDEX_S3_SECRET_ACCESS_KEY || '',
    bucketName: process.env.YANDEX_S3_BUCKET_NAME || '',
    region: process.env.YANDEX_S3_REGION || 'ru-central1',
    endpoint: process.env.YANDEX_S3_ENDPOINT || 'https://storage.yandexcloud.net',
  };

  // Проверка наличия необходимых конфигураций
  if (!config.accessKeyId || !config.secretAccessKey || !config.bucketName) {
    throw new Error('Не настроены учетные данные Yandex S3');
  }

  // Создаем уникальный ключ для файла
  const extension = filename.split('.').pop() || '';
  const key = `uploads/${uuidv4()}.${extension}`;

  const s3Client = createS3Client(config);

  // Параметры для создания предподписанного URL
  const params: PutObjectCommandInput = {
    Bucket: config.bucketName,
    Key: key,
    ContentType: contentType,
  };

  // Создаем предподписанный URL для загрузки
  const command = new PutObjectCommand(params);
  const uploadUrl = await getSignedUrl(s3Client, command, { expiresIn: 3600 }); // URL действителен в течение 1 часа

  return { uploadUrl, key };
};
