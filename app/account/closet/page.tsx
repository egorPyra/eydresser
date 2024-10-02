'use client'

import React, { useEffect, useState } from "react";
import styles from "./closet.module.css";
import ItemAccount from "@/components/ItemAccount";
import { useRouter } from 'next/navigation';
import Image from "next/image";

export default function Closet() {
  const [clothes, setClothes] = useState([]);
  const [outfits, setOutfits] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchClosetData = async () => {
      try {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
          const parsedUser = JSON.parse(storedUser);
          const userId = parsedUser.id;

          // Fetch clothes
          const clothesRes = await fetch(`/api/closet/clothes?userId=${userId}`);
          const clothesData = await clothesRes.json();
          setClothes(clothesData.clothes);

          // Fetch outfits
          const outfitsRes = await fetch(`/api/closet/outfits?userId=${userId}`);
          const outfitsData = await outfitsRes.json();
          setOutfits(outfitsData.outfits);
        } else {
          router.push('/login');
        }
      } catch (error) {
        console.error("Failed to fetch closet data:", error);
      }
    };

    fetchClosetData();
  }, [router]);

  

  return (
    <>
      <div className={styles.header}>
        <h2>Шкаф</h2>
        
      </div>
      <div className={styles.items}>
        {clothes.map((item) => (
          <ItemAccount key={item.id} img={item.imageUrl} title={item.name} />
        ))}
        {outfits.map((outfit) => (
          <ItemAccount key={outfit.id} img={outfit.imageUrl} title={outfit.name} />
        ))}
      </div>
    </>
  );
}
