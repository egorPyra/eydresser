'use client'

import React, { useEffect, useState } from "react";
import styles from "../closet/closet.module.css";
import OutfitPreview from "@/components/OutfitPreview";
import { useRouter } from 'next/navigation';
import Image from "next/image";

// Определяем типы данных
interface ClothesItem {
  id: number;
  name: string;
  imageUrl: string;
}

interface OutfitClothesItem {
  id: number;
  clothesId: number;
  positionX: number;
  positionY: number;
  rotation: number;
  clothes: ClothesItem;
}

interface OutfitData {
  id: number;
  name: string;
  clothes: OutfitClothesItem[];
  // Другие возможные поля
  userId?: string | number;
  createdAt?: string;
  updatedAt?: string;
}

export default function Closet() {
  const [outfits, setOutfits] = useState<OutfitData[]>([]);
  const [loading, setLoading] = useState(true); // Track loading state
  const router = useRouter();

const fetchClosetData = async () => {
      try {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
          const parsedUser = JSON.parse(storedUser);
          const userId = parsedUser.id;

          // Получаем список образов со всеми необходимыми данными
          const outfitsRes = await fetch(`/api/outfits?userId=${userId}`);
          
          if (!outfitsRes.ok) {
            throw new Error(`Ошибка получения данных: ${outfitsRes.status}`);
          }
          
          const outfitsData = await outfitsRes.json();
          
          // Устанавливаем полученные данные
          setOutfits(outfitsData.outfits);
        }
      } catch (error) {
        console.error("Failed to fetch closet data:", error);
      } finally {
        // После загрузки данных или в случае ошибки, останавливаем индикатор загрузки
        setLoading(false);
      }
    };

  // Используем useRef вне useEffect для сохранения состояния между рендерами
  const hasFetchedRef = React.useRef(false);
  
  useEffect(() => {
    if (!hasFetchedRef.current) {
      const fetchData = async () => {
        await fetchClosetData();
      };
      
      fetchData();
      hasFetchedRef.current = true;
    }
    
  }, []); // Пустой массив зависимостей - эффект выполнится один раз после монтирования

  // If loading, display loading spinner
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
        <h2>Образы</h2>
      </div>
      <div className={styles.items}>
        {outfits.map((outfit) => (
          <OutfitPreview 
            key={outfit.id} 
            outfitData={outfit}
            title={outfit.name} 
            navigationUrl={`/account/newOutfit?outfitId=${outfit.id}`}
          />
        ))}
      </div>
    </>
  );
}
