const updateTime = () => {
  let spanTime = document.querySelector('.content__time');
  let date = new Date();

  let hours = ('0' + date.getHours()).slice(-2);
  let minutes = ('0' + date.getMinutes()).slice(-2);
  let seconds = ('0' + date.getSeconds()).slice(-2);
  spanTime.innerHTML = hours + ':' + minutes + ':' + seconds;
};

const currentDate = () => {
  let spanDate = document.querySelector('.content__date');
  let date = new Date();

  let day = ('0' + date.getDate()).slice(-2);
  let month = ('0' + (date.getMonth() + 1)).slice(-2);
  let year = date.getFullYear();
  spanDate.innerHTML = day + '.' + month + '.' + year;
};

currentDate();
setInterval(updateTime, 1000);

const temperValue = document.querySelector('.content__temper-value');
const link = 'http://api.weatherstack.com/current?access_key=677233247a9bc4c4892cc1c4ae46993c';

let store = {
  city: 'Perm',
  temperature: 0,
  feelslike: 0,
};

const renderComponent = () => {
  temperValue.innerHTML = `${store.temperature}`;
};

// const fetchData = async () => {
//   let result = await fetch(`${link}&query=${store.city}`);
//   let data = await result.json();

//   let {
//     current: { feelslike, temperature },
//   } = data;

//   store = {
//     ...store,
//     feelslike,
//     temperature,
//   };

//   renderComponent();
// };

// fetchData();
