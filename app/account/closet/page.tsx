'use client'


import React from "react";
import styles from "./closet.module.css";
import ItemAccount from "@/components/ItemAccount";


export default function Closet() {
  const items = [
    {img:"/closet/closet1.jpg", title:"test"},
    {img:"/closet/closet2.jpg", title:"test"},
    {img:"/closet/closet3.jpg", title:"test"},
    {img:"/closet/closet4.jpg", title:"test"},
    {img:"/closet/closet5.jpg", title:"test"},
    {img:"/closet/closet6.jpg", title:"test"},
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
