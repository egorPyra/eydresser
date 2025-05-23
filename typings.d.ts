declare module "*.module.css";
declare module "*.css";

// Расширяем типы для работы с File в NextJS API Routes
interface FileWithPath extends File {
  path?: string;
}

// Расширенные типы для определения FormDataEntryValue на сервере
declare global {
  namespace FormData {
    interface FormDataEntryValue {
      buffer?: Buffer;
      arrayBuffer(): Promise<ArrayBuffer>;
    }
  }
}