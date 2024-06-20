'use client'


import React from "react";
import styles from "./page.module.css";

export default function Account() {

  const Cell1 = () => (
    <div className={styles.cell}>
      <h2>Заголовок 1</h2>
      <p>Содержимое ячейки 1</p>
    </div>
  );

  const Cell2 = () => (
    <div className={styles.cell}>
      <h2>Заголовок 2</h2>
      <p>Содержимое ячейки 2</p>
    </div>
  );

  const Cell3 = () => (
    <div className={styles.cell}>
      <h2>Заголовок 1</h2>
      <p>Содержимое ячейки 1</p>
    </div>
  );

  const Cell4 = () => (
    <div className={styles.cell}>
      <h2>Заголовок 2</h2>
      <p>Содержимое ячейки 2</p>
    </div>
  );

  //большая
  const Cell5 = () => (
    <div className={`${styles.cell} ${styles.large}`}>
      <h2>Заголовок 3</h2>
      <p>Содержимое ячейки 3, объединенной</p>
    </div>
  );


  return (
    <>
      <div className={styles.header}>
        <h2>Главная</h2>
        <div className={styles.hiUser}>
          <h3>Привет,&nbsp;Егор</h3>
          <img src="/userAvatar.png" className={styles.userAvatar} />
        </div>
      </div>

      <div className={styles.grid}>
        <div className={styles.column}>
            <Cell1 />
            <Cell2 />
        </div>
        <div className={styles.column}>
            <Cell3 />
            <Cell4 />
        </div>
        <div className={`${styles.column} ${styles.large}`}>
            <Cell3 />
        </div>
    </div>
    </>
  );
}