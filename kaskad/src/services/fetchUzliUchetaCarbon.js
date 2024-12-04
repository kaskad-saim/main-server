// services/fetchUzliUchetaCarbonService.js
import axios from 'axios';
import { UzliUchetaCarbon } from '../models/parameter.js';
import { parseLastUpdated } from '../utils/helpers.js';

// Конфигурация
const FETCH_INTERVAL = 60000; // Интервал (60 секунд)
const CARBON_ENDPOINT = 'http://169.254.0.156:3002/api/uzliUchetaCarbon';

const fetchUzliUchetaCarbonData = async () => {
  try {
    // Запрос данных
    const { data } = await axios.get(CARBON_ENDPOINT);

    const parameters = [];

    // Обработка данных каждого устройства
    for (const [deviceKey, deviceData] of Object.entries(data)) {
      const { data: metrics, lastUpdated } = deviceData;

      // Преобразуем `lastUpdated` в объект `Date`
      const timestamp = parseLastUpdated(lastUpdated);

      // Преобразуем каждый параметр в отдельную запись
      for (const [name, value] of Object.entries(metrics)) {
        parameters.push({
          name, // Уникальное имя, включая устройство
          value,
          timestamp,
        });
      }
    }

    // Сохраняем данные в базу
    if (parameters.length > 0) {
      await UzliUchetaCarbon.insertMany(parameters);
      // console.log(`Данные успешно сохранены из ${CARBON_ENDPOINT}`);
    }
  } catch (error) {
    console.error(`Ошибка при извлечении данных с ${CARBON_ENDPOINT}:`, error.message);
  }
};

// Периодический запуск
export const startFetchingUzliUchetaCarbon = () => {
  setInterval(fetchUzliUchetaCarbonData, FETCH_INTERVAL);
};
