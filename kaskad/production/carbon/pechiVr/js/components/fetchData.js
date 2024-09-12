import { temperData } from './data.js'
;
export async function fetchData() {
  try {
    const response = await fetch('http://169.254.0.155:3000/api/parameters');
    const data = await response.json();

    // Обработка данных для каждого типа температуры
    for (const key in temperData) {
      temperData[key] = data.vr1
        .filter((item) => item.name === key)
        .map((item) => ({
          x: new Date(item.timestamp),
          y: item.value,
        }));
    }
  } catch (error) {
    console.error('Ошибка получения данных:', error);
  }
}
