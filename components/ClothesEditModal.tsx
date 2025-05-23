'use client'

import React, { useState, useEffect } from 'react';
import styles from './ClothesEditModal.module.css';
import Image from 'next/image';

interface ClothesEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageUrl: string;
  clothesId: string;
  initialType?: string;
  initialColor?: string;
  initialMaterial?: string;
  initialSeason?: string;
  onSuccess?: () => void;
}

const ClothesEditModal: React.FC<ClothesEditModalProps> = ({ 
  isOpen, 
  onClose, 
  imageUrl,
  clothesId,
  initialType = '',
  initialColor = '',
  initialMaterial = '',
  initialSeason = '',
  onSuccess 
}) => {
  const [type, setType] = useState<string>(initialType);
  const [color, setColor] = useState<string>(initialColor);
  const [material, setMaterial] = useState<string>(initialMaterial);
  const [season, setSeason] = useState<string>(initialSeason);
  const [isUpdating, setIsUpdating] = useState<boolean>(false);
  
  // Обновляем состояние при изменении начальных значений
  useEffect(() => {
    setType(initialType);
    setColor(initialColor);
    setMaterial(initialMaterial);
    setSeason(initialSeason);
  }, [initialType, initialColor, initialMaterial, initialSeason]);

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isUpdating && e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleSave = async () => {
    try {
      setIsUpdating(true);
      
      const storedUser = localStorage.getItem('user');
      if (!storedUser) return;
      
      const parsedUser = JSON.parse(storedUser);
      const userId = parsedUser.id as string;
      
      const updatedParams = {
        userId,
        clothesId,
        type,
        color,
        material,
        season
      };
      
      const response = await fetch('/api/closet/update', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedParams),
      });
      
      if (!response.ok) {
        throw new Error('Ошибка при обновлении параметров одежды');
      }
      
      if (onSuccess) {
        onSuccess();
      }
      
      onClose();
    } catch (error) {
      console.error('Ошибка при сохранении параметров:', error);
      alert('Произошла ошибка при сохранении параметров. Пожалуйста, попробуйте снова.');
    } finally {
      setIsUpdating(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay} onClick={handleOverlayClick}>
      <div className={styles.modalContent}>
        <div className={styles.imageContainer}>
          <Image 
            src={imageUrl} 
            alt="Предмет одежды" 
            width={200} 
            height={200} 
            className={styles.clothesImage}
          />
        </div>
        
        <div className={styles.paramsContainer}>
          <div className={styles.paramItem}>
            <label htmlFor="type">Тип</label>
            <input 
              type="text" 
              id="type" 
              value={type} 
              onChange={(e) => setType(e.target.value)} 
              className={styles.inputField}
            />
          </div>
          
          <div className={styles.paramItem}>
            <label htmlFor="color">Цвет</label>
            <input 
              type="text" 
              id="color" 
              value={color} 
              onChange={(e) => setColor(e.target.value)} 
              className={styles.inputField}
            />
          </div>
          
          <div className={styles.paramItem}>
            <label htmlFor="material">Материал</label>
            <input 
              type="text" 
              id="material" 
              value={material} 
              onChange={(e) => setMaterial(e.target.value)} 
              className={styles.inputField}
            />
          </div>
          
          <div className={styles.paramItem}>
            <label htmlFor="season">Сезон</label>
            <input 
              type="text" 
              id="season" 
              value={season} 
              onChange={(e) => setSeason(e.target.value)} 
              className={styles.inputField}
            />
          </div>
        </div>
        
        <button 
          className={styles.saveButton} 
          onClick={handleSave}
          disabled={isUpdating}
        >
          {isUpdating ? 'Сохранение...' : 'Сохранить'}
        </button>
      </div>
    </div>
  );
};

export default ClothesEditModal;
