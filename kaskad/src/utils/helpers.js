export const parseLastUpdated = (str) => {
  const [date, time] = str.split(', ');
  const [day, month, year] = date.split('.').map(Number);
  const [hours, minutes, seconds] = time.split(':').map(Number);
  return new Date(year, month - 1, day, hours, minutes, seconds);
};

export const addCategoryPrefix = (category, name, noPrefix = false) => {
  if (noPrefix) return name; // Без префиксов, если флаг установлен
  const prefixes = {
    temperatures: 'Температура ',
    pressures: 'Давление ',
    vacuums: 'Разрежение ',
    levels: 'Уровень ',
  };
  return (prefixes[category] || '') + name;
};

export const extractParameters = (data, timestamp, noPrefix = false) =>
  ['temperatures', 'pressures', 'vacuums', 'levels', 'im', 'gorelka', 'data'].flatMap((category) =>
    Object.entries(data[category] || {}).map(([name, obj]) => {
      const value = typeof obj === 'boolean' ? (obj ? 1 : 0) : parseFloat(obj?.value ?? obj);
      return !isNaN(value)
        ? {
            name: addCategoryPrefix(category, name, noPrefix),
            value,
            timestamp,
          }
        : null;
    }).filter(item => item) // Удаляем null из массива
  );
