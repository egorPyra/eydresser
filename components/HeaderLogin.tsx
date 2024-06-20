'use client'

import React from 'react';
import styles from './HeaderLogin.module.css';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

const HeaderLogin: React.FC = () => {
  const router = useRouter();

  return (
    <header className={styles.headerContainer}>
      <button className={styles.button} onClick={() => router.push('/login')}>Вход</button>
      <button className={styles.buttonAccent} onClick={() => router.push('/registration')}>Регистрация</button>
      <div className={styles.logo}>
      <Image
              src="/logo.svg"
              alt="eydresser Logo"
              className={styles.logo}
              width={100}
              height={45}
              priority
            />
      </div>
      <div style={{ width: '45px' }}></div>  {/* empty */}
      
    </header>
  );
};

export default HeaderLogin;
