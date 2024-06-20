'use client'


import React from "react";
import styles from "./page.module.css";

export default function Account() {

  const Cell = ({ header, bigText, info, img }: { header?: string, bigText?: string, info?: string, img?: string }) => (
    <div className={styles.cell}>
      <h6>{header}</h6>
      <span className={styles.count}>{bigText}</span>
      <p className={styles.numberPlus}>{info}</p>
    </div>
  );

  const CellImg = ({ header, bigText, info, img }: { header?: string, bigText?: string, info?: string, img?: string }) => (
    <div className={styles.cellImg}>
      <h6>{header}</h6>
      <span className={styles.count}>{bigText}</span>
      <p className={styles.numberPlus}>{info}</p>
      <img src="/historyLook.png" />
    </div>
  );

  //большая
  // const CellBig = ({header, info, weather}: {header: string, info: string, weather: string}) => (
  //   <div className={`${styles.cell} ${styles.large}`}>
  //     <h6>{header}</h6>
  //     <p>{info}</p>
  //     <p>{weather}</p>
  //   </div>
  // );



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
          <Cell header="Одежда" bigText="200" info="+10 за последний месяц" />
          <Cell header="Просмотры" bigText="1.2M" info="+10 за последний месяц" />
        </div>
        <div className={styles.column}>
          <Cell header="Образы" bigText="15" info="+10 за последний месяц" />
          <CellImg header="История образов"  />
        </div>
        <div className={`${styles.column} ${styles.large}`}>
          <div className={`${styles.cell} ${styles.large}`}>
            <h6>Погода</h6>
            <div className={styles.gradus}>
              <img src="/weather.png" className={styles.weatherIcon} />
              <p className={styles.temperature}>+15º</p>
            </div>
            <p style={{margin:'10px 0'}}>📍 Санкт-Петербург</p>
            <div className={styles.table}>
              <table>
                <tbody>
                  <tr>
                    <td>Ср</td>
                    <td>+16º</td>
                  </tr>
                  <tr>
                    <td>Чт</td>
                    <td>+17º</td>
                  </tr>
                  <tr>
                    <td>Пт</td>
                    <td>+14º</td>
                  </tr>
                  <tr>
                    <td>Сб</td>
                    <td>+19º</td>
                  </tr>
                  <tr>
                    <td>Вс</td>
                    <td>+21º</td>
                  </tr>
                </tbody>
              </table>
            </div>
        </div>
      </div>
    </div >
    </>
  );
}