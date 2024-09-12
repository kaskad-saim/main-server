export function showLoadingBar() {
  const loadingWrapper = document.getElementById('loadingWrapper');
  if (loadingWrapper) {
    loadingWrapper.style.display = 'flex';
  } else {
    console.error('Loading wrapper element not found.');
  }
}

export function hideLoadingBar() {
  const loadingWrapper = document.getElementById('loadingWrapper');
  if (loadingWrapper) {
    loadingWrapper.style.display = 'none';
  } else {
    console.error('Loading wrapper element not found.');
  }
}