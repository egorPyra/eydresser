'use client'

import React from "react";
import styles from "./ItemAccount.module.css";
import Image from "next/image";

export default function ItemAccount({img, title}: {img: string, title: string}) {


  return (
    <div className={styles.item}>
        <div className={styles.imgWrapper}>
            <Image src={img} layout="fill" objectPosition="contain" alt="item image"/>
        </div>
        <p>{title}</p>
    </div>
  );
}