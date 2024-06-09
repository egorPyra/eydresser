import React from 'react';
import Link from 'next/link';
import styles from './Header.module.css';
import Image from 'next/image';

const Header: React.FC = () => {
  return (
    <header className={styles.headerContainer}>
      <button className={styles.button}>Вход</button>
      <button className={styles.buttonAccent}>Регистрация</button>
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

export default Header;
