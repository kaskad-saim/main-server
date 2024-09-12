import { fetchData } from "./fetchData.js";
import { temperData } from "./data.js";
import { colors, createVerticalLinePlugin } from "./chartUtils.js";
import { showLoadingBar, hideLoadingBar } from "./loadingBarUtils.js";

let isFirstLoad = true; // Flag to track the first load
let chart;
export async function createChart() {
  if (isFirstLoad) {
    showLoadingBar();
  }

  try {
    const data = await fetchData();
    if (!data) return;

    const newLabels = [];

    data.vr1.forEach((item) => {
      if (temperData[item.name] !== undefined) {
        temperData[item.name].push(item.value);
        if (item.name === 'Температура 1-СК') {
          newLabels.push(item.timestamp);
        }
      }
    });

    if (!chart) {
      const ctx = document.getElementById('temperatureChart').getContext('2d');
      const now = new Date();
      const minDate = new Date(Date.now() - 24 * 60 * 60 * 1000);
      const maxDate = new Date(now.getTime() + 10 * 60 * 1000);

      // Создание графика
      chart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: newLabels,
          datasets: Object.keys(temperData).map((key, index) => ({
            label: key,
            data: temperData[key],
            borderColor: colors[index % colors.length],
            backgroundColor: colors[index % colors.length],
            fill: false,
            pointRadius: 0,
          })),
        },
        options: {
          responsive: true,
          animation: false,
          plugins: {
            tooltip: {
              mode: 'index',
              intersect: false,
              callbacks: {
                title: function (tooltipItems) {
                  const date = new Date(tooltipItems[0].label);
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
                  const datasetLabel = tooltipItem.dataset.label;
                  const value = tooltipItem.raw;
                  return `${datasetLabel}: ${value} °C`;
                },
              },
            },
            zoom: {
              pan: {
                enabled: true,
              },
              zoom: {
                wheel: {
                  enabled: true,
                },
                pinch: {
                  enabled: true,
                },
                mode: 'x',
              },
            },
          },
          scales: {
            x: {
              type: 'time',
              time: {
                unit: 'hour',
                displayFormats: {
                  hour: 'HH:mm',
                },
              },
              min: minDate.getTime(),
              max: maxDate.getTime(),
              ticks: {
                autoSkip: true,
                maxTicksLimit: 24,
              },
            },
            y: {
              beginAtZero: false,
              max: 1500,
              min: 0,
              ticks: {
                stepSize: 50,
              },
            },
            y2: {
              beginAtZero: true,
              max: 1500,
              min: 0,
              ticks: {
                stepSize: 50,
              },
              position: 'right',
              grid: {
                drawOnChartArea: false,
              },
            },
          },
        },
        plugins: [createVerticalLinePlugin()],
      });
    } else {
      // Обновление данных графика
      chart.data.labels = [...newLabels];
      chart.data.datasets.forEach((dataset) => {
        dataset.data = temperData[dataset.label] || [];
      });

      // Корректируем максимальную дату по оси X
      const newMaxDate = new Date(newLabels[newLabels.length - 1]);
      newMaxDate.setMinutes(newMaxDate.getMinutes() + 10);
      chart.options.scales.x.max = newMaxDate.getTime();
      chart.update('none');
    }
  } catch (error) {
    console.error('Ошибка при загрузке данных:', error);
  } finally {
    if (isFirstLoad) {
      hideLoadingBar();
      isFirstLoad = false;
    }
  }
}

export let isUserInteracting = false;
let inactivityTimeout;

let initialMinDate = new Date(new Date().getTime() - 24 * 60 * 60 * 1000);
let initialMaxDate = new Date();
let currentMinDate = new Date(initialMinDate);
let currentMaxDate = new Date(initialMaxDate);

let savedMinDate = currentMinDate;
let savedMaxDate = currentMaxDate;

function updateChartTimeRange() {
  chart.options.scales.x.min = currentMinDate.getTime();
  chart.options.scales.x.max = currentMaxDate.getTime();
  chart.update();
}

function resetInactivityTimeout() {
  clearTimeout(inactivityTimeout);
  inactivityTimeout = setTimeout(() => {
    isUserInteracting = false;
    currentMinDate = savedMinDate;
    currentMaxDate = savedMaxDate;
    updateChartTimeRange();
  }, 2 * 60 * 1000);
}

const debounceDelay = 100;
let debounceTimer;

function handleButtonClick(callback) {
  if (debounceTimer) {
    clearTimeout(debounceTimer);
  }
  debounceTimer = setTimeout(callback, debounceDelay);
}

document.getElementById('prevBtn').addEventListener('click', () => {
  handleButtonClick(() => {
    isUserInteracting = true;
    resetInactivityTimeout();
    savedMinDate = new Date(currentMinDate);
    savedMaxDate = new Date(currentMaxDate);

    currentMinDate.setHours(currentMinDate.getHours() - 12);
    currentMaxDate.setHours(currentMaxDate.getHours() - 12);
    updateChartTimeRange();
  });
});

document.getElementById('nextBtn').addEventListener('click', () => {
  handleButtonClick(() => {
    isUserInteracting = true;
    resetInactivityTimeout();
    savedMinDate = new Date(currentMinDate);
    savedMaxDate = new Date(currentMaxDate);

    currentMinDate.setHours(currentMinDate.getHours() + 12);
    currentMaxDate.setHours(currentMaxDate.getHours() + 12);
    updateChartTimeRange();
  });
});

document.getElementById('resetBtn').addEventListener('click', () => {
  isUserInteracting = true;
  resetInactivityTimeout();
  location.reload();
});

let chartDataVisible = true;

function toggleChartData() {
  chartDataVisible = !chartDataVisible;
  chart.data.datasets.forEach((dataset) => {
    dataset.hidden = !chartDataVisible;
  });
  chart.update();

  const toggleButton = document.getElementById('toggleDataBtn');
  toggleButton.textContent = chartDataVisible ? 'Отключить отображение' : 'Включить отображение';
}

document.getElementById('toggleDataBtn').addEventListener('click', () => {
  toggleChartData();
});