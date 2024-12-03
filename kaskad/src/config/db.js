// config/db.js
import mongoose from 'mongoose';

// Конфигурационные параметры
const MONGODB_URI = 'mongodb://127.0.0.1:27017/carbon';

const connectDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Подключено к MongoDB');
  } catch (err) {
    console.error('Ошибка подключения к MongoDB:', err);
    process.exit(1);
  }
};

export default connectDB;
