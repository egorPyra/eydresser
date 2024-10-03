'use client';

import React, { useState, useRef, useEffect } from "react";
import styles from "../closet/closet.module.css";
import "./add.css";
import DraggableImage from "../../../components/DraggableImage";
import { useRouter } from "next/navigation";
import Skeleton from "@/components/Skeleton";


// Типы и интерфейсы
interface ImageData {
  id?: number;
  src: string;
  alt: string;
  positionX: number;
  positionY: number;
}

interface ClothesItem {
  id: string;
  imageUrl: string;
  name: string;
  positionX: number;
  positionY: number;
}

export default function Closet() {
  const [images, setImages] = useState<ImageData[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [clothes, setClothes] = useState<ClothesItem[]>([]);
  const router = useRouter();
  const [loading, setLoading] = useState(true);

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

        const clothesRes = await fetch(`/api/closet/clothes?userId=${userId}`);
        const clothesData = await clothesRes.json();
        setClothes(clothesData.clothes);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch closet data:", error);
        setLoading(false);
      }
    };

    fetchClosetData();
  }, [router]);

  // Функция для загрузки изображений
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (event: ProgressEvent<FileReader>) => {
        const result = event.target?.result;
        if (result) {
          setImages((prevImages) => [
            ...prevImages,
            { id: prevImages.length, src: result as string, alt: `uploaded ${prevImages.length}`, positionX: 0, positionY: 0 }
          ]);
        }
      };
      reader.readAsDataURL(file);
      console.log(file);
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
      imageUrl: image.src,
      name: image.alt, 
      positionX: image.positionX, 
      positionY: image.positionY, 
      rotation: 0 
    }));
  
    const nameInput = document.getElementById('name') as HTMLInputElement;
    const name = nameInput?.value;
  
    const userId = getUserId();
  
    if (!name || !userId) {
      alert("Пожалуйста, введите название и убедитесь, что вы вошли в систему.");
      return;
    }
  
    try {
      const res = await fetch('/api/closet/outfits', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          clothes: {
            create: dataToSave // Use the modified dataToSave here
          },
          userId
        }),
      });
  
      if (res.ok) {
        alert("Образ успешно сохранен!");
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
        <h2>Создать образ</h2>
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
          <div className="addFromDevice" onClick={handleClick}>
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

          <p style={{ padding: '10px' }}> Для перемещения удерживайте 🔘 </p>

          {/* Блок Вещи из гардероба */}
          <div className="closetItems">
            <h3>Вещи из гардероба:</h3>
            <div className="itemsGrid">
              {loading
                ? [...Array(6)].map((_, index) => <Skeleton key={index} />) // Пока загружается, показываем 6 скелетонов
                : clothes.slice(0, 6).map((item) => (
                  <div key={item.id} className="closetItem">
                    <img
                      src={item.imageUrl}
                      alt="image"
                      className="closetImage"
                      onClick={() => {
                        setImages((prevImages) => [
                          ...prevImages,
                          { id: images.length, src: item.imageUrl, alt: item.name, positionX: 0, positionY: 0 }
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
