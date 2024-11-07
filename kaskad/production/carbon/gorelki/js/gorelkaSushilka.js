import { renderChartCombined, toggleChartData, resetChart } from './components/chartRenderer.js';
import { getLast24HoursRange, getSingleDateRange, isToday } from './components/dataUtils.js';
import { elements } from './components/chartUtils.js';
import { setupInactivityTimer } from './components/timer.js';
import { fetchData } from './components/fetchData.js';

// Состояния
let isDataVisible = true;
let isArchiveMode = false;

// Функция для отображения графика
async function renderGraphic(start, end, isArchive = false, isAutoUpdate = false) {
  // Извлекаем данные для обоих горелок
  const dataSushilka1 = await fetchData('sushilka1', start, end); // Данные для горелки №1
  const dataSushilka2 = await fetchData('sushilka2', start, end); // Данные для горелки №2

  // Объединяем данные для графика
  const combinedData = [
    ...dataSushilka1
      .filter(item => item.name === 'Мощность горелки №1')
      .map(item => ({ ...item, label: 'Мощность горелки №1' })),
    ...dataSushilka2
      .filter(item => item.name === 'Мощность горелки №2')
      .map(item => ({ ...item, label: 'Мощность горелки №2' })),
  ];

  renderChartCombined(
    {
      parameterType: ['sushilka1', 'sushilka2'], // Указываем оба типа данных
      labels: ['Мощность горелки №1', 'Мощность горелки №2'], // Метки для горелок
      units: ['%', '%'],
      yAxisConfig: {
        min: 0,
        max: 100,
        stepSize: 5,
        title: 'Мощность (%)',
      },
      chartTitle: 'График мощности горелок (Сушилки)',
      start,
      end,
      isArchive,
      isAutoUpdate,
    },
    elements,
    isDataVisible,
    combinedData // Передаем объединенные данные в renderChart
  );
}

// Обработчики событий
elements.confirmDateBtn.addEventListener('click', () => {
  const { start, end } = getSingleDateRange(elements.singleDate.value);
  if (start && end) {
    if (isToday(start)) {
      isArchiveMode = false;
      const { start: last24Start, end: last24End } = getLast24HoursRange();
      renderGraphic(last24Start, last24End, false);
    } else {
      isArchiveMode = true;
      renderGraphic(start, end, true);
    }
  } else {
    alert('Пожалуйста, выберите корректную дату.');
  }
});

elements.toggleDataBtn.addEventListener('click', () => {
  isDataVisible = !isDataVisible; // Сначала изменяем состояние
  toggleChartData(isDataVisible); // Затем вызываем функцию для изменения видимости данных
  elements.toggleDataBtn.textContent = isDataVisible ? 'Скрыть данные' : 'Показать данные'; // Обновляем текст кнопки
});

elements.resetBtn.addEventListener('click', () => {
  resetChart();
  location.reload();
});

// Инициализация при загрузке документа
document.addEventListener('DOMContentLoaded', () => {
  const today = new Date().toISOString().split('T')[0];
  elements.singleDate.value = today;

  const { start, end } = getLast24HoursRange();
  renderGraphic(start, end, false);

  // Настройка таймера неактивности
  setupInactivityTimer(() => {
    if (isArchiveMode) {
      location.reload();
    }
  });

  // Автообновление графика каждые 60 секунд
  setInterval(() => {
    if (!isArchiveMode) {
      const { start, end } = getLast24HoursRange();
      renderGraphic(start, end, false, true);
    }
  }, 60000);
});
