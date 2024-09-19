import express from 'express';
import mongoose from 'mongoose';
import axios from 'axios';
import cors from 'cors';
import * as cheerio from 'cheerio';

const app = express();
const PORT = 3000;

// Подключение к MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/carbon');

// Создание схемы и модели для хранения данных с TTL индексом
const parameterSchema = new mongoose.Schema({
  name: String,
  value: Number,
  timestamp: { type: Date, default: Date.now, expires: '100d' }, // Данные удаляются через 100 дней
});

const PechVr1 = mongoose.model('PechVr1', parameterSchema);
const PechVr2 = mongoose.model('PechVr2', parameterSchema);

// Middleware
app.use(cors());

// Функция для извлечения и сохранения данных
const fetchData = async () => {
  try {
    const response = await axios.get(
      'http://techsite4/kaskad/Web_Clnt.dll/ShowPage?production/carbon/pechiVr/pechiVrTelegram.htm'
    );
    const $ = cheerio.load(response.data);

    const parametersVr1 = [];
    const parametersVr2 = [];

    $('tr.table__tr').each((index, element) => {
      const name = $(element).find('td.table__td--object.table__left').text().trim();
      const valueText = $(element).find('td.table__td--object.table__right').text().trim();
      const classList = $(element).find('td.table__td--object.table__right').attr('class');

      if (valueText) {
        const value = parseFloat(valueText.replace(',', '.')); // Извлечение числового значения

        if (name && !isNaN(value)) {
          if (classList.includes('vr1')) {
            parametersVr1.push({ name, value });
          } else if (classList.includes('vr2')) {
            parametersVr2.push({ name, value });
          }
        }
      }
    });

    if (parametersVr1.length > 0) {
      await PechVr1.insertMany(parametersVr1);
    }

    if (parametersVr2.length > 0) {
      await PechVr2.insertMany(parametersVr2);
    }
  } catch (error) {
    console.error('Ошибка при извлечении данных:', error);
  }
};

// Запуск функции fetchData каждые 60 секунд
setInterval(fetchData, 60000);

// server.js

app.get('/api/parameters/:parameterType', async (req, res) => {
  try {
    const { start, end } = req.query;
    const { parameterType } = req.params;

    const endDate = end ? new Date(end) : new Date();
    const startDate = start ? new Date(start) : new Date(Date.now() - 24 * 60 * 60 * 1000);

    if (isNaN(startDate) || isNaN(endDate)) {
      return res.status(400).json({ message: 'Неверный формат дат' });
    }

    let data;
    if (parameterType === 'vr1') {
      data = await PechVr1.find({ timestamp: { $gte: startDate, $lte: endDate } }).sort({ timestamp: 1 });
    } else if (parameterType === 'vr2') {
      data = await PechVr2.find({ timestamp: { $gte: startDate, $lte: endDate } }).sort({ timestamp: 1 });
    } else {
      return res.status(400).json({ message: 'Неизвестный тип параметра' });
    }

    res.json({ [parameterType]: data });
  } catch (error) {
    console.error('Ошибка получения данных:', error);
    res.status(500).json({ message: 'Ошибка получения данных', error: error.message });
  }
});

// Запуск сервера
app.listen(PORT, () => {
  console.log(`Сервер запущен на http://localhost:${PORT}`);
});
