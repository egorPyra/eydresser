'use client';

import React, { useEffect, useState } from "react";
import styles from "./page.module.css";
import { useRouter } from "next/navigation";
// import WeatherCell from "@/components/WeatherCell";
import { getWeather } from "@/tools/get-weather";

export interface User {
  fullName: string;
  clothesCount: number;
  outfitsCount: number;
  clothesLastMonth: number;
  outfitLastMonth: number;
}

export default function Account() {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  const [weather, setWeather] = useState<{ currentTemp: string; city: string } | null>(null);

  useEffect(() => {
    async function fetchWeather() {
      try {
        const res = await fetch(
          'https://api.openweathermap.org/data/2.5/forecast?lat=59.9386&lon=30.3141&cnt=5&units=metric&lang=ru&appid=5bd04c390deae29cb691f4d07132d6f6'
        );
        if (!res.ok) throw new Error('Ошибка при получении погоды');

        const data = await res.json();

        const currentTemp = Math.round(data.list[0].main.temp) + '°';
        const city = data.city.name;

        setWeather({ currentTemp, city });
      } catch (e) {
        console.error('Ошибка погоды:', e);
      }
    }

    fetchWeather();
  }, []);



  useEffect(() => {
    const fetchUserData = async () => {
      console.log("Fetching user data...");
      try {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
          const parsedUser = JSON.parse(storedUser);
          console.log("parsed user:", parsedUser);

          // Optionally, fetch more details from the backend using the stored user's ID
          const res = await fetch(`/api/users/${parsedUser.id}`);
          console.log("Fetched user data:", res);
          const data = await res.json();
          console.log("Fetched user data:", data);

          // Assuming the API returns user data including clothes and outfits count
          setUser({
            fullName: data.fullName,
            clothesCount: data.clothesCount,
            outfitsCount: data.outfitsCount,
            clothesLastMonth: data.clothesLastMonth,
            outfitLastMonth: data.outfitLastMonth,
          });
        } else {
          console.log("User data not in localStorage, redirecting to login page...");
          // If user data is not in localStorage, redirect to login page
          router.push('/login');
        }
      } catch (error) {
        console.error("Failed to fetch user data:", error);
        // router.push('/login');
      }
    };

    fetchUserData();
  }, [router]);

  const Cell = ({ header, bigText, info, info1 }: { header?: string, bigText?: string, info?: string, info1?: string }) => (
    <div className={styles.cell}>
      <h6>{header}</h6>
      <span className={styles.count}>{bigText}</span>
      <div style={{ display: 'flex', height: '35%', alignItems: 'flex-end' }}>
        <p className={styles.numberPlusOne}>{info1}</p>
        <p className={styles.numberPlus}>{info}</p>
      </div>
    </div>
  );

  const CellImg = ({ header, bigText, info, img }: { header?: string, bigText?: string, info?: string, img?: string }) => (
    <div className={styles.cellImg}>
      <h6>{header}</h6>
      <span className={styles.count}>{bigText}</span>
      <p className={styles.numberPlus}>{info}</p>
      <img src="/historyLook.png" />
    </div>
  );

  if (!user) {
    // Display a loading state while the user data is being fetched
    return <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center', height: '100vh' }}>
      <div className={styles.loader}></div>
      <h3>Loading...</h3>
    </div>;
  }

  return (
    <>
      <div className={styles.header}>
        {/* <h2>Главная</h2> */}
        <h3>Привет,&nbsp;{user.fullName}</h3>
        <div className={styles.hiUser}>
          {/* <h3>Привет,&nbsp;{user.fullName}</h3> */}
          {/* <img src="/userAvatar.png" className={styles.userAvatar} /> */}
        </div>
      </div>

      <div className={styles.grid}>
        <div className={styles.column}>
          <Cell header="Одежда" bigText={user.clothesCount.toString()} info1={"+" + user.clothesLastMonth} info=" за последний месяц" />
          {/* <Cell header="Просмотры" bigText="1.2M" info1="+40к " info=" за последний месяц" /> */}
        </div>
        <div className={styles.column}>
          <Cell header="Образы" bigText={user.outfitsCount.toString()} info1={"+" + user.outfitLastMonth} info=" за последний месяц" />
          {/* <CellImg header="История образов" /> */}
        </div>
        <div className={`${styles.column} ${styles.large}`}>
          {/* <div className={`${styles.cell} ${styles.large}`}>
            <h6>Погода</h6>
            <div className={styles.gradus}>
              <img src="/weather.png" className={styles.weatherIcon} />
              <p className={styles.temperature}>+1º</p>
            </div>
            <p style={{ margin: '10px 0' }}>📍 Санкт-Петербург</p>
            <div className={styles.table}>
              <table>
                <tbody>
                  <tr>
                    <td>Ср</td>
                    <td>0º</td>
                  </tr>
                  <tr>
                    <td>Чт</td>
                    <td>+1º</td>
                  </tr>
                  <tr>
                    <td>Пт</td>
                    <td>+2º</td>
                  </tr>
                  <tr>
                    <td>Сб</td>
                    <td>+1º</td>
                  </tr>
                  <tr>
                    <td>Вс</td>
                    <td>+2º</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div> */}

          <Cell
            header="Погода"
            bigText={weather?.currentTemp ?? '...'}
            info1="&#128205;"
            info={weather?.city ?? '...'}
          />

        </div>
      </div>
    </>
  );
}
