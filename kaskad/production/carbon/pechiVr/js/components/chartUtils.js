export const colors = [
  'rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(75, 192, 192, 1)',
  'rgba(255, 205, 86, 1)', 'rgba(201, 203, 207, 1)', 'rgba(255, 159, 64, 1)',
  'rgba(153, 102, 255, 1)', 'rgba(255, 99, 71, 1)', 'rgba(0, 255, 0, 1)',
  'rgba(0, 255, 255, 1)', 'rgba(255, 20, 147, 1)', 'rgba(139, 69, 19, 1)',
  'rgba(128, 0, 128, 1)', 'rgba(0, 0, 255, 1)',
];

export function createVerticalLinePlugin() {
  return {
    id: 'verticalLine',
    afterDatasetsDraw(chart) {
      const { tooltip } = chart;
      if (tooltip._active?.length) {
        const { x } = tooltip._active[0].element;
        const { top, bottom } = chart.scales.y;

        chart.ctx.save();
        chart.ctx.beginPath();
        chart.ctx.moveTo(x, top);
        chart.ctx.lineTo(x, bottom);
        chart.ctx.lineWidth = 1;
        chart.ctx.strokeStyle = 'rgba(0, 0, 0, 0.5)';
        chart.ctx.stroke();
        chart.ctx.restore();
      }
    },
  };
}


