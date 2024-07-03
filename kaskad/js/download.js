const iframeMenu = document.getElementById('frame_menu');
const iframeData = document.getElementById('frame_data');
const spiner = document.querySelector('.overlay');

iframeMenu.onload = () => {
  // Получите доступ к документу внутри iframe
  let iframeDocument = iframeMenu.contentDocument || iframeMenu.contentWindow.document;
  let elementInsideIframe = iframeDocument.querySelectorAll('.page-sidebar__link');

  for (let i = 0; i < elementInsideIframe.length; i++) {
    const element = elementInsideIframe[i];
    element.addEventListener('click', (e) => {
      iframeData.style.backgroundColor = 'white';
      iframeData.style.visibility = 'hidden';
      spiner.classList.add('active');
    });
  }
};

iframeData.onload = () => {
  iframeData.style.backgroundColor = '';
  iframeData.style.visibility = 'visible';
  spiner.classList.remove('active');
};
