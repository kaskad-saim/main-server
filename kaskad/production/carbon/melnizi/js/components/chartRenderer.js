import { showNoDataMessage, hideNoDataMessage, showPreloader, hidePreloader } from './uiUtils.js';
import { insertGapsInData, hasNoValidData } from './dataUtils.js';
import { createCrosshairPlugin, chartAreaBorderPlugin, colors } from './chartUtils.js';
import { fetchData } from './fetchData.js';
import { labelMapping } from './data.js';

let chartInstance = null;

// Функция для рендеринга графика
export async function renderChart(options, elements, isDataVisible) {
  const {
    parameterType,
    labels,
    units, // Добавляем units в деструктуризацию options
    yAxisConfig,
    chartTitle,
    start,
    end,
    isArchive = false,
    isAutoUpdate = false,
  } = options;

  try {
    if (!isAutoUpdate) showPreloader(elements);

    const data = await fetchData(parameterType, start, end);

    const selectedDate = start.toLocaleDateString('ru-RU', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });

    // Формируем заголовок графика
    const fullChartTitle = isArchive && selectedDate ? `${chartTitle} за ${selectedDate}` : chartTitle;

    const chartData = {};
    let hasData = false;

    labels.forEach((label) => {
      const mappedLabel = labelMapping[label] || label; // Используем пользовательское название или оригинальное
      const dataset = data
        .filter((item) => item.name === label)
        .map((item) => ({
          x: new Date(item.timestamp),
          y: typeof item.value === 'number' ? item.value : null,
        }));

      const datasetWithGaps = insertGapsInData(dataset);
      chartData[mappedLabel] = datasetWithGaps; // Применяем пользовательское название здесь

      if (!hasNoValidData(datasetWithGaps)) {
        hasData = true;
      }
    });

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
            borderColor: colors[index % colors.length], // Яркий цвет линии
            backgroundColor: colors[index % colors.length], // Цвет точек
            borderWidth: 3, // Увеличиваем ширину линии
            pointRadius: 0, // Увеличиваем размер точек
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
                  const datasetLabel = labelMapping[tooltipItem.dataset.label] || tooltipItem.dataset.label;
                  const value = tooltipItem.parsed.y;
                  const datasetIndex = tooltipItem.datasetIndex;
                  const unit = units[datasetIndex] || '';
                  return `${datasetLabel}: ${value} ${unit}`;
                },
              },
            },
            title: {
              display: true,
              text: fullChartTitle,
              color: 'green',
              font: {
                size: 24,
                weight: 'bold',
              },
              padding: {
                top: 10,
                bottom: 10,
              },
              align: 'center',
            },
            annotation: {
              annotations: {
                greenZone: {
                  type: 'box',
                  yMin: 0,
                  yMax: 20,
                  backgroundColor: 'rgba(0, 255, 0, 0.1)',
                  borderColor: 'green',
                  borderWidth: 2,
                  label: {
                    content: 'Допустимая вибрация',
                    enabled: true,
                    position: 'end', // Позиция текста: 'start', 'center', 'end'
                    color: 'black',
                    font: {
                      size: 14,
                      weight: 'bold',
                    },
                  },
                },
                yellowZone: {
                  type: 'box',
                  yMin: 20,
                  yMax: 25,
                  backgroundColor: 'rgba(255, 255, 0, 0.1)',
                  borderColor: 'yellow',
                  borderWidth: 2,
                  label: {
                    content: 'Повышенная вибрация',
                    enabled: true,
                    position: 'end',
                    color: 'black',
                    font: {
                      size: 14,
                      weight: 'bold',
                    },
                  },
                },
                redZone: {
                  type: 'box',
                  yMin: 25,
                  yMax: 30,
                  backgroundColor: 'rgba(255, 0, 0, 0.1)',
                  borderColor: 'red',
                  borderWidth: 2,
                  label: {
                    content: 'Опасная вибрация',
                    enabled: true,
                    position: 'end',
                    color: 'black',
                    font: {
                      size: 14,
                      weight: 'bold',
                    },
                  },
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
                if (!isArchive) {
                  const rightPadding = 30 * 60 * 1000;
                  scale.max += rightPadding;
                }
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
          layout: {
            padding: {
              top: 0,
              bottom: 0,
              left: 0,
              right: 0,
            },
          },
        },

        plugins: [createCrosshairPlugin(), chartAreaBorderPlugin()],
      });

      // Устанавливаем начальное состояние видимости данных
      toggleChartData(isDataVisible);
    } else {
      Object.keys(chartData).forEach((key) => {
        const dataset = chartInstance.data.datasets.find((ds) => ds.label === key);
        if (dataset) {
          dataset.data = chartData[key];
        }
      });

      chartInstance.options.scales.y.min = yAxisConfig.min;
      chartInstance.options.scales.y.max = yAxisConfig.max;
      chartInstance.options.scales.y.ticks.stepSize = yAxisConfig.stepSize;
      chartInstance.options.scales.y.title.text = yAxisConfig.title;

      // Обновляем заголовок графика
      chartInstance.options.plugins.title.text = fullChartTitle;

      // Обновляем цвет заголовка на зеленый
      chartInstance.options.plugins.title.color = 'green';

      // Обновляем отступы заголовка
      chartInstance.options.plugins.title.padding.bottom = 10; // Уменьшаем отступ

      // Обновляем отступ по оси X при обновлении графика
      chartInstance.options.scales.x.afterDataLimits = (scale) => {
        if (!isArchive) {
          // Добавляем отступ только для текущих данных
          const rightPadding = 30 * 60 * 1000; // 30 минут в миллисекундах
          scale.max += rightPadding;
        }
      };

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
