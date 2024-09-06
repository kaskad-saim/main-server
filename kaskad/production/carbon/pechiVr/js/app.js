// Fetch data from the server
async function fetchData() {
  try {
    const response = await fetch('http://localhost:3000/api/parameters');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    return null;
  }
}

// Create the chart
async function createChart() {
  const data = await fetchData();

  if (!data) return;

  // Filter and prepare data for the chart
  const temper1Skolz = [];
  const temper2Skolz = [];
  const temper3Skolz = [];
  const temperVTopke = [];
  const temperVVerhuKameri = [];
  const temperVNizuKameri = [];

  const labels = [];

  data.vr1.forEach((item) => {
    if (item.name === 'Температура 1-СК') {
      temper1Skolz.push(item.value);
      labels.push(new Date(item.timestamp).toLocaleString());
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
    }
  });

  const ctx = document.getElementById('temperatureChart').getContext('2d');

  new Chart(ctx, {
    type: 'line',
    data: {
      labels: labels,
      datasets: [
        {
          label: 'Температура 1-СК',
          data: temper1Skolz,
          borderColor: 'rgba(255, 99, 132, 1)',
          fill: false,
        },
        {
          label: 'Температура 2-СК',
          data: temper2Skolz,
          borderColor: 'rgba(54, 162, 235, 1)',
          fill: false,
        },
        {
          label: 'Температура 3-СК',
          data: temper3Skolz,
          borderColor: 'rgba(75, 192, 192, 1)',
          fill: false,
        },
        {
          label: 'В топке',
          data: temperVTopke,
          borderColor: 'rgba(75, 138, 192, 1)',
          fill: false,
        },
        {
          label: 'Вверху камеры загрузки',
          data: temperVVerhuKameri,
          borderColor: 'rgba(153, 102, 255, 1)',
          fill: false,
        },
        {
          label: 'Внизу камеры загрузки',
          data: temperVNizuKameri,
          borderColor: 'rgba(255, 159, 64, 1)',
          fill: false,
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        zoom: {
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
            unit: 'minute',
          },
        },
      },
    },
  });
}

// Initialize the chart
createChart();
