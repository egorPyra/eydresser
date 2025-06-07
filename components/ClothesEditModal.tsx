'use client'

import React, { useState, useEffect } from 'react';
import styles from './ClothesEditModal.module.css';
import Image from 'next/image';
import toast from 'react-hot-toast';
import ConfirmModal from './ConfirmModal';


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

  const [usedOutfitIds, setUsedOutfitIds] = useState<string[]>([]);
  const [showFinalConfirm, setShowFinalConfirm] = useState(false);


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
      toast.error('Произошла ошибка при сохранении параметров. Пожалуйста, попробуйте снова.');
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDelete = async () => {
    try {
      const storedUser = localStorage.getItem('user');
      if (!storedUser) return;
      const parsedUser = JSON.parse(storedUser);
      const userId = parsedUser.id as string;

      // Шаг 1: Проверить где используется
      const whereUsedRes = await fetch('/api/closet/where-used', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId, clothesId }),
      });

      if (!whereUsedRes.ok) throw new Error('Ошибка при проверке использования');

      const { outfitIds } = await whereUsedRes.json();

      if (outfitIds.length === 0) {
        // Не используется — можно удалить сразу
        await confirmAndDelete(userId);
      } else {
        // Сохраняем список, показываем подтверждение
        setUsedOutfitIds(outfitIds);
        setShowFinalConfirm(true);
      }
    } catch (error) {
      console.error('Ошибка при проверке:', error);
      toast.error('Не удалось проверить использование вещи.');
    }
  };

  const confirmAndDelete = async (userId: string) => {
    try {
      setIsUpdating(true);

      // Если используется — сначала убрать из образов
      if (usedOutfitIds.length > 0) {
        const unlinkRes = await fetch('/api/closet/unlink-from-outfit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userId, clothesId }),
        });

        if (!unlinkRes.ok) throw new Error('Ошибка при отвязке от образов');
      }

      const deleteRes = await fetch('/api/closet/delete', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, clothesId }),
      });

      if (!deleteRes.ok) throw new Error('Ошибка при удалении');

      toast.success('Вещь удалена');
      if (onSuccess) onSuccess();
      onClose();
    } catch (error) {
      console.error('Ошибка при удалении:', error);
      toast.error('Не удалось удалить вещь.');
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

        <div style={{ display: 'flex', gap: '10px', marginTop: '1rem' }}>
          <button
            className={styles.saveButton}
            onClick={handleSave}
            disabled={isUpdating}
          >
            {isUpdating ? 'Сохранение...' : 'Сохранить'}
          </button>

          <button
            className={styles.deleteButton}
            onClick={handleDelete}

            disabled={isUpdating}
          >
            Удалить
          </button>
        </div>

        {showFinalConfirm && (
          <ConfirmModal
            title="Удалить вещь из образов?"
            message={`Эта вещь используется в ${usedOutfitIds.length} образах. Удалить её из всех образов? Это действие отменить невозможно.`}
            onConfirm={async () => {
              const storedUser = localStorage.getItem('user');
              const parsedUser = storedUser ? JSON.parse(storedUser) : null;
              const userId = parsedUser?.id;
              if (userId) {
                await confirmAndDelete(userId);
                setShowFinalConfirm(false);
              }
            }}
            onCancel={() => setShowFinalConfirm(false)}
            confirmText="Удалить"
            cancelText="Отмена"
          />
        )}



      </div>
    </div>
  );
};

export default ClothesEditModal;
