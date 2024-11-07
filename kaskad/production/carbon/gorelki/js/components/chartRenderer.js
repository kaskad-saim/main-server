import { showNoDataMessage, hideNoDataMessage, showPreloader, hidePreloader } from './uiUtils.js';
import { insertGapsInData, hasNoValidData } from './dataUtils.js';
import { createCrosshairPlugin, chartAreaBorderPlugin, colors } from './chartUtils.js';
// import { fetchData } from './fetchData.js';

let chartInstance = null;

// Функция для рендеринга графика
export async function renderChartCombined(options, elements, isDataVisible, combinedData) {
  const {
    labels,
    units,
    yAxisConfig,
    chartTitle,
    start,
    end,
    isArchive = false,
    isAutoUpdate = false,
  } = options;

  try {
    if (!isAutoUpdate) showPreloader(elements);

    const selectedDate = start.toLocaleDateString('ru-RU', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });

    // Формируем заголовок графика
    const fullChartTitle = isArchive && selectedDate ? `${chartTitle} за ${selectedDate}` : chartTitle;

    // Обрабатываем объединенные данные
    const chartData = {};
    labels.forEach((label) => {
      const dataset = combinedData
        .filter((item) => item.label === label)
        .map((item) => ({
          x: new Date(item.timestamp),
          y: typeof item.value === 'number' ? item.value : null,
        }));
      chartData[label] = insertGapsInData(dataset);
    });

    // Проверка на наличие данных
    const hasData = Object.values(chartData).some((dataset) => !hasNoValidData(dataset));
    if (!hasData) {
      if (!isAutoUpdate) hidePreloader(elements);
      showNoDataMessage(elements, chartInstance);
      destroyChart();
      return;
    }

    hideNoDataMessage(elements);

    if (!chartInstance) {
      const ctx = elements.chartCanvas.getContext('2d');
      chartInstance = new Chart(ctx, {
        type: 'line',
        data: {
          datasets: Object.keys(chartData).map((key, index) => ({
            label: key,
            data: chartData[key],
            borderColor: colors[index % colors.length],
            backgroundColor: colors[index % colors.length],
            borderWidth: 2,
            pointRadius: 0,
            spanGaps: false,
          })),
        },
        options: {
          animation: false,
          responsive: true,
          maintainAspectRatio: false,
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
                  const datasetIndex = tooltipItem.datasetIndex;
                  const unit = units[datasetIndex] || ''; // Получаем соответствующую единицу
                  return `${datasetLabel}: ${value} ${unit}`;
                },
              },
            },
            title: {
              display: true,
              text: fullChartTitle,
              color: 'green',
              font: { size: 24, weight: 'bold' },
              padding: { top: 10, bottom: 10 },
              align: 'center',
            },
          },
          scales: {
            x: {
              type: 'time',
              time: {
                unit: 'hour',
                tooltipFormat: 'HH:mm',
                displayFormats: { hour: 'HH:mm' },
              },
              afterDataLimits: (scale) => {
                if (!isArchive) {
                  const rightPadding = 30 * 60 * 1000; // 30 минут
                  scale.max += rightPadding;
                }
              },
            },
            y: {
              min: yAxisConfig.min,
              max: yAxisConfig.max,
              ticks: { stepSize: yAxisConfig.stepSize },
              title: { display: true, text: yAxisConfig.title },
            },
          },
        },
        plugins: [createCrosshairPlugin(), chartAreaBorderPlugin()],
      });

      toggleChartData(isDataVisible);
    } else {
      Object.keys(chartData).forEach((key) => {
        const dataset = chartInstance.data.datasets.find((ds) => ds.label === key);
        if (dataset) {
          dataset.data = chartData[key];
        }
      });
      chartInstance.update();
    }

    if (!isAutoUpdate) hidePreloader(elements);
  } catch (error) {
    console.error('Ошибка создания графика:', error);
    if (!isAutoUpdate) hidePreloader(elements);
    showNoDataMessage(elements, chartInstance);
    destroyChart();
  }
}


// Функция для уничтожения графика
function destroyChart() {
  if (chartInstance) {
    chartInstance.destroy();
    chartInstance = null;
  }
}

// Функция для переключения видимости данных на графике
export function toggleChartData(isDataVisible) {
  if (!chartInstance) return;

  chartInstance.data.datasets.forEach((dataset, index) => {
    chartInstance.getDatasetMeta(index).hidden = !isDataVisible;
  });

  chartInstance.update();
}

// Дополнительно: функция для сброса графика (например, при перезагрузке)
export function resetChart() {
  destroyChart();
}
