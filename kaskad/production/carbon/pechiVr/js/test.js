import { fetchData } from './components/fetchData.js';
import { colors, createVerticalLinePlugin } from './components/chartUtils.js';
import { temperData } from './components/data.js';

function updateChart(chart) {
  fetchData().then(() => {
    chart.data.datasets.forEach((dataset, index) => {
      dataset.data = temperData[Object.keys(temperData)[index]];
    });
    chart.update();
  });
}

async function renderChart() {
  await fetchData();

  const ctx = document.getElementById('temperatureChart').getContext('2d');

  const chart = new Chart(ctx, {
    type: 'line',
    data: {
      datasets: Object.keys(temperData).map((key, index) => ({
        label: key,
        data: temperData[key],
        borderColor: colors[index % colors.length],
        backgroundColor: colors[index % colors.length],
        borderWidth: 2, // Толщина линии
        pointRadius: 0, // Убирает точки на графике
      })),
    },
    options: {
      animation: {
        duration: 0, // Отключает анимацию
      },
      plugins: {
        tooltip: {
          mode: 'index',
          intersect: false,
          titleFont: {
            size: 16,
            family: 'Arial',
            weight: 'bold',
          },
          bodyFont: {
            size: 14,
          },
          callbacks: {
            title: function (tooltipItems) {
              // Используем first item для получения метки
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
            unit: 'hour', // Интервал для отображения меток
            tooltipFormat: 'HH:mm',
            displayFormats: {
              hour: 'HH:mm',
            },
          },
          ticks: {
            source: 'auto', // Автоматическое определение меток времени
          },
          title: {
            display: true,
            text: 'Время',
          },
          // Добавляем отступ справа
          afterDataLimits: (scale) => {
            const rightPadding = 30 * 60 * 1000; // 30 минут в миллисекундах
            const max = scale.max;
            scale.max = max + rightPadding;
          },
        },
        y: {
          title: {
            display: true,
            text: 'Значение',
          },
        },
      },
    },
    plugins: [createVerticalLinePlugin()],
  });

  // Обновление графика каждую минуту
  setInterval(() => updateChart(chart), 60000); // 60000 мс = 1 минута
}

renderChart();

