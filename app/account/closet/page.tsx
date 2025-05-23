'use client'

import React, { useEffect, useState, useRef, ChangeEvent } from "react";
import styles from "./closet.module.css";
import ItemAccount from "@/components/ItemAccount";
import { useRouter } from 'next/navigation';
import Image from "next/image";

type ClothesItem = {
  id: string;
  imageUrl: string;
  name: string;
};

export default function Closet() {
  const [clothes, setClothes] = useState<ClothesItem[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [newItem, setNewItem] = useState<{ name: string; image: string; file: File | null }>({ name: '', image: '', file: null });
  const router = useRouter();
  const [loading, setLoading] = useState(true); 
  const [ClothesUploading, setClothesUploading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

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
  
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };
  
  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };
  
  const handleDrop = async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      handleFileChange(file);
      await uploadAndAddItem(file);
    }
  };
  
  const handleFileChange = (file: File) => {
    // Проверка типа файла
    if (!file.type.match('image.*')) {
      alert('Пожалуйста, выберите изображение');
      return;
    }
    
    // Создаем временный URL для отображения
    const imageUrl = URL.createObjectURL(file);
    
    setNewItem(prev => ({
      ...prev,
      image: imageUrl,
      file: file
    }));
  };
  
  const handleFileInputChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      handleFileChange(file);
      
      // Автоматически запустить загрузку файла после выбора
      await uploadAndAddItem(file);
    }
  };
  
  const openFileSelector = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  
  // Функция для обработки клика по внешней области модального окна
  const handleModalOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // Проверяем, что клик был по оверлею, а не по контенту модального окна
    if (e.target === e.currentTarget) {
      setShowModal(false);
    }
  };

  // Функция для загрузки файла и добавления предмета
  const uploadAndAddItem = async (file: File) => {
    const storedUser = localStorage.getItem('user');
    if (!storedUser) return;
  
    const parsedUser = JSON.parse(storedUser);
    const userId = parsedUser.id as string;
    
    try {
      setClothesUploading(true);
      
      // Генерируем имя предмета на основе имени файла или используем дефолтное
      const fileName = file.name.split('.')[0] || 'Предмет одежды';
      
      // Создаем FormData для загрузки файла напрямую в /api/closet/add
      const formData = new FormData();
      formData.append('image', file);
      formData.append('userId', userId);
      formData.append('name', fileName);
      
      // Загружаем файл и создаем предмет одежды за один запрос
      const res = await fetch('/api/closet/add', {
        method: 'POST',
        body: formData,
      });
      
      if (!res.ok) {
        throw new Error('Ошибка загрузки изображения и создания предмета одежды');
      }
      
      const data = await res.json();
      
      setClothes((prev) => [...prev, data.newClothes]); // Обновляем список вещей
      setShowModal(false); // Закрываем модальное окно
      // Сбрасываем форму
      setNewItem({ name: '', image: '', file: null });

    } catch (error) {
      console.error("Error submitting item:", error);
      alert('Произошла ошибка при загрузке. Пожалуйста, попробуйте снова.');
    } finally {
      setClothesUploading(false);
    }
  };
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    const storedUser = localStorage.getItem('user');
    if (!storedUser) return;
  
    const parsedUser = JSON.parse(storedUser);
    const userId = parsedUser.id as string;
  
    // Проверяем наличие файла или изображения
    if (!newItem.file && !newItem.image) {
      alert('Пожалуйста, добавьте изображение');
      return;
    }
    
    try {
      setClothesUploading(true);
      
      let res;
      
      // Если есть файл, отправляем через FormData
      if (newItem.file) {
        // Создаем FormData для загрузки файла
        const formData = new FormData();
        formData.append('image', newItem.file);
        formData.append('userId', userId);
        formData.append('name', newItem.name);
        
        // Отправляем файл напрямую в API добавления одежды
        res = await fetch('/api/closet/add', {
          method: 'POST',
          body: formData,
        });
      } else {
        // Если файла нет, но есть URL изображения, отправляем как JSON
        res = await fetch('/api/closet/add', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: newItem.name,
            image: newItem.image,
            userId: userId,
          }),
        });
      }
  
      if (res.ok) {
        const data = await res.json();
        setClothes((prev) => [...prev, data.newClothes]); // Обновляем список вещей
        setShowModal(false); // Закрываем модальное окно
        // Сбрасываем форму
        setNewItem({ name: '', image: '', file: null });
      } else {
        console.error('Failed to add item');
        alert('Не удалось добавить предмет. Пожалуйста, попробуйте снова.');
      }
      setClothesUploading(false);
    } catch (error) {
      console.error("Error submitting item:", error);
      setClothesUploading(false);
      alert('Произошла ошибка. Пожалуйста, попробуйте снова.');
    }
  };
  
  


  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center', height: '100vh' }}>
        <div className={styles.loader}></div>
        <h2>Loading...</h2>
      </div>
    );
  }


  return (
    <>
      <div className={styles.header}>
        <h2>Шкаф</h2>
        <button onClick={() => setShowModal(true)} className={styles.addButton}>+ Добавить</button>
      </div>

      <div className={styles.items}>
        {clothes.map((item) => (
          <ItemAccount key={item.id} img={item.imageUrl} title={item.name} />
        ))}
      </div>

      {/* Modal Window */}
      {showModal && (
        <div className={styles.modalOverlay} onClick={handleModalOverlayClick}>
          <div className={styles.modalContent}>
            {ClothesUploading ? (
              <div style={{ textAlign: 'center', padding: '20px 0' }}>
                <div className={styles.loader} style={{ margin: '0 auto 20px' }}></div>
                <p>Загрузка...</p>
              </div>
            ) : (
              <div 
                className={`${styles.dropZone} ${isDragging ? styles.active : ''}`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={openFileSelector}
              >
                <p className={styles.dropZoneTitle}>Добавить фото</p>
                <p className={styles.fileFormats}>jpg, png, heic</p>
                <input 
                  ref={fileInputRef}
                  type="file" 
                  accept="image/*"
                  style={{ display: 'none' }}
                  onChange={handleFileInputChange} 
                />
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
