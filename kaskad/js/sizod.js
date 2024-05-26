//календарь
const dCurDate = new Date();
const tbSelMonth = document.querySelector('.tbSelMonth');
const tbSelYear = document.querySelector('.tbSelYear');
const tbSelDate = document.querySelector('.tbSelDate');

tbSelMonth.options[dCurDate.getMonth()].selected = true;

for (i = 0; i < tbSelYear.length; i++) {
  if (tbSelYear.options[i].value == dCurDate.getFullYear()) {
    tbSelYear.options[i].selected = true;
  }
}

for (i = 0; i < tbSelDate.length; i++) {
  if (tbSelDate.options[i].value == dCurDate.getDate()) {
    tbSelDate.options[i].selected = true;
  }
}

let toDate = tbSelDate.value;
if (toDate <= 9) {
  toDate = '0' + toDate;
}

let toMonth = tbSelMonth.value;
if (toMonth <= 9) {
  toMonth = '0' + toMonth;
}

let toYear = tbSelYear.value;

let SelectDate = () => {
  const SelDate = tbSelDate.value;
  if (SelDate <= 9) {
    SelDate = '0' + SelDate;
  }
  const SelMonth = tbSelMonth.value;
  if (SelMonth <= 9) {
    SelMonth = '0' + SelMonth;
  }
};

tbSelMonth.addEventListener('change', SelectDate);
tbSelYear.addEventListener('change', SelectDate);
tbSelDate.addEventListener('change', SelectDate);

//sizod
const techsite3Graph = 'Techsite3/kaskad/graphics/sizod';
const techsite3ReportsDay = 'TechSite3/kaskad/reports/sorbent/Day';
const techsite3ReportsMonth = 'TechSite3/kaskad/Reports/sorbent/Month';

const otopVodaK301 = document.querySelector('.otopit-voda-k301-js');

const graphicOtopVodaK301 = (e) => {
  e.preventDefault();

  const SelDate = tbSelDate.value;
  //if (SelDate<=9) SelDate = "0" + SelDate;
  const SelMonth = tbSelMonth.value;
  //if (SelMonth <=9) SelMonth =  "0" + SelMonth;
  const SelYear = tbSelYear.value;
  const FileName = `http://${techsite3Graph}/k301RashodOtopVoda/${SelDate}_${SelMonth}_${SelYear}_k301RashodOtopVoda.jpg`;
  parent.FrD.location = FileName;
};

if (otopVodaK301) {
  otopVodaK301.addEventListener('click', graphicOtopVodaK301);
}

const otopVodaK302 = document.querySelector('.otopit-voda-k302-js');

const graphicOtopVodaK302 = (e) => {
  e.preventDefault();

  const SelDate = tbSelDate.value;
  //if (SelDate<=9) SelDate = "0" + SelDate;
  const SelMonth = tbSelMonth.value;
  //if (SelMonth <=9) SelMonth =  "0" + SelMonth;
  const SelYear = tbSelYear.value;
  const FileName = `http://${techsite3Graph}/k302RashodOtopVoda/${SelDate}_${SelMonth}_${SelYear}_k302RashodOtopVoda.jpg`;
  parent.FrD.location = FileName;
};

if (otopVodaK302) {
  otopVodaK302.addEventListener('click', graphicOtopVodaK302);
}

//energyReports
const uzliUchetaOtoplenieSizodLDay = document.querySelector('.energy-reports-otoplenie-l-day-js');

const uzliUchetaOtoplenieSizod_LDay = () => {
  const SelDate = tbSelDate.value;
  const SelMonth = tbSelMonth.value;
  const SelYear = tbSelYear.value;
  const FileName = `http://${techsite3ReportsDay}/uzli_ucheta_sizod/uzli_ucheta_sizod_${SelDate}_${SelMonth}_${SelYear}.htm`;
  parent.FrD.location = FileName;
};

if (uzliUchetaOtoplenieSizodLDay) {
  uzliUchetaOtoplenieSizodLDay.addEventListener('click', uzliUchetaOtoplenieSizod_LDay);
}

const uzliUchetaOtoplenieSizodMonth = document.querySelector('.energy-reports-otoplenie-m-js');

const uzliUchetaOtoplenieSizod_Month = () => {
  const SelMonth = tbSelMonth.value;
  const SelYear = tbSelYear.value;
  const FileName = `http://${techsite3ReportsMonth}/uzli_ucheta_sizod/uzli_ucheta_sizod__${SelMonth}_${SelYear}.htm`;
  parent.FrD.location = FileName;
};

if (uzliUchetaOtoplenieSizodMonth) {
  uzliUchetaOtoplenieSizodMonth.addEventListener('click', uzliUchetaOtoplenieSizod_Month);
}
