import React from 'react';
import Link from 'next/link';
import styles from './Hero.module.css';
import Image from 'next/image';

export default function Hero() {


    return (
        <div className={styles.container}>
            <div className={styles.textContainer}>
                <h5><b>eydresser</b> поможет разложить вещи по полкам!</h5>
                <button className={styles.button}>Начать</button>
            </div>
            <div className={styles.imageContainer}>
            <Image
              src="/hero.png"
              alt="eydresser Logo"
              className={styles.logo}
              width={310}
              height={800}
              priority
            />
            </div>
        </div>
    );
}