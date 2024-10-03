import React from 'react';
import './Skeleton.css'; // Подключим стили для анимации скелетона

export default function Skeleton() {
  return (
    <div className="skeleton-box">
      <div className="skeleton-image"></div>
    </div>
  );
}
