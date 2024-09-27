export function getLast24HoursRange() {
  const end = new Date();
  const start = new Date(end.getTime() - 24 * 60 * 60 * 1000);
  return { start, end };
}

export function getSingleDateRange(singleDateValue) {
  if (!singleDateValue) return { start: null, end: null };

  const startDate = new Date(singleDateValue);
  startDate.setHours(0, 0, 0, 0);
  const endDate = new Date(startDate);
  endDate.setHours(23, 59, 59, 999);

  return { start: startDate, end: endDate };
}

export function isToday(date) {
  const today = new Date();
  return date.toDateString() === today.toDateString();
}

export function insertGapsInData(data, gapThreshold = 5 * 60 * 1000) {
  const result = [];

  for (let i = 0; i < data.length - 1; i++) {
    result.push(data[i]);

    const currentTime = new Date(data[i].x).getTime();
    const nextTime = new Date(data[i + 1].x).getTime();

    if (nextTime - currentTime > gapThreshold) {
      result.push({ x: data[i + 1].x, y: null });
    }
  }

  result.push(data[data.length - 1]);
  return result;
}

export function hasNoValidData(chartData) {
  return chartData.every((dataPoint) => dataPoint.y === null || !dataPoint.y);
}
