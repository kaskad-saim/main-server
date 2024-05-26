const tooltipBtnOpen = document.querySelector('.tooltip-btn-open-js');
const tooltipBtnClose = document.querySelector('.tooltip-btn-close-js');
const tooltipText = document.querySelector('.tooltip-js');

tooltipBtnOpen.addEventListener('click', () => {
  tooltipText.classList.add('active');
});

tooltipBtnClose.addEventListener('click', () => {
  tooltipText.classList.remove('active');
});