import { renderChart, toggleChartData, resetChart } from './components/chartRenderer.js';
import { getLast24HoursRange, getSingleDateRange, isToday } from './components/dataUtils.js';
import { dataLabels } from './components/data.js';
import { elements } from './components/chartUtils.js';
import { setupInactivityTimer } from './components/timer.js';

// Состояния
let isDataVisible = true;
let isArchiveMode = false;

// Функция для отображения графика
function renderGraphic(start, end, isArchive = false, isAutoUpdate = false) {
renderChart(
    {
      parameterType: 'sushilka2',
      labels: dataLabels.pressures,
      units: dataLabels.pressures.map(() => 'кгс/м2'), // Все метки имеют единицу °C
      yAxisConfig: {
        min: -20,
        max: 10,
        stepSize: 1,
        title: 'Давление / разрежение',
      },
      chartTitle: 'График давления / разрежения сушилки №2',
      start,
      end,
      isArchive,
      isAutoUpdate,
    },
    elements,
    isDataVisible
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