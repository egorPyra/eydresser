'use client'

import React from "react";
import styles from "./ItemAccount.module.css";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function ItemAccount({ 
  img, 
  title, 
  id, 
  onClick, 
  navigationUrl 
}: { 
  img?: string; 
  title: string; 
  id?: string; 
  onClick?: (id?: string) => void;
  navigationUrl?: string;
}) {
  const router = useRouter();
  
  const handleClick = () => {
    if (navigationUrl) {
      router.push(navigationUrl);
    } else if (onClick) {
      onClick(id);
    }
  };

  return (
    <div className={styles.item} onClick={handleClick}>
        {img && (
          <div className={styles.imgWrapper}>
            <Image src={img} layout="fill" objectPosition="contain" alt="item image" />
          </div>
        )}
        <h3>{title}</h3>
    </div>
  );
}