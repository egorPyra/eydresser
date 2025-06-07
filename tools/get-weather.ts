// utils/getWeather.ts
export async function getWeather() {
  const url = `https://api.openweathermap.org/data/2.5/forecast?lat=59.93&lon=30.31&cnt=5&units=metric&lang=ru&appid=5bd04c390deae29cb691f4d07132d6f6`;

  const res = await fetch(url);
  if (!res.ok) throw new Error('Не удалось получить погоду');

  const data = await res.json();

  const currentTemp = Math.round(data.list[0].main.temp) + '°';
  const city = data.city.name;

  return { currentTemp, city };
}
