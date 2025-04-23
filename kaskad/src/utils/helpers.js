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
  ['temperatures', 'pressures', 'vacuums', 'levels', 'im', 'gorelka', 'data']
    .flatMap((category) =>
      Object.entries(data[category] || {})
        .flatMap(([name, obj]) => {
          const prefixName = addCategoryPrefix(category, name, noPrefix);
          const params = [];

          if (category === 'levels' && obj != null && typeof obj === 'object') {
            const val = parseFloat(obj.value);
            if (!isNaN(val)) {
              params.push({
                name: prefixName,
                value: val,
                timestamp,
              });
            }

            const pct = parseFloat(obj.percent);
            if (!isNaN(pct)) {
              params.push({
                name: `${prefixName} (%)`,
                value: pct,
                timestamp,
              });
            }
          } else {
            const raw = obj;
            const val = typeof raw === 'boolean'
              ? (raw ? 1 : 0)
              : parseFloat(raw?.value ?? raw);
            if (!isNaN(val)) {
              params.push({
                name: prefixName,
                value: val,
                timestamp,
              });
            }
          }

          return params;
        })
    );
