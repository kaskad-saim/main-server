import express from 'express';
import mongoose from 'mongoose';
import axios from 'axios';
import cors from 'cors';
import * as cheerio from 'cheerio';

const app = express();
const PORT = 3000;

// Подключение к MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/carbon');

// Создание схемы и модели для хранения данных
const parameterSchema = new mongoose.Schema({
  name: String,
  value: Number,
  timestamp: { type: Date, default: Date.now },
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
        const value = parseFloat(valueText.replace(',', '.')); // Изменено для извлечения числового значения

        if (name && !isNaN(value)) {
          const currentTime = new Date().toLocaleString(); // Получаем текущее время в читаемом формате

          if (classList.includes('vr1')) {
            parametersVr1.push({ name, value });
          } else if (classList.includes('vr2')) {
            parametersVr2.push({ name, value });
          }

          // console.log(`${currentTime}: ${name} - ${value} `);
        }
      }
    });

    if (parametersVr1.length > 0) {
      await PechVr1.insertMany(parametersVr1);
      console.log('Данные для PechVr1 успешно сохранены');
    }

    if (parametersVr2.length > 0) {
      await PechVr2.insertMany(parametersVr2);
      console.log('Данные для PechVr2 успешно сохранены');
    }
  } catch (error) {
    console.error('Ошибка при извлечении данных:', error);
  }
};

// Запуск функции fetchData каждые 10 секунд
setInterval(fetchData, 30000);

// Новый маршрут для получения данных
app.get('/api/parameters', async (req, res) => {
  try {
    const dataVr1 = await PechVr1.find().sort({ timestamp: 1 });
    const dataVr2 = await PechVr2.find().sort({ timestamp: 1 });
    res.json({ vr1: dataVr1, vr2: dataVr2 });
  } catch (error) {
    res.status(500).json({ message: 'Ошибка получения данных' });
  }
});

// Запуск сервера
app.listen(PORT, () => {
  console.log(`Сервер запущен на http://localhost:${PORT}`);
});
