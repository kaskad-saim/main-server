// services/fetchDataService.js
import axios from 'axios';
import {
  PechVr1,
  PechVr2,
  Sushilka1,
  Sushilka2,
  SmolReactor,
  Melniza1,
  Melniza2,
  Melniza10b,
  PechMpa2,
  PechMpa3,
  NotisVr1,
  NotisVr2
} from '../models/parameter.js';
import { parseLastUpdated, extractParameters } from '../utils/helpers.js';

// Конфигурационные параметры
const FETCH_INTERVAL = 60000; // Интервал в миллисекундах (60 секунд)

const endpoints = [
  { url: 'http://169.254.0.156:3002/api/vr1-data', model: PechVr1 },
  { url: 'http://169.254.0.156:3002/api/vr2-data', model: PechVr2 },
  { url: 'http://169.254.0.156:3002/api/notis1-data', model: NotisVr1, noPrefix: true },
  { url: 'http://169.254.0.156:3002/api/notis2-data', model: NotisVr2, noPrefix: true },
  { url: 'http://169.254.0.156:3002/api/sushilka1-data', model: Sushilka1, noPrefix: true },
  { url: 'http://169.254.0.156:3002/api/sushilka2-data', model: Sushilka2, noPrefix: true },
  { url: 'http://169.254.0.156:3002/api/reactorK296-data', model: SmolReactor, noPrefix: true },
  { url: 'http://169.254.0.156:3002/api/mill1-data', model: Melniza1, noPrefix: true },
  { url: 'http://169.254.0.156:3002/api/mill2-data', model: Melniza2, noPrefix: true },
  { url: 'http://169.254.0.156:3002/api/mill10b-data', model: Melniza10b, noPrefix: true },
  { url: 'http://169.254.0.156:3002/api/mpa2-data', model: PechMpa2, noPrefix: true },
  { url: 'http://169.254.0.156:3002/api/mpa3-data', model: PechMpa3, noPrefix: true },
];

export const fetchData = async () => {
  for (const { url, model, noPrefix } of endpoints) {
    try {
      const { data } = await axios.get(url);
      const timestamp = parseLastUpdated(data.lastUpdated);
      const parameters = extractParameters(data, timestamp, noPrefix);

      if (parameters.length > 0) {
        await model.insertMany(parameters);
        // console.log(`Данные успешно сохранены из ${url}`);
      }
    } catch (error) {
      console.error(`Ошибка при извлечении данных с ${url}:`, error.message);
    }
  }
};

export const startFetching = () => {
  setInterval(fetchData, FETCH_INTERVAL);
};
