'use client'

import React, { useEffect, useState, useRef, ChangeEvent } from "react";
import styles from "./closet.module.css";
import ItemAccount from "@/components/ItemAccount";
import { useRouter } from 'next/navigation';
import Image from "next/image";
import ClothesEditModal from "@/components/ClothesEditModal";
import toast from "react-hot-toast";

type ClothesItem = {
  id: string;
  imageUrl: string;
  name: string;
  type?: string;
  color?: string;
  material?: string;
  season?: string;
};

export default function Closet() {
  const [clothes, setClothes] = useState<ClothesItem[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [newItem, setNewItem] = useState<{ name: string; image: string; file: File | null }>({ name: '', image: '', file: null });
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [clothesUploading, setClothesUploading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Состояния для модального окна редактирования параметров
  const [showEditModal, setShowEditModal] = useState(false);
  const [currentClothesItem, setCurrentClothesItem] = useState<ClothesItem | null>(null);

  //поиск
  const [searchTerm, setSearchTerm] = useState('');


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
      toast.error('Выберите пожалуйста изображение.');
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
    if (!clothesUploading && e.target === e.currentTarget) {
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

      // Обновляем список вещей
      const newClothes = data.newClothes;
      setClothes((prev) => [...prev, newClothes]);

      // Закрываем модальное окно загрузки
      setShowModal(false);

      // Устанавливаем текущий предмет и открываем окно редактирования параметров
      setCurrentClothesItem(newClothes);
      setShowEditModal(true);

      // Сбрасываем форму
      setNewItem({ name: '', image: '', file: null });

    } catch (error) {
      console.error("Error submitting item:", error);
      toast.error('Ошибка при сохранении. Пожалуйста, попробуйте снова.');
    } finally {
      setClothesUploading(false);
    }
  };

  // Функция обновления списка одежды после редактирования параметров
  const handleEditSuccess = async () => {
    try {
      const storedUser = localStorage.getItem('user');
      if (!storedUser) return;

      const parsedUser = JSON.parse(storedUser);
      const userId = parsedUser.id as string;

      const clothesRes = await fetch(`/api/closet/clothes?userId=${userId}`);
      const clothesData = await clothesRes.json();
      setClothes(clothesData.clothes);
    } catch (error) {
      console.error("Failed to update closet data:", error);
    }
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center', height: '100vh' }}>
        <div className={styles.loader}></div>
        <h3>Loading...</h3>
      </div>
    );
  }


  const filteredClothes = clothes.filter((item) => {
    const term = searchTerm.toLowerCase();

    return (
      item.type?.toLowerCase().includes(term) ||
      item.color?.toLowerCase().includes(term) ||
      item.material?.toLowerCase().includes(term) ||
      item.season?.toLowerCase().includes(term)
    );
  });


  return (
    <>
      <div className={styles.header}>
        <h3>Шкаф</h3>
        <button onClick={() => setShowModal(true)} className={styles.addButton}>Добавить</button>
      </div>
      <input
        type="text"
        placeholder="Поиск..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className={styles.searchInput}
      />
      <div className={styles.items}>



        {filteredClothes.map((item) => (
          <ItemAccount
            key={item.id}
            id={item.id}
            img={item.imageUrl}
            title={item.type ?? 'вещь'}
            onClick={(id) => {
              const selectedItem = clothes.find(item => item.id === id);
              if (selectedItem) {
                setCurrentClothesItem(selectedItem);
                setShowEditModal(true);
              }
            }}
          />
        ))}

      </div>

      {/* Modal Window for upload */}
      {showModal && (
        <div className={styles.modalOverlay} onClick={handleModalOverlayClick}>
          <div className={styles.modalContent}>
            {clothesUploading ? (
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

      

      {/* Modal Window for editing clothes parameters */}
      {showEditModal && currentClothesItem && (
        <ClothesEditModal
          isOpen={showEditModal}
          onClose={() => setShowEditModal(false)}
          imageUrl={currentClothesItem.imageUrl}
          clothesId={currentClothesItem.id}
          initialType={currentClothesItem.type || 'Футболка'}
          initialColor={currentClothesItem.color || 'Синий'}
          initialMaterial={currentClothesItem.material || 'Хлопок'}
          initialSeason={currentClothesItem.season || 'Всесезонный'}
          onSuccess={handleEditSuccess}
        />
      )}
    </>
  );
}
