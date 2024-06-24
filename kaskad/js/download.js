const iframeMenu = document.getElementById('frame_menu');
const iframeData = document.getElementById('frame_data');
const spiner = document.querySelector('.overlay');

// Дождитесь полной загрузки iframe
iframeMenu.onload = function () {
  // Получите доступ к документу внутри iframe
  let iframeDocument = iframeMenu.contentDocument || iframeMenu.contentWindow.document;
  // Найдите элемент по id внутри iframe
  let elementInsideIframe = iframeDocument.querySelectorAll('.page-sidebar__link');

  for (let i = 0; i < elementInsideIframe.length; i++) {
    const element = elementInsideIframe[i];
    element.addEventListener('click', (e) => {
      spiner.classList.add('active');
    });
  }
};

iframeData.onload = function () {
  spiner.classList.remove('active');
};
