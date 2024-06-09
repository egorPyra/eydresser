import React from "react";
import styles from '@/components/features.module.css';
import Image from "next/image";

export default function Features() {

    return (
        <div className={styles.box}>
            <h1 className={styles.title}>Функционал</h1>

            <div className={styles.cardsBox}>
                <div className={styles.card}>
                    <Image
                        src="/sample.jpg"
                        alt="eydresser Logo"
                        className={styles.logo}
                        width={350}
                        height={350}
                        priority
                    />
                    <div className={styles.cardTextBox}>
                    <h3>Управляй гардеробом</h3>
                    </div>
                </div>
                <div className={styles.card}>
                    <Image
                        src="/sample.jpg"
                        alt="eydresser Logo"
                        className={styles.logo}
                        width={350}
                        height={350}
                        priority
                    />
                    <div className={styles.cardTextBox}>
                    <h3>Создавай образы</h3>
                    </div>
                </div>
                <div className={styles.card}>
                    <Image
                        src="/sample.jpg"
                        alt="eydresser Logo"
                        className={styles.logo}
                        width={350}
                        height={350}
                        priority
                    />
                    <div className={styles.cardTextBox}>
                    <h3>Ищи вдохновение</h3>
                    </div>
                </div>
            </div>
        </div>
    );
}
