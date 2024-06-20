'use client'

import React from "react";
import styles from "../page.module.css";

export default function Closet() {

  return (
    <div>
      <div className={styles.header}>
        <h2>Образы</h2>
        <div className={styles.hiUser}>
          <h3>Привет,&nbsp;Егор</h3>
          <img src="/userAvatar.png" className={styles.userAvatar}/>
        </div>
      </div>
      <h3 style={{margin:'3rem'}}>К сожалению данная страница сейчас находится в разработке</h3>
    </div>
  );
}
