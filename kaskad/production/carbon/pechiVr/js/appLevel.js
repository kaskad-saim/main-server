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

  // Filter and prepare data for the chart
  const urovenVbarabaneKotla = [];
  const imVbarabaneKotla = [];
  const labels = [];

  data.vr1.forEach((item) => {
    if (item.name === 'Уровень воды в котле-утилизаторе') {
      urovenVbarabaneKotla.push(item.value);
      labels.push(item.timestamp); // Store the timestamp as is
    } else if (item.name === 'Исполнительный механизм на котле-утилизаторе') {
      imVbarabaneKotla.push(item.value);
    }
  });

  const ctx = document.getElementById('levelChart').getContext('2d');
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
            label: 'Уровень в барабане котла-утилизатора',
            data: urovenVbarabaneKotla,
            borderColor: 'rgba(255, 99, 132, 1)',
            backgroundColor: 'rgba(255, 99, 132, 1)',
            fill: false,
            pointRadius: 0,
            borderWidth: 2,
          },
          {
            label: 'Исполнительный механизм на подачу воды',
            data: imVbarabaneKotla,
            borderColor: 'rgba(54, 162, 235, 1)',
            backgroundColor: 'rgba(54, 162, 235, 1)',
            fill: false,
            pointRadius: 0,
            borderWidth: 2,
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
                return `${datasetLabel}: ${value} мм`;
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
            max: 200,
            min: -200,
            ticks: {
              stepSize: 10,
            },
          },
          y2: {
            // Вторая ось Y
            beginAtZero: true,
            max: 200,
            min: -200,
            ticks: {
              stepSize: 10, // Шаг между метками
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
    chart.data.datasets[0].data = urovenVbarabaneKotla;
    chart.data.datasets[1].data = imVbarabaneKotla;

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
const offset = 10 * 60 * 1000; //

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
