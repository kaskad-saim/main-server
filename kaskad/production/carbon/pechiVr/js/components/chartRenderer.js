import { showNoDataMessage, hideNoDataMessage, showPreloader, hidePreloader, updateTitle } from './uiUtils.js';
import { insertGapsInData, hasNoValidData } from './dataUtils.js';
import { createCrosshairPlugin, chartAreaBorderPlugin, colors } from './chartUtils.js';
import { fetchData } from './fetchData.js';

let chartInstance = null;

// Функция для рендеринга графика
export async function renderChart(options, elements, isDataVisible) {
  const {
    parameterType,
    labels,
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

    updateTitle(elements, isArchive && selectedDate ? `${chartTitle} за ${selectedDate}` : chartTitle);

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
            borderColor: colors[index % colors.length],
            backgroundColor: colors[index % colors.length],
            borderWidth: 2,
            pointRadius: 0,
            spanGaps: false,
          })),
        },
        options: {
          animation: false,
          responsive: true, // Добавляем поддержку изменения размера
          maintainAspectRatio: false, // Позволяет изменять график по ширине и высоте
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
