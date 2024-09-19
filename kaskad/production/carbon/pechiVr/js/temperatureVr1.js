// Импорт необходимых модулей и данных
import { fetchData } from './components/fetchData.js';
import { colors, elements, createCrosshairPlugin, chartAreaBorderPlugin } from './components/chartUtils.js';
import { dataLabels } from './components/data.js';

let chart;
let isDataVisible = true;
let isArchiveMode = false;
let inactivityTimer;
const INACTIVITY_LIMIT = 5 * 60 * 1000; // 5 минут

// Функция для показа/скрытия элементов
function toggleElementVisibility(element, isVisible) {
  element.style.display = isVisible ? 'block' : 'none';
}

function showNoDataMessage() {
  toggleElementVisibility(elements.noDataMessage, true);
  toggleElementVisibility(elements.chartCanvas, false);
  if (chart) {
    chart.clear();
    chart.destroy(); // Полное уничтожение графика
    chart = null;
  }
}

function hideNoDataMessage() {
  toggleElementVisibility(elements.noDataMessage, false);
  toggleElementVisibility(elements.chartCanvas, true);
}

function showPreloader() {
  elements.loadingWrapper.style.display = 'flex';
}

function hidePreloader() {
  elements.loadingWrapper.style.display = 'none';
}

function getLast24HoursRange() {
  const end = new Date();
  const start = new Date(end.getTime() - 24 * 60 * 60 * 1000); // 24 часа назад
  return { start, end };
}

function getSingleDateRange() {
  const selectedDate = elements.singleDate.value;
  if (!selectedDate) return { start: null, end: null };

  const startDate = new Date(selectedDate);
  startDate.setHours(0, 0, 0, 0);
  const endDate = new Date(startDate);
  endDate.setHours(23, 59, 59, 999);

  return { start: startDate, end: endDate };
}

function isToday(date) {
  const today = new Date();
  return date.toDateString() === today.toDateString();
}

function toggleChartData() {
  if (!chart) return;

  chart.data.datasets.forEach((dataset, index) => {
    // Сбрасываем состояние hidden, установленное через легенду
    chart.getDatasetMeta(index).hidden = null;
    // Устанавливаем новое значение hidden
    dataset.hidden = isDataVisible;
  });

  elements.toggleDataBtn.textContent = isDataVisible ? 'Показать данные' : 'Скрыть данные';
  chart.update();
  isDataVisible = !isDataVisible;
}

function updateTitle(chartTitle) {
  elements.graphTitle.textContent = chartTitle;
}

// Функция для вставки null в случае разрыва данных
function insertGapsInData(data, gapThreshold = 5 * 60 * 1000) {
  const result = [];

  for (let i = 0; i < data.length - 1; i++) {
    result.push(data[i]);

    const currentTime = new Date(data[i].x).getTime();
    const nextTime = new Date(data[i + 1].x).getTime();

    // Если разница во времени больше порога, вставляем null
    if (nextTime - currentTime > gapThreshold) {
      result.push({ x: data[i + 1].x, y: null }); // Добавляем null, чтобы был разрыв
    }
  }

  result.push(data[data.length - 1]); // Добавляем последнюю точку данных
  return result;
}

// Функция для проверки отсутствия данных (включая null)
function hasNoValidData(chartData) {
  return chartData.every((dataPoint) => dataPoint.y === null || !dataPoint.y);
}

async function renderChart(options) {
  const {
    parameterType, // 'vr1', 'vr2' и т.д.
    labels, // Массив меток данных
    yAxisConfig, // Конфигурация оси Y { min, max, stepSize, title }
    chartTitle, // Заголовок графика
    start,
    end,
    isArchive = false,
    isAutoUpdate = false,
  } = options;

  try {
    if (!isAutoUpdate) showPreloader();

    // Получаем данные с сервера
    const data = await fetchData(parameterType, start, end);

    // Получаем выбранную дату и обновляем заголовок
    const selectedDate = start.toLocaleDateString('ru-RU', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });

    updateTitle(isArchive && selectedDate ? `${chartTitle} за ${selectedDate}` : chartTitle);

    // Подготавливаем данные для графика
    const chartData = {};
    let hasData = false;

    labels.forEach((label) => {
      const dataset = data
        .filter((item) => item.name === label)
        .map((item) => ({
          x: new Date(item.timestamp),
          y: item.value,
        }));

      const datasetWithGaps = insertGapsInData(dataset);

      chartData[label] = datasetWithGaps;

      // Проверяем, есть ли хоть одна точка данных, которая не null
      if (!hasNoValidData(datasetWithGaps)) {
        hasData = true; // Есть данные
      }
    });

    // Если данных нет, показываем сообщение
    if (!hasData) {
      if (!isAutoUpdate) hidePreloader();
      showNoDataMessage(); // Показываем сообщение об отсутствии данных
      if (chart) {
        chart.destroy();
        chart = null; // Обнуляем переменную chart
      }
      return;
    }

    hideNoDataMessage();

    if (!chart) {
      // Если график ещё не создан, создаём его
      const ctx = elements.chartCanvas.getContext('2d');

      chart = new Chart(ctx, {
        type: 'line',
        data: {
          datasets: Object.keys(chartData).map((key, index) => ({
            label: key,
            data: chartData[key],
            borderColor: colors[index % colors.length],
            backgroundColor: colors[index % colors.length],
            borderWidth: 2,
            pointRadius: 0,
            spanGaps: false, // Разрывы между точками
          })),
        },
        options: {
          animation: false,
          plugins: {
            tooltip: {
              mode: 'index',
              intersect: false,
              callbacks: {
                title: function (tooltipItems) {
                  const date = new Date(tooltipItems[0].parsed.x);
                  return date.toLocaleString('ru-RU', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: false,
                  });
                },
                label: function (tooltipItem) {
                  const datasetLabel = tooltipItem.dataset.label || '';
                  const value = tooltipItem.parsed.y;
                  return `${datasetLabel}: ${value} °C`;
                },
              },
            },
          },
          scales: {
            x: {
              type: 'time',
              time: {
                unit: 'hour',
                tooltipFormat: 'HH:mm',
                displayFormats: {
                  hour: 'HH:mm',
                },
              },
              afterDataLimits: (scale) => {
                const rightPadding = 30 * 60 * 1000;
                scale.max += rightPadding;
              },
            },
            y: {
              min: yAxisConfig.min,
              max: yAxisConfig.max,
              ticks: {
                stepSize: yAxisConfig.stepSize,
              },
              title: {
                display: true,
                text: yAxisConfig.title,
              },
            },
          },
        },
        plugins: [createCrosshairPlugin(), chartAreaBorderPlugin()],
      });
    } else {
      // Если график уже создан, обновляем данные
      chart.data.datasets.forEach((dataset, index) => {
        dataset.data = chartData[dataset.label];
      });

      // Обновляем параметры оси Y и заголовка графика
      chart.options.scales.y = {
        min: yAxisConfig.min,
        max: yAxisConfig.max,
        ticks: {
          stepSize: yAxisConfig.stepSize,
        },
        title: {
          display: true,
          text: yAxisConfig.title,
        },
      };

      chart.update(); // Обновляем график
    }

    if (!isAutoUpdate) hidePreloader();
  } catch (error) {
    console.error('Ошибка создания графика:', error);
    if (!isAutoUpdate) hidePreloader();
    showNoDataMessage();
  }
}

function resetInactivityTimer() {
  if (inactivityTimer) clearTimeout(inactivityTimer);
  if (isArchiveMode) {
    inactivityTimer = setTimeout(() => {
      location.reload();
    }, INACTIVITY_LIMIT);
  }
}

// Функция для отображения графика
function renderGraphic(start, end, isArchive = false, isAutoUpdate = false) {
  renderChart({
    parameterType: 'vr1', // Используем 'vr1' для температуры
    labels: dataLabels.temperatures, // Метки данных температуры
    yAxisConfig: {
      min: 0,
      max: 1500,
      stepSize: 100,
      title: 'Температура (°C)',
    },
    chartTitle: 'График температур печи карбонизации №1',
    start,
    end,
    isArchive,
    isAutoUpdate,
  });
}

// Обработчики событий
elements.confirmDateBtn.addEventListener('click', () => {
  const { start, end } = getSingleDateRange();
  if (start && end) {
    if (isToday(start)) {
      isArchiveMode = false;
      const { start: last24Start, end: last24End } = getLast24HoursRange();
      renderGraphic(last24Start, last24End, false);
    } else {
      isArchiveMode = true;
      renderGraphic(start, end, true);
    }
    resetInactivityTimer();
  } else {
    alert('Пожалуйста, выберите корректную дату.');
  }
});

elements.toggleDataBtn.addEventListener('click', () => {
  toggleChartData();
  resetInactivityTimer();
});

elements.resetBtn.addEventListener('click', () => {
  location.reload();
  resetInactivityTimer();
});

document.addEventListener('DOMContentLoaded', () => {
  // Устанавливаем текущую дату в поле ввода
  const today = new Date().toISOString().split('T')[0];
  elements.singleDate.value = today;

  const { start, end } = getLast24HoursRange();
  renderGraphic(start, end, false);
  resetInactivityTimer();

  // Автообновление графика каждые 60 секунд
  setInterval(() => {
    if (!isArchiveMode) {
      const { start, end } = getLast24HoursRange();
      renderGraphic(start, end, false, true);
    }
  }, 60000);
});
