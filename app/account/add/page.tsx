'use client'

import React, { useState, useRef } from "react";
import styles from "../closet/closet.module.css";
import "./add.css";
import Image from "next/image";
import DraggableImage from "@/components/DraggableImage";

interface ImageItem {
  src: string;
  alt: string;
}

interface ImageData {
  id: number;
  src: string;
  alt: string;
  position: { x: number; y: number };
  rotationAngle: number;
}

let imageData: ImageData[] = [];


export default function Closet() {
  const [images, setImages] = useState<ImageItem[]>([]);
  const [rotateAngle, setRotateAngle] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (event: ProgressEvent<FileReader>) => {
        const result = event.target?.result;
        if (result) {
          setImages((prevImages) => [
            ...prevImages,
            { key: prevImages.length, src: result as string, alt: `uploaded ${prevImages.length}` }
          ]);
        }
      };
      reader.readAsDataURL(file);
    }
  };


  const handleChangeRotation = (e: React.ChangeEvent<HTMLInputElement>) => {
    const angle = parseInt(e.target.value);
    setRotateAngle(angle);
  };

  const handleClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleSaveData = () => {
    const dataToSave = images.map((image, index) => ({
      id: index + 1,
      src: image.src,
      alt: image.alt,
      position: { x: 0, y: 0 },
      rotationAngle: rotateAngle
    }));

    try {
      const jsonData = JSON.stringify(dataToSave, null, 2);
      localStorage.setItem("savedData", jsonData);
      alert("Данные сохранены!");
    } catch (error) {
      console.error("Error saving data:", error);
      alert("Произошла ошибка при сохранении данных.");
    }
  };



  return (
    <div>
      <div className={styles.header}>
        <h2>Добавить</h2>
        <div className={styles.hiUser}>
          <h3>Привет,&nbsp;Егор</h3>
          <img src="/userAvatar.png" className={styles.userAvatar} />
        </div>
      </div>
      <div className="content">
        <div className="greyZone">
          {images.map((image) => (
            <DraggableImage
              src={image.src}
              alt={image.alt}
              rotateAngle={rotateAngle}
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
          <div className="rotate">
            <h3>Поворот</h3>
            <input
              type="range"
              min="0"
              max="360"
              value={rotateAngle}
              onChange={handleChangeRotation}
              className="rotateInput"
            />
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
