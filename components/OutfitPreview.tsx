'use client'

import React from "react";
import styles from "./OutfitPreview.module.css";
import { useRouter } from "next/navigation";

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

interface OutfitItem {
  id: number;
  name: string;
  clothes: OutfitClothesItem[];
  // Другие возможные поля
  userId?: string | number;
  createdAt?: string;
  updatedAt?: string;
}

const OutfitPreview = ({
  title,
  navigationUrl,
  outfitData,
}: {
  title: string;
  navigationUrl: string;
  outfitData: OutfitItem | null;
}) => {
  const router = useRouter();
  const previewScale = 0.46;

  const handleClick = () => {
    if (navigationUrl) {
      router.push(navigationUrl);
    }
  };

  return (
    <div className={styles.item} onClick={handleClick}>
      <div className={styles.previewContainer}>
        <div className={styles.previewZone}>
          {outfitData && outfitData.clothes && outfitData.clothes.map((clothesItem) => (
            <div
              key={clothesItem.id}
              className={styles.clothesPreviewItem}
              style={{
                left: `${10 + clothesItem.positionX * previewScale}px`,
                top: `${10 + clothesItem.positionY * previewScale}px`,
                transform: `rotate(${clothesItem.rotation}deg)`,
              }}
            >
              <img 
                src={clothesItem.clothes.imageUrl} 
                alt={clothesItem.clothes.name} 
                className={styles.clothesPreviewImage}
              />
            </div>
          ))}
        </div>
      </div>
      <h3>{title}</h3>
    </div>
  );
};

export default OutfitPreview;
