const modalBtns = document.querySelectorAll('.link-modal-btn-js');
const modalOverlay = document.querySelector('.page-content__video-modals ');
const modals = document.querySelectorAll('.page-content__video-modal');
const modalBtnClose = document.querySelectorAll('.modal-video-close');

const stopVideo = (video) => {
  video.pause();
  video.currentTime = 0;
};

for (let i = 0; i < modalBtns.length; i++) {
  const element = modalBtns[i];
  element.addEventListener('click', (e) => {
    let path = e.currentTarget.getAttribute('data-path');

    for (let i = 0; i < modals.length; i++) {
      const element = modals[i];
      element.classList.remove('page-content__video-modal--visible');
    }
    document.querySelector(`[data-target="${path}"]`).classList.add('page-content__video-modal--visible');
    modalOverlay.classList.add('page-content__video-modals--visible');
  });
}

for (let i = 0; i < modalBtnClose.length; i++) {
  const element = modalBtnClose[i];
  element.addEventListener('click', (e) => {
    e.preventDefault();
    const video = element.previousElementSibling;
    stopVideo(video);
    modalOverlay.classList.remove('page-content__video-modals--visible');
    for (let i = 0; i < modals.length; i++) {
      const element = modals[i];
      element.classList.remove('page-content__video-modal--visible');
    }
  });
}
