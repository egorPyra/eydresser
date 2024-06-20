'use client'

import React from "react";
import styles from "../closet/closet.module.css";
import ItemAccount from "@/components/ItemAccount";

export default function Liked() {
  const items = [
    {img:"/../../public/001.jpg", title:"test"},
    {img:"/../../public/001.jpg", title:"test"},
    {img:"/../../public/001.jpg", title:"test"},
    {img:"/../../public/001.jpg", title:"test"},
    {img:"/../../public/001.jpg", title:"test"},
  ]


  return (
    <div>
      <div className={styles.header}>
        <h2>Понравилось</h2>
        <div className={styles.hiUser}>
          <h3>Привет,&nbsp;Егор</h3>
          <img src="/userAvatar.png" className={styles.userAvatar}/>
        </div>
      </div>
      <div className={styles.items}>
        {items.map((item) => <ItemAccount img={item.img} title={item.title}/>)}
      </div>
    </div>
  );
}
