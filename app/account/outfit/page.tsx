'use client'

import React, { useEffect, useState } from "react";
import styles from "../closet/closet.module.css";
import ItemAccount from "@/components/ItemAccount";
import { useRouter } from 'next/navigation';
import Image from "next/image";

export default function Closet() {
  const [outfits, setOutfits] = useState<{ id: string; imageUrl: string; name: string }[]>([]);
  const [loading, setLoading] = useState(true); // Track loading state
  const router = useRouter();

  useEffect(() => {
    const fetchClosetData = async () => {
      try {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
          const parsedUser = JSON.parse(storedUser);
          const userId = parsedUser.id;

          // Fetch outfits
          const outfitsRes = await fetch(`/api/outfits?userId=${userId}`);
          const outfitsData = await outfitsRes.json();
          setOutfits(outfitsData.outfits);

          // After fetching data, stop loading
          setLoading(false);
        } else {
          router.push('/login');
        }
      } catch (error) {
        console.error("Failed to fetch closet data:", error);
        setLoading(false); // Stop loading even on error
      }
    };

    fetchClosetData();
  }, [router]);

  // If loading, display loading spinner
  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center', height: '100vh' }}>
        <div className={styles.loader}></div>
        <h2>Loading...</h2>
      </div>
    );
  }

  return (
    <>
      <div className={styles.header}>
        <h2>Образы</h2>
      </div>
      <div className={styles.items}>
        {outfits.map((outfit) => (
          <ItemAccount 
            key={outfit.id} 
            id={outfit.id}
            img={outfit.imageUrl} 
            title={outfit.name} 
            navigationUrl={`/account/newOutfit?outfitId=${outfit.id}`}
          />
        ))}
      </div>
    </>
  );
}
