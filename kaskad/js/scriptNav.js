const tabsBtn = document.getElementsByClassName('tabs-link');
const tabsItems = document.querySelectorAll('.tabs-intro');

if (tabsBtn) {
  for (let i = 0; i < tabsBtn.length; i++) {
    let item = tabsBtn[i];
    item.addEventListener('click', function () {
      let currentBtn = item;
      let tabId = currentBtn.getAttribute('data-tab');
      let currentTab = document.querySelector(tabId);

      if (!currentBtn.classList.contains('active')) {
        for (let i = 0; i < tabsBtn.length; i++) {
          let item = tabsBtn[i];
          item.classList.remove('active');
        }
        for (let i = 0; i < tabsItems.length; i++) {
          let item = tabsItems[i];
          item.classList.remove('active');
        }
        currentBtn.classList.add('active');
        currentTab.classList.add('active');
      }
    });
  }
}
