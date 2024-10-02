'use client'

import React, { useEffect, useState } from "react";
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
  const [newItem, setNewItem] = useState<{ name: string; image: string}>({ name: '', image: '' });
  const router = useRouter();
  const [loading, setLoading] = useState(true); 
  const [ClothesUploading, setClothesUploading] = useState(false);



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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewItem((prev) => ({ ...prev, [name]: value }));
  };
  

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    // Проверяем, что URL начинается с 'http://' или 'https://'
    if (!newItem.image.startsWith('http://') && !newItem.image.startsWith('https://')) {
      alert('Введите корректный URL изображения (должен начинаться с http:// или https://)');
      return;
    }
  
    const storedUser = localStorage.getItem('user');
    if (!storedUser) return;
  
    const parsedUser = JSON.parse(storedUser);
    const userId = parsedUser.id as string;
  
    // Отправка данных
    try {
      setClothesUploading(true);
      const res = await fetch('/api/closet/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: newItem.name,
          image: newItem.image,  // Убедитесь, что это корректный URL
          userId: userId,
        }),
      });
  
      if (res.ok) {
        const data = await res.json();
        setClothes((prev) => [...prev, data.newClothes]); // Обновляем список вещей
        setShowModal(false); // Закрываем модальное окно
        setClothesUploading(false);
      } else {
        console.error('Failed to add item');
      }
    } catch (error) {
      console.error("Error submitting item:", error);
      setClothesUploading(false);
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
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <h2>Добавить предмет</h2>
            <form onSubmit={handleSubmit}>
            <label htmlFor="image">Название предмета</label>
              <input 
                type="text" 
                name="name" 
                placeholder="Футболка" 
                value={newItem.name} 
                onChange={handleInputChange} 
                required 
              />
              <label htmlFor="file">Выберите изображение</label>
              <input 
                type="text" 
                name="image" 
                onChange={handleInputChange} 
                required 
              />
              <button type="submit" className="authButton" disabled={ClothesUploading}>
                        {ClothesUploading ? 'Загрузка...' : 'Добавить'}
                    </button>
              <button type="button" onClick={() => setShowModal(false)}>Закрыть</button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
