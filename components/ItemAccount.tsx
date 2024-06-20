'use client'

import React from "react";
import styles from "./ItemAccount.module.css";
import Image from "next/image";

export default function ItemAccount({img, title}: {img: string, title: string}) {


  return (
    <div className={styles.item}>
      <Image src={img} width={100} height={100} alt="item image"/>
      <p>{title}</p>
    </div>
  );
}