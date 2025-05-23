'use client';

import React, { useState, useRef, useEffect, Suspense } from "react";
import styles from "../closet/closet.module.css";
import "./add.css";
import DraggableImage from "../../../components/DraggableImage";
import { useRouter, useSearchParams } from "next/navigation";
import Skeleton from "@/components/Skeleton";


// Типы и интерфейсы
interface ImageData {
  id: number;
  src: string;
  alt: string;
  positionX: number;
  positionY: number;
}

interface ClothesItem {
  id: number;
  imageUrl: string;
  name: string;
  positionX: number;
  positionY: number;
}

interface OutfitClothes {
  id: number;
  clothesId: number;
  positionX: number;
  positionY: number;
  rotation: number;
  imageUrl?: string;
  name?: string;
}

interface OutfitData {
  id: number;
  name: string;
  userId: string;
  clothes: OutfitClothes[];
}

// Компонент, использующий useSearchParams, обернутый в Suspense
function OutfitCreator() {
  const [images, setImages] = useState<ImageData[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [clothes, setClothes] = useState<ClothesItem[]>([]);
  const router = useRouter();
  const searchParams = useSearchParams();
  const [outfitData, setOutfitData] = useState<OutfitData | null>(null);
  const [loading, setLoading] = useState(true);
  const [dragActive, setDragActive] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  
  const outfitId = searchParams ? searchParams.get('outfitId') : null;

  const getUserId = () => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      return parsedUser.id;  // Получаем userId из данных пользователя
    }
    return null;
  };

  useEffect(() => {
    const fetchClosetData = async () => {
      try {
        const storedUser = localStorage.getItem('user');
        if (!storedUser) {
          router.push('/login');
          console.error('User data not found in localStorage');
          return;
        }
        const parsedUser = JSON.parse(storedUser);
        const userId = parsedUser.id as string;

        // Получаем данные гардероба
        const clothesRes = await fetch(`/api/closet/clothes?userId=${userId}`);
        const clothesData = await clothesRes.json();
        setClothes(clothesData.clothes);
        
        // Если есть outfitId, загружаем данные аутфита
        if (outfitId) {
          setIsEditMode(true);
          try {
            const outfitRes = await fetch(`/api/outfits/${outfitId}`);
            if (!outfitRes.ok) {
              throw new Error('Не удалось загрузить данные образа');
            }
            
            const outfitData = await outfitRes.json();
            setOutfitData(outfitData);
            
            // Заполнение поля названия
            const nameInput = document.getElementById('name') as HTMLInputElement;
            if (nameInput) {
              nameInput.value = outfitData.name;
            }
            
            // Загружаем изображения аутфита
            if (outfitData.clothes && outfitData.clothes.length > 0) {
              // Находим подробную информацию о каждой одежде из аутфита в общем списке одежды
              const outfitImages: ImageData[] = outfitData.clothes.map((outfitItem: OutfitClothes) => {
                // Находим полные данные о предмете одежды для получения URL изображения и названия
                const fullItemData = clothesData.clothes.find((item: ClothesItem) => item.id === outfitItem.clothesId);
                
                return {
                  id: outfitItem.clothesId,
                  src: fullItemData?.imageUrl || '',
                  alt: fullItemData?.name || '',
                  positionX: outfitItem.positionX,
                  positionY: outfitItem.positionY
                };
              });
              
              setImages(outfitImages);
            }
          } catch (error) {
            console.error("Failed to fetch outfit data:", error);
            alert("Не удалось загрузить данные образа");
          }
        }
        
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch closet data:", error);
        setLoading(false);
      }
    };

    fetchClosetData();
  }, [router, outfitId]);

  // Функция для загрузки изображений
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const formData = new FormData();
      formData.append('image', file);
      
      const userId = getUserId();
      if (!userId) {
        alert("Пожалуйста, войдите в систему для загрузки изображений");
        return;
      }
      
      formData.append('userId', userId.toString());
      
      try {
        // Изменяем текст на "Загрузка..."
        const uploadLabel = document.querySelector('.addFromDevice p');
        const originalText = uploadLabel ? uploadLabel.textContent : "Добавить с компьютера";
        if (uploadLabel) uploadLabel.textContent = "Загрузка...";
        
        // Отправляем изображение на сервер
        const response = await fetch(`/api/closet/add`, {
          method: 'POST',
          body: formData
        });
        
        if (!response.ok) {
          throw new Error('Ошибка при загрузке изображения');
        }
        
        const data = await response.json();
        const newClothes = data.newClothes;
        
        // Добавляем новую одежду в массив clothes
        setClothes(prevClothes => [...prevClothes, newClothes]);
        
        // Возвращаем оригинальный текст
        if (uploadLabel) uploadLabel.textContent = originalText;
      } catch (error) {
        console.error("Ошибка при загрузке изображения:", error);
        alert("Произошла ошибка при загрузке изображения");
        // Возвращаем оригинальный текст
        const uploadLabel = document.querySelector('.addFromDevice p');
        const originalText = uploadLabel ? uploadLabel.textContent : "Добавить с компьютера";
        if (uploadLabel) uploadLabel.textContent = "Добавить с компьютера";
      }
    }
  };

  // Функция для обработки перетаскивания файлов
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  };
  
  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const fileInput = fileInputRef.current;
      if (fileInput) {
        // @ts-ignore: Объект имеет свойство files
        fileInput.files = e.dataTransfer.files;
        const event = new Event('change', { bubbles: true });
        fileInput.dispatchEvent(event);
      }
    }
  };

  // Обработка клика для загрузки файла
  const handleClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleSaveData = async () => {
    // Ensure you are correctly mapping the images to include position and rotation
    const dataToSave = images.map((image) => ({
      id: image.id,
      positionX: image.positionX, 
      positionY: image.positionY, 
      rotation: 0 
    }));
    console.log("Data to save:", dataToSave);
  
    const nameInput = document.getElementById('name') as HTMLInputElement;
    const name = nameInput?.value;
  
    const userId = getUserId();
  
    if (!name || !userId) {
      alert("Пожалуйста, введите название и убедитесь, что вы вошли в систему.");
      return;
    }
  
    try {
      // Если это режим редактирования, используем PUT запрос
      const method = isEditMode ? 'PUT' : 'POST';
      const url = isEditMode 
        ? `/api/outfits/${outfitId}` 
        : '/api/closet/outfits';
        
      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          clothes: dataToSave,
          userId
        }),
      });
  
      if (res.ok) {
        const message = isEditMode ? "Образ успешно обновлен!" : "Образ успешно сохранен!";
        alert(message);
      } else {
        const errorData = await res.json();
        alert(`Ошибка при сохранении: ${errorData.error}`);
      }
    } catch (error) {
      console.error("Error saving data:", error);
      alert("Произошла ошибка при сохранении данных.");
    }
  };


  return (
    <div>
      <div className={styles.header}>
        <h2>{isEditMode ? "Редактировать образ" : "Создать образ"}</h2>
      </div>
      <div className="content">
        <div className="greyZone">
          {images.map((image) => (
            <DraggableImage
              key={image.id}
              src={image.src}
              alt={image.alt}
              positionX={image.positionX}
              positionY={image.positionY}
              onPositionChange={(x, y) => {
                setImages((prevImages) =>
                  prevImages.map((prevImage) =>
                    prevImage.id === image.id
                      ? { ...prevImage, positionX: x, positionY: y }
                      : prevImage
                  )
                );
              }}
            />
          ))}

        </div>

        <div className="tools">
          <div 
            className={`addFromDevice ${dragActive ? 'dragActive' : ''}`}
            onClick={handleClick}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <p>Добавить с компьютера</p>
            <span>jpg, png, heic</span>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              ref={fileInputRef}
              style={{ display: 'none' }}
            />
          </div>

          {/* Блок Вещи из гардероба */}
          <div className="closetItems">
            <h3>Вещи из гардероба:</h3>
            <div className="itemsGrid">
              {loading
                ? [...Array(6)].map((_, index) => <Skeleton key={index} />) // Пока загружается, показываем 6 скелетонов
                : clothes.map((item) => (
                  <div key={item.id} className="closetItem">
                    <img
                      src={item.imageUrl}
                      alt="image"
                      className="closetImage"
                      onClick={() => {
                        setImages((prevImages) => [
                          ...prevImages,
                          { id: item.id, src: item.imageUrl, alt: item.name, positionX: 0, positionY: 0 }
                        ]);
                      }}
                    />
                  </div>
                ))}
            </div>
          </div>

          <label htmlFor="name" className="authLabel">
            <h6>Название</h6>
          </label>
          <input id="name" name="name" className="authInput" placeholder="Название" />
          <button type="submit" className="authButton" onClick={handleSaveData}>Сохранить</button>
        </div>
      </div>
    </div>
  );
}

// Основной компонент, который экспортируется по умолчанию
export default function Closet() {
  return (
    <Suspense fallback={<div className="loading">Загрузка...</div>}>
      <OutfitCreator />
    </Suspense>
  );
}
