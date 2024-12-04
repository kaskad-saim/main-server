// server.js
import express from 'express';
import cors from 'cors';
import connectDB from './config/db.js';
import parametersRoutes from './routes/parameters.js';
import { startFetching } from './services/fetchDataService.js';
import { startFetchingUzliUchetaCarbon } from './services/fetchUzliUchetaCarbon.js';

// Конфигурационные параметры
const PORT = 3000;

// Подключение к базе данных
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Маршруты
app.use('/api', parametersRoutes);

// Запуск сервиса сбора данных
startFetching();
startFetchingUzliUchetaCarbon();

// Запуск сервера
app.listen(PORT, () => console.log(`Сервер запущен на http://localhost:${PORT}`));
