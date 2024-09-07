// Fetch data from the server
async function fetchData() {
  try {
    const response = await fetch('http://169.254.0.155:3000/api/parameters');
    const data = await response.json();
    return data;
  } catch (error) {
    return null;
  }
}

// Create the chart
let chart = null;

async function createChart() {
  const data = await fetchData();

  if (!data) return;

  const temper1Skolz = [];
  const temper2Skolz = [];
  const temper3Skolz = [];
  const temperVTopke = [];
  const temperVVerhuKameri = [];
  const temperVNizuKameri = [];
  const temperNaVhodePechiDozhiga = [];
  const temperNaVykhodePechiDozhiga = [];
  const temperKameraVygruzki = [];
  const temperDymovykhGazovKotl = [];
  const temperGazovDoSkrubber = [];
  const temperGazovPosleSkrubber = [];
  const temperVodyVanneSkrubber = [];
  const temperGranulPosleKholod = [];

  const labels = [];

  data.vr1.forEach((item) => {
    if (item.name === 'Температура 1-СК') {
      temper1Skolz.push(item.value);
      labels.push(item.timestamp); // Store the timestamp as is
    } else if (item.name === 'Температура 2-СК') {
      temper2Skolz.push(item.value);
    } else if (item.name === 'Температура 3-СК') {
      temper3Skolz.push(item.value);
    } else if (item.name === 'В топке') {
      temperVTopke.push(item.value);
    } else if (item.name === 'Вверху камеры загрузки') {
      temperVVerhuKameri.push(item.value);
    } else if (item.name === 'Внизу камеры загрузки') {
      temperVNizuKameri.push(item.value);
    } else if (item.name === 'На входе печи дожига') {
      temperNaVhodePechiDozhiga.push(item.value);
    } else if (item.name === 'На выходе печи дожига') {
      temperNaVykhodePechiDozhiga.push(item.value);
    } else if (item.name === 'Камера выгрузки') {
      temperKameraVygruzki.push(item.value);
    } else if (item.name === 'Температура дымовых газов котла-утилизатора') {
      temperDymovykhGazovKotl.push(item.value);
    } else if (item.name === 'Температура газов до скруббера') {
      temperGazovDoSkrubber.push(item.value);
    } else if (item.name === 'Температура газов после скруббера') {
      temperGazovPosleSkrubber.push(item.value);
    } else if (item.name === 'Температура воды в ванне скруббера') {
      temperVodyVanneSkrubber.push(item.value);
    } else if (item.name === 'Температура гранул после холод-ка') {
      temperGranulPosleKholod.push(item.value);
    }
  });

  const ctx = document.getElementById('temperatureChart').getContext('2d');
  const now = new Date();
  const minDate = new Date(now.getTime() - 24 * 60 * 60 * 1000); // 24 часа назад
  const maxDate = new Date(now.getTime() + 10 * 60 * 1000); // текущее время + 10 минут для отступа

  const verticalLinePlugin = {
    id: 'verticalLine',
    afterDatasetsDraw(chart) {
      if (chart.tooltip._active && chart.tooltip._active.length) {
        const ctx = chart.ctx;
        const activePoint = chart.tooltip._active[0];
        const x = activePoint.element.x;
        const topY = chart.scales.y.top;
        const bottomY = chart.scales.y.bottom;

        ctx.save();
        ctx.beginPath();
        ctx.moveTo(x, topY);
        ctx.lineTo(x, bottomY);
        ctx.lineWidth = 1;
        ctx.strokeStyle = 'rgba(0, 0, 0, 0.5)';
        ctx.stroke();
        ctx.restore();
      }
    },
  };

  if (!chart) {
    chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Температура 1-СК',
            data: temper1Skolz,
            borderColor: 'rgba(255, 99, 132, 1)',
            backgroundColor: 'rgba(255, 99, 132, 1)', // Полное закрашивание
            fill: false,
            pointRadius: 0, // Удалить метки
          },
          {
            label: 'Температура 2-СК',
            data: temper2Skolz,
            borderColor: 'rgba(54, 162, 235, 1)',
            backgroundColor: 'rgba(54, 162, 235, 1)', // Полное закрашивание
            fill: false,
            pointRadius: 0, // Удалить метки
          },
          {
            label: 'Температура 3-СК',
            data: temper3Skolz,
            borderColor: 'rgba(75, 192, 192, 1)',
            backgroundColor: 'rgba(75, 192, 192, 1)', // Полное закрашивание
            fill: false,
            pointRadius: 0, // Удалить метки
          },
          {
            label: 'В топке',
            data: temperVTopke,
            borderColor: 'rgba(75, 138, 192, 1)',
            backgroundColor: 'rgba(75, 138, 192, 1)', // Полное закрашивание
            fill: false,
            pointRadius: 0, // Удалить метки
          },
          {
            label: 'Вверху камеры загрузки',
            data: temperVVerhuKameri,
            borderColor: 'rgba(153, 102, 255, 1)',
            backgroundColor: 'rgba(153, 102, 255, 1)', // Полное закрашивание
            fill: false,
            pointRadius: 0, // Удалить метки
          },
          {
            label: 'Внизу камеры загрузки',
            data: temperVNizuKameri,
            borderColor: 'rgba(255, 159, 64, 1)',
            backgroundColor: 'rgba(255, 159, 64, 1)', // Полное закрашивание
            fill: false,
            pointRadius: 0, // Удалить метки
          },
          {
            label: 'На входе печи дожига',
            data: temperNaVhodePechiDozhiga,
            borderColor: 'rgba(255, 206, 86, 1)',
            backgroundColor: 'rgba(255, 206, 86, 1)', // Полное закрашивание
            fill: false,
            pointRadius: 0, // Удалить метки
          },
          {
            label: 'На выходе печи дожига',
            data: temperNaVykhodePechiDozhiga,
            borderColor: 'rgba(75, 192, 192, 0.5)',
            backgroundColor: 'rgba(75, 192, 192, 0.5)', // Полное закрашивание
            fill: false,
            pointRadius: 0, // Удалить метки
          },
          {
            label: 'Камера выгрузки',
            data: temperKameraVygruzki,
            borderColor: 'rgba(255, 99, 132, 0.5)',
            backgroundColor: 'rgba(255, 99, 132, 0.5)', // Полное закрашивание
            fill: false,
            pointRadius: 0, // Удалить метки
          },
          {
            label: 'Температура дымовых газов котла-утилизатора',
            data: temperDymovykhGazovKotl,
            borderColor: 'rgba(54, 162, 235, 0.5)',
            backgroundColor: 'rgba(54, 162, 235, 0.5)', // Полное закрашивание
            fill: false,
            pointRadius: 0, // Удалить метки
          },
          {
            label: 'Температура газов до скруббера',
            data: temperGazovDoSkrubber,
            borderColor: 'rgba(153, 102, 255, 0.5)',
            backgroundColor: 'rgba(153, 102, 255, 0.5)', // Полное закрашивание
            fill: false,
            pointRadius: 0, // Удалить метки
          },
          {
            label: 'Температура газов после скруббера',
            data: temperGazovPosleSkrubber,
            borderColor: 'rgba(255, 159, 64, 0.5)',
            backgroundColor: 'rgba(255, 159, 64, 0.5)', // Полное закрашивание
            fill: false,
            pointRadius: 0, // Удалить метки
          },
          {
            label: 'Температура воды в ванне скруббера',
            data: temperVodyVanneSkrubber,
            borderColor: 'rgba(255, 206, 86, 0.5)',
            backgroundColor: 'rgba(255, 206, 86, 0.5)', // Полное закрашивание
            fill: false,
            pointRadius: 0, // Удалить метки
          },
          {
            label: 'Температура гранул после холод-ка',
            data: temperGranulPosleKholod,
            borderColor: 'rgba(75, 192, 192, 0.3)',
            backgroundColor: 'rgba(75, 192, 192, 0.3)', // Полное закрашивание
            fill: false,
            pointRadius: 0, // Удалить метки
          },
        ],
      },
      options: {
        responsive: true,
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
              mode: 'xy',
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
            // Вторая ось Y
            beginAtZero: true,
            max: 1500,
            min: 0,
            ticks: {
              stepSize: 50, // Шаг между метками
            },
            position: 'right', // Шкала справа
            grid: {
              drawOnChartArea: false, // Отображение сетки только на одной из осей Y
            },
          },
        },
      },
      plugins: [verticalLinePlugin],
    });
  } else {
    // Update the existing chart data
    chart.data.labels = labels;
    chart.data.datasets[0].data = temper1Skolz;
    chart.data.datasets[1].data = temper2Skolz;
    chart.data.datasets[2].data = temper3Skolz;
    chart.data.datasets[3].data = temperVTopke;
    chart.data.datasets[4].data = temperVVerhuKameri;
    chart.data.datasets[5].data = temperVNizuKameri;
    chart.data.datasets[6].data = temperNaVhodePechiDozhiga;
    chart.data.datasets[7].data = temperNaVykhodePechiDozhiga;
    chart.data.datasets[8].data = temperKameraVygruzki;
    chart.data.datasets[9].data = temperDymovykhGazovKotl;
    chart.data.datasets[10].data = temperGazovDoSkrubber;
    chart.data.datasets[11].data = temperGazovPosleSkrubber;
    chart.data.datasets[12].data = temperVodyVanneSkrubber;
    chart.data.datasets[13].data = temperGranulPosleKholod;

    // Update the max value of the x-axis to include a right margin
    const newMaxDate = new Date(labels[labels.length - 1]);
    newMaxDate.setMinutes(newMaxDate.getMinutes() + 10); // Add 10 minutes for right margin
    chart.options.scales.x.max = newMaxDate.getTime();
    chart.update();
  }
}

// Флаг для отслеживания взаимодействия пользователя
let isUserInteracting = false;
let inactivityTimeout;

// Временные границы графика
let initialMinDate = new Date(new Date().getTime() - 24 * 60 * 60 * 1000); // Начальная граница
let initialMaxDate = new Date(); // Конечная граница
let currentMinDate = new Date(initialMinDate);
let currentMaxDate = new Date(initialMaxDate);

// Сохранение временных границ для восстановления
let savedMinDate = currentMinDate;
let savedMaxDate = currentMaxDate;

// Функция для обновления графика с новыми временными границами
function updateChartTimeRange() {
  chart.options.scales.x.min = currentMinDate.getTime();
  chart.options.scales.x.max = currentMaxDate.getTime();
  chart.update();
}

// Функция для сброса флага неактивности
function resetInactivityTimeout() {
  clearTimeout(inactivityTimeout);
  inactivityTimeout = setTimeout(() => {
    isUserInteracting = false; // Сброс флага через 2 минуты
    // Восстанавливаем временные границы
    currentMinDate = savedMinDate;
    currentMaxDate = savedMaxDate;
    updateChartTimeRange(); // Обновляем график
  }, 2 * 60 * 1000); // 2 минуты
}

// Обработчик для кнопки "На час назад"
document.getElementById('prevBtn').addEventListener('click', () => {
  isUserInteracting = true; // Устанавливаем флаг
  resetInactivityTimeout(); // Сбрасываем таймер
  savedMinDate = currentMinDate; // Сохраняем текущее состояние
  savedMaxDate = currentMaxDate;

  currentMinDate.setHours(currentMinDate.getHours() - 1);
  currentMaxDate.setHours(currentMaxDate.getHours() - 1);
  updateChartTimeRange();
});

// Обработчик для кнопки "На час вперед"
document.getElementById('nextBtn').addEventListener('click', () => {
  isUserInteracting = true; // Устанавливаем флаг
  resetInactivityTimeout(); // Сбрасываем таймер
  savedMinDate = currentMinDate; // Сохраняем текущее состояние
  savedMaxDate = currentMaxDate;

  currentMinDate.setHours(currentMinDate.getHours() + 1);
  currentMaxDate.setHours(currentMaxDate.getHours() + 1);
  updateChartTimeRange();
});

// Обработчик для кнопки "Сброс"
document.getElementById('resetBtn').addEventListener('click', () => {
  location.reload(); // Обновляем текущую страницу
});

// Функция для обновления графика с новыми данными
async function refreshChart() {
  const newData = await fetchData();
  if (newData) {
    if (!isUserInteracting) {
      // Проверяем флаг
      createChart(); // Обновляем график только если пользователь не взаимодействует
    }
  }
}

// Инициализация графика
createChart();
setInterval(refreshChart, 30000);
