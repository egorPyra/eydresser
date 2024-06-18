'use client'

import React from 'react';
import Link from 'next/link';
import styles from './HeaderBack.module.css';
import Image from 'next/image';
import { useRouter } from 'next/navigation';


export default function HeaderBack() {
  const router = useRouter();

  return (
    <>
    <header className={styles.headerContainer}>
      <button className={styles.button} type="button" onClick={() => router.back()}>
        Назад
      </button>

      
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
        <div style={{ width: '130px' }}></div>  {/* empty */}
      </header>
    </>
  );
};


