// models/Parameter.js
import mongoose from 'mongoose';

const parameterSchema = new mongoose.Schema({
  name: String,
  value: Number,
  timestamp: { type: Date, default: Date.now, expires: '100d' },
});

// Экспорт моделей
export const PechVr1 = mongoose.model('PechVr1', parameterSchema);
export const PechVr2 = mongoose.model('PechVr2', parameterSchema);
export const Sushilka1 = mongoose.model('Sushilka1', parameterSchema);
export const Sushilka2 = mongoose.model('Sushilka2', parameterSchema);
export const SmolReactor = mongoose.model('SmolReactorK296', parameterSchema);
export const Press3 = mongoose.model('Press3', parameterSchema);
export const Melniza1 = mongoose.model('Melniza1', parameterSchema);
export const Melniza2 = mongoose.model('Melniza2', parameterSchema);
export const Melniza10b = mongoose.model('Melniza10b', parameterSchema);
export const PechMpa2 = mongoose.model('PechMpa2', parameterSchema);
export const PechMpa3 = mongoose.model('PechMpa3', parameterSchema);
export const NotisVr1 = mongoose.model ('NotisVr1', parameterSchema);
export const NotisVr2 = mongoose.model ('NotisVr2', parameterSchema);
export const UzliUchetaCarbon = mongoose.model ('UzliUchetaCarbon', parameterSchema);
