'use client';

import React, { useState } from 'react';
import styles from '../closet/closet.module.css';
import './settings.css';
import toast, { Toaster } from 'react-hot-toast';
import bcrypt from 'bcryptjs';

export default function Settings() {
  const [formData, setFormData] = useState({
    name: 'Егор',   // Default values
    email: 'test@mail.ru',
    password: '',
    confirmPassword: ''
  });

  const [loading, setLoading] = useState(false);

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { name, email, password, confirmPassword } = formData;

    if (password && password !== confirmPassword) {
      toast.error('Пароли не совпадают.');
      return;
    }

    setLoading(true);

    try {
      let hashedPassword;

      if (password) {
        hashedPassword = await bcrypt.hash(password, 10);
      }

      const dataToSend: any = {
        name,
        email,
        userId: 3
      };

      // Include password only if it was provided
      if (hashedPassword) {
        dataToSend.password = hashedPassword;
      }

      // Make the API call to update user info
      const response = await fetch('/api/settings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(dataToSend)
      });

      if (response.ok) {
        toast.success('Данные успешно обновлены.');
      } else {
        const errorData = await response.json();
        toast.error(errorData.error || 'Произошла ошибка при обновлении данных.');
      }
    } catch (error) {
      console.error('Error updating user:', error);
      toast.error('Не удалось обновить данные.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* Toaster for toast messages */}
      <Toaster position="bottom-center" />

      <div className={styles.header}>
        <h3>Настройки</h3>
      </div>
      <form onSubmit={handleSubmit} className='authForm'>
        <label htmlFor="name" className="authLabel"><h6>Имя</h6></label>
        <input
          id="name"
          name="name"
          className="authInput"
          value={formData.name}
          onChange={handleInputChange}
        />

        <label htmlFor="email" className="authLabel"><h6>Почта</h6></label>
        <input
          id="email"
          name="email"
          className="authInput"
          value={formData.email}
          onChange={handleInputChange}
        />

        <label htmlFor="password" className="authLabel"><h6>Пароль</h6></label>
        <input
          id="password"
          name="password"
          type="password"
          className="authInput"
          value={formData.password}
          onChange={handleInputChange}
        />

        <label htmlFor="confirmPassword" className="authLabel"><h6>Повторите пароль</h6></label>
        <input
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          className="authInput"
          value={formData.confirmPassword}
          onChange={handleInputChange}
        />

        <button type="submit" className="authButton" disabled={loading}>
          {loading ? 'Сохранение...' : 'Сохранить'}
        </button>
      </form>
    </div>
  );
}
