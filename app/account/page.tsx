'use client'


import React from "react";
import styles from "./page.module.css";

export default function Account() {

  const Cell = ({header, bigText, info}: {header?: string, bigText?: string, info?: string}) => (
    <div className={styles.cell}>
      <h6>{header}</h6>
      <h1>{bigText}</h1>
      <p>{info}</p>
    </div>
  );

  //большая
  const CellBig = ({header, info}: {header: string, info: string}) => (
    <div className={`${styles.cell} ${styles.large}`}>
      <h6>{header}</h6>
      <p>{info}</p>
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
            <Cell header="Заголовок 1" bigText="200" info="Содержимое ячейки 1, объединенной"/>
            <Cell header="Заголовок 2" bigText="1.2M" info="Содержимое ячейки 2, объединенной"/>
        </div>
        <div className={styles.column}>
            <Cell header="Заголовок 3" bigText="15" info="Содержимое ячейки 3, объединенной"/>
            <Cell header="Заголовок 4" info="Содержимое ячейки 4, объединенной"/>
        </div>
        <div className={`${styles.column} ${styles.large}`}>
            <CellBig header="Заголовок 4" info="Содержимое ячейки 4, объединенной"/>
        </div>
    </div>
    </>
  );
}