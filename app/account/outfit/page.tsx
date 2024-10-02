'use client'

import React, { useEffect, useState } from "react";
import styles from "../closet/closet.module.css";
import ItemAccount from "@/components/ItemAccount";

// Assuming this is the structure of clothes and outfits data from the backend
type Item = {
  img: string;
  title: string;
};

export default function Closet() {
  const [items, setItems] = useState<Item[]>([]);
  const [outfits, setOutfits] = useState<Item[]>([]);
  const [userName, setUserName] = useState<string>("");

  // Example fetching clothes and outfits dynamically
  useEffect(() => {
    // Fetch user name
    const fetchUserName = async () => {
      try {
        const res = await fetch("/api/user");
        const data = await res.json();
        setUserName(data.name);
      } catch (error) {
        console.error("Failed to fetch user name:", error);
      }
    };

    // Fetch items (clothes)
    const fetchItems = async () => {
      try {
        const res = await fetch("/api/closet/clothes");
        const data = await res.json();
        setItems(data.clothes);
      } catch (error) {
        console.error("Failed to fetch clothes:", error);
      }
    };

    // Fetch outfits
    const fetchOutfits = async () => {
      try {
        const res = await fetch("/api/closet/outfits");
        const data = await res.json();
        setOutfits(data.outfits);
      } catch (error) {
        console.error("Failed to fetch outfits:", error);
      }
    };

    fetchUserName();
    fetchItems();
    fetchOutfits();
  }, []);

  return (
    <>
      <div className={styles.header}>
        <h2>Шкаф</h2>
        <div className={styles.hiUser}>
          <h3>Привет,&nbsp;{userName}</h3>
          <img src="/userAvatar.png" className={styles.userAvatar} />
        </div>
      </div>

      {/* Outfits Section */}
      <div>
        <h3 className={styles.sectionTitle}>Образы</h3>
        <div className={styles.itemsGrid}>
          {outfits.map((outfit, index) => (
            <ItemAccount key={index} img={outfit.img} title={outfit.title} />
          ))}
        </div>
      </div>
    </>
  );
}
