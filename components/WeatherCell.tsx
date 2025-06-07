'use client';

import { useEffect, useState } from 'react';
import styles from "./page.module.css";

type WeatherData = {
  currentTemp: string;
  city: string;
};

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

export default function WeatherCell() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!navigator.geolocation) {
      setError('Геолокация не поддерживается');
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;

        try {
          const res = await fetch(
            `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&cnt=1&units=metric&lang=ru&appid=5bd04c390deae29cb691f4d07132d6f6`
          );

          if (!res.ok) throw new Error('Ошибка при получении погоды');

          const data = await res.json();

          setWeather({
            currentTemp: Math.round(data.list[0].main.temp) + '°',
            city: data.city.name,
          });
        } catch (err: any) {
          setError('Ошибка запроса: ' + err.message);
        } finally {
          setLoading(false);
        }
      },
      (err) => {
        setError('Доступ к геолокации отклонён: ' + err.message);
        setLoading(false);
      }
    );
  }, []);

  if (loading) return <p>Загрузка погоды...</p>;
  if (error) return <p>{error}</p>;

  return (
    <Cell
      header="Погода"
      bigText={weather?.currentTemp ?? '—'}
      info1={weather?.city ?? 'Неизвестно'}
    />
  );
}
