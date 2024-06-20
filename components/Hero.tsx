'use client'

import React from 'react';
import styles from './Hero.module.css';
import ThreeDModel from './ThreeDModel'; 

export default function Hero() {


    return (
        <div className={styles.container}>
            <div className={styles.textContainer}>
                <h5><b>eydresser</b> поможет разложить вещи по полкам!</h5>
                <button className={styles.button}>Начать</button>
            </div>
            <div className={styles.imageContainer}>
            <ThreeDModel />
            </div>
        </div>
    );
}