// controllers/parametersController.js
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
  UzliUchetaCarbon,
} from '../models/parameter.js';

export const getParameters = async (req, res) => {
  try {
    const { start, end, category } = req.query;
    const { parameterType } = req.params;

    // Определение модели по типу параметра
    const modelMap = {
      vr1: PechVr1,
      vr2: PechVr2,
      sushilka1: Sushilka1,
      sushilka2: Sushilka2,
      reactor: SmolReactor,
      melniza1: Melniza1,
      melniza2: Melniza2,
      melniza10b: Melniza10b,
      mpa2: PechMpa2,
      mpa3: PechMpa3,
      uzliUcheta: UzliUchetaCarbon
    };

    const Model = modelMap[parameterType];

    if (!Model) return res.status(400).json({ message: 'Неизвестный тип параметра' });

    const startDate = start ? new Date(start) : new Date(Date.now() - 24 * 60 * 60 * 1000);
    const endDate = end ? new Date(end) : new Date();

    if (isNaN(startDate) || isNaN(endDate)) return res.status(400).json({ message: 'Неверный формат дат' });

    const query = { timestamp: { $gte: startDate, $lte: endDate } };
    if (category) query.name = new RegExp(`^${category} `);

    const data = await Model.find(query).sort({ timestamp: 1 });
    res.json({ [parameterType]: data });
  } catch (error) {
    console.error('Ошибка получения данных:', error);
    res.status(500).json({ message: 'Ошибка получения данных', error: error.message });
  }
};
