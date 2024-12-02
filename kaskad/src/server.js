import express from 'express';
import mongoose from 'mongoose';
import axios from 'axios';
import cors from 'cors';

const app = express();
const PORT = 3000;

// Подключение к MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/carbon');
mongoose.connection.on('connected', () => console.log('Подключено к MongoDB'));
mongoose.connection.on('error', (err) => console.error('Ошибка подключения к MongoDB:', err));

// Создание схемы для хранения параметров с TTL индексом
const parameterSchema = new mongoose.Schema({
  name: String,
  value: Number,
  timestamp: { type: Date, default: Date.now, expires: '100d' },
});

const PechVr1 = mongoose.model('PechVr1', parameterSchema);
const PechVr2 = mongoose.model('PechVr2', parameterSchema);
const Sushilka1 = mongoose.model('Sushilka1', parameterSchema);
const Sushilka2 = mongoose.model('Sushilka2', parameterSchema);
const SmolReactor = mongoose.model('SmolReactorK296', parameterSchema);
const Melniza1 = mongoose.model('Melniza1', parameterSchema);
const Melniza2 = mongoose.model('Melniza2', parameterSchema);
const Melniza10b = mongoose.model ('Melniza10b', parameterSchema);
const PechMpa2 = mongoose.model('PechMpa2', parameterSchema);
const PechMpa3 = mongoose.model('PechMpa3', parameterSchema);

// Middleware
app.use(cors());
app.use(express.json());

const parseLastUpdated = (str) => {
  const [date, time] = str.split(', ');
  const [day, month, year] = date.split('.').map(Number);
  const [hours, minutes, seconds] = time.split(':').map(Number);
  return new Date(year, month - 1, day, hours, minutes, seconds);
};

const addCategoryPrefix = (category, name, noPrefix = false) => {
  if (noPrefix) return name; // Без префиксов, если флаг установлен
  return ({
    temperatures: 'Температура ',
    pressures: 'Давление ',
    vacuums: 'Разрежение ',
    levels: 'Уровень ',
  }[category] || '') + name;
};

const extractParameters = (data, timestamp, noPrefix = false) =>
  ['temperatures', 'pressures', 'vacuums', 'levels', 'im', 'gorelka', 'data'].flatMap((category) =>
    Object.entries(data[category] || {}).map(([name, obj]) => {
      const value = typeof obj === 'boolean' ? (obj ? 1 : 0) : parseFloat(obj?.value ?? obj);
      return !isNaN(value) ? {
        name: addCategoryPrefix(category, name, noPrefix),
        value,
        timestamp,
      } : null;
    }).filter(item => item) // Удаляем null из массива
  );

  const fetchData = async () => {
    const endpoints = [
      { url: 'http://169.254.0.156:3002/api/vr1-data', model: PechVr1 },
      { url: 'http://169.254.0.156:3002/api/vr2-data', model: PechVr2 },
      { url: 'http://169.254.0.156:3002/api/sushilka1-data', model: Sushilka1, noPrefix: true },
      { url: 'http://169.254.0.156:3002/api/sushilka2-data', model: Sushilka2, noPrefix: true },
      { url: 'http://169.254.0.156:3002/api/reactorK296-data', model: SmolReactor, noPrefix: true },
      { url: 'http://169.254.0.156:3002/api/mill1-data', model: Melniza1, noPrefix: true },
      { url: 'http://169.254.0.156:3002/api/mill2-data', model: Melniza2, noPrefix: true },
      { url: 'http://169.254.0.156:3002/api/mill10b-data', model: Melniza10b, noPrefix: true },
      { url: 'http://169.254.0.156:3002/api/mpa2-data', model: PechMpa2, noPrefix: true },
      { url: 'http://169.254.0.156:3002/api/mpa3-data', model: PechMpa3, noPrefix: true },
    ];

    for (const { url, model, noPrefix } of endpoints) {
      try {
        const { data } = await axios.get(url);
        const timestamp = parseLastUpdated(data.lastUpdated);
        const parameters = extractParameters(data, timestamp, noPrefix);

        if (parameters.length > 0) {
          await model.insertMany(parameters);
        }
      } catch (error) {
        console.error(`Ошибка при извлечении данных с ${url}:`, error.message);
      }
    }
  };


// Запуск fetchData каждые 60 секунд
setInterval(fetchData, 60000);
fetchData();

app.get('/api/parameters/:parameterType', async (req, res) => {
  try {
    const { start, end, category } = req.query;
    const { parameterType } = req.params;
    const Model = parameterType === 'vr1' ? PechVr1
      : parameterType === 'vr2' ? PechVr2
      : parameterType === 'sushilka1' ? Sushilka1
      : parameterType === 'sushilka2' ? Sushilka2
      : parameterType === 'reactor' ? SmolReactor
      : parameterType === 'melniza1' ? Melniza1
      : parameterType === 'melniza2' ? Melniza2
      : parameterType === 'melniza10b' ? Melniza10b
      : parameterType === 'mpa2' ? PechMpa2
      : parameterType === 'mpa3' ? PechMpa3
      : null;

    if (!Model) return res.status(400).json({ message: 'Неизвестный тип параметра' });

    const startDate = start ? new Date(start) : new Date(Date.now() - 24 * 60 * 60 * 1000);
    const endDate = end ? new Date(end) : new Date();

    if (isNaN(startDate) || isNaN(endDate)) return res.status(400).json({ message: 'Неверный формат дат' });

    const query = { timestamp: { $gte: startDate, $lte: endDate } };
    if (category) query.name = new RegExp(`^${category} - `);

    const data = await Model.find(query).sort({ timestamp: 1 });
    res.json({ [parameterType]: data });
  } catch (error) {
    console.error('Ошибка получения данных:', error);
    res.status(500).json({ message: 'Ошибка получения данных', error: error.message });
  }
});

app.listen(PORT, () => console.log(`Сервер запущен на http://localhost:${PORT}`));