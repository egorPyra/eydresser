'use client'


import React from "react";
import styles from "./closet.module.css";
import ItemAccount from "@/components/ItemAccount";


export default function Closet() {
  const items = [
    {img:"/closet/ 8.avif", title:"джинсовка"},
    {img:"/closet/ 1.avif", title:"шорты"},
    {img:"/closet/ 2.avif", title:"куртка"},
    {img:"/closet/ 3.avif", title:"башмаки"},
    {img:"/closet/ 4.avif", title:"панама"},
    {img:"/closet/ 5.avif", title:"сумка"},
  ]
  
  return (
    <>
      <div className={styles.header}>
        <h2>Шкаф</h2>
        <div className={styles.hiUser}>
          <h3>Привет,&nbsp;Егор</h3>
          <img src="/userAvatar.png" className={styles.userAvatar}/>
        </div>
      </div>
      <div className={styles.items}>
        {items.map((item) => <ItemAccount img={item.img} title={item.title}/>)}
      </div>
    </>
  );
}
