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

const graphicFunc = (path, name) => {
  const SelDate = tbSelDate.value;
  //if (SelDate<=9) SelDate = "0" + SelDate;
  const SelMonth = tbSelMonth.value;
  //if (SelMonth <=9) SelMonth =  "0" + SelMonth;
  const SelYear = tbSelYear.value;
  const FileName = path + SelDate + '_' + SelMonth + '_' + SelYear + name;
  parent.FrD.location = FileName;
};

const reportDayFunc = (path) => {
  const SelDate = tbSelDate.value;
  const SelMonth = tbSelMonth.value;
  const SelYear = tbSelYear.value;
  const FileName = path + SelDate + '_' + SelMonth + '_' + SelYear + '.htm';
  parent.FrD.location = FileName;
};

const reportMonthFunc = (path) => {
  const SelMonth = tbSelMonth.value;
  const SelYear = tbSelYear.value;
  const FileName = path + SelMonth + '_' + SelYear + '.htm';
  parent.FrD.location = FileName;
};

//uroven v barabane kotla and davl par
// const techsite6Graph = 'Techsite6/kaskad/graphics/kotelnaya';
// const WaterLevelKotel1 = document.querySelector('.kotel1-uroven-js');
// const WaterLevelKotel2 = document.querySelector('.kotel2-uroven-js');
// const WaterLevelKotel3 = document.querySelector('.kotel3-uroven-js');
// const davlParKotel1 = document.querySelector('.kotel1-davl-par-js');
// const davlParKotel2 = document.querySelector('.kotel2-davl-par-js');
// const davlParKotel3 = document.querySelector('.kotel3-davl-par-js');

// const graphicWaterLevelKotel1 = (e) => {
//   e.preventDefault();

//   const SelDate = tbSelDate.value;
//   //if (SelDate<=9) SelDate = "0" + SelDate;
//   const SelMonth = tbSelMonth.value;
//   //if (SelMonth <=9) SelMonth =  "0" + SelMonth;
//   const SelYear = tbSelYear.value;
//   const FileName = `http://${techsite6Graph}/Kotel1/${SelDate}_${SelMonth}_${SelYear}_WaterLevelKotel1.jpg`;
//   parent.FrD.location = FileName;
// };

// if (WaterLevelKotel1) {
//   WaterLevelKotel1.addEventListener('click', graphicWaterLevelKotel1);
// }

// const graphicWaterLevelKotel2 = (e) => {
//   e.preventDefault();

//   const SelDate = tbSelDate.value;
//   //if (SelDate<=9) SelDate = "0" + SelDate;
//   const SelMonth = tbSelMonth.value;
//   //if (SelMonth <=9) SelMonth =  "0" + SelMonth;
//   const SelYear = tbSelYear.value;
//   const FileName = `http://${techsite6Graph}/Kotel2/${SelDate}_${SelMonth}_${SelYear}_WaterLevelKotel2.jpg`;
//   parent.FrD.location = FileName;
// };

// if (WaterLevelKotel2) {
//   WaterLevelKotel2.addEventListener('click', graphicWaterLevelKotel2);
// }

// const graphicWaterLevelKotel3 = (e) => {
//   e.preventDefault();

//   const SelDate = tbSelDate.value;
//   //if (SelDate<=9) SelDate = "0" + SelDate;
//   const SelMonth = tbSelMonth.value;
//   //if (SelMonth <=9) SelMonth =  "0" + SelMonth;
//   const SelYear = tbSelYear.value;
//   const FileName = `http://${techsite6Graph}/Kotel3/${SelDate}_${SelMonth}_${SelYear}_WaterLevelKotel3.jpg`;
//   parent.FrD.location = FileName;
// };

// if (WaterLevelKotel3) {
//   WaterLevelKotel3.addEventListener('click', graphicWaterLevelKotel3);
// }

// const graphicDavlParKotel1 = (e) => {
//   e.preventDefault();

//   const SelDate = tbSelDate.value;
//   //if (SelDate<=9) SelDate = "0" + SelDate;
//   const SelMonth = tbSelMonth.value;
//   //if (SelMonth <=9) SelMonth =  "0" + SelMonth;
//   const SelYear = tbSelYear.value;
//   const FileName = `http://${techsite6Graph}/Kotel1/${SelDate}_${SelMonth}_${SelYear}_davlParKotel1.jpg`;
//   parent.FrD.location = FileName;
// };

// if (davlParKotel1) {
//   davlParKotel1.addEventListener('click', graphicDavlParKotel1);
// }

// const graphicDavlParKotel2 = (e) => {
//   e.preventDefault();

//   const SelDate = tbSelDate.value;
//   //if (SelDate<=9) SelDate = "0" + SelDate;
//   const SelMonth = tbSelMonth.value;
//   //if (SelMonth <=9) SelMonth =  "0" + SelMonth;
//   const SelYear = tbSelYear.value;
//   const FileName = `http://${techsite6Graph}/Kotel2/${SelDate}_${SelMonth}_${SelYear}_davlParKotel2.jpg`;
//   parent.FrD.location = FileName;
// };

// if (davlParKotel2) {
//   davlParKotel2.addEventListener('click', graphicDavlParKotel2);
// }

// const graphicDavlParKotel3 = (e) => {
//   e.preventDefault();

//   const SelDate = tbSelDate.value;
//   //if (SelDate<=9) SelDate = "0" + SelDate;
//   const SelMonth = tbSelMonth.value;
//   //if (SelMonth <=9) SelMonth =  "0" + SelMonth;
//   const SelYear = tbSelYear.value;
//   const FileName = `http://${techsite6Graph}/Kotel3/${SelDate}_${SelMonth}_${SelYear}_davlParKotel3.jpg`;
//   parent.FrD.location = FileName;
// };

// if (davlParKotel3) {
//   davlParKotel3.addEventListener('click', graphicDavlParKotel3);
// }

//par-kotelnaya
const parKotelnaya = document.querySelector('.par-kotelnaya-js');
const parKotelnayaPath = 'http://Techsite5/kaskad/graphics/Kotelnaya/';
const parKotelnayaPathName = '_Par_kotel.jpg';

if (parKotelnaya) {
  parKotelnaya.addEventListener('click', (e) => {
    e.preventDefault();
    graphicFunc(parKotelnayaPath, parKotelnayaPathName);
  });
}

//par-kotelnaya-davl
const parKotelnayaDavl = document.querySelector('.par-kotelnaya-davl-js');
const parKotelnayaDavlPath = 'http://Techsite5/kaskad/graphics/KotelnayaDavlPar/';
const parKotelnayaDavlPathName = '_kotelnaya_davl_par.jpg';

if (parKotelnayaDavl) {
  parKotelnayaDavl.addEventListener('click', (e) => {
    e.preventDefault();
    graphicFunc(parKotelnayaDavlPath, parKotelnayaDavlPathName);
  });
}

//otopit voda podmeshka
const otopitVodaPodmeshka = document.querySelector('.otopit-voda-podmeshka-js');
const otopitVodaPodmeshkaPath = 'http://Techsite5/kaskad/graphics/podmeshka/rashodOtopitVoda/';
const otopitVodaPodmeshkaPathName = '_podmeshka_rashod_otop_voda.jpg';

if (otopitVodaPodmeshka) {
  otopitVodaPodmeshka.addEventListener('click', (e) => {
    e.preventDefault();
    graphicFunc(otopitVodaPodmeshkaPath, otopitVodaPodmeshkaPathName);
  });
}

//otopit voda teploobmennik
const otopitVodaTeploobmennik = document.querySelector('.otopit-voda-teploobmennikk265-js');
const otopitVodaTeploobmennikPath = 'http://Techsite5/kaskad/graphics/teploobmennikRashodOtopVoda/';
const otopitVodaTeploobmennikPathName = '_teploobmennikRashodOtopVoda.jpg';

if (otopitVodaTeploobmennik) {
  otopitVodaTeploobmennik.addEventListener('click', (e) => {
    e.preventDefault();
    graphicFunc(otopitVodaTeploobmennikPath, otopitVodaTeploobmennikPathName);
  });
}

//energyReports
const uzliUchetaUtvhLDay = document.querySelector('.energy-reports-utvh-l-day-js');
const uzliUchetaUtvhLDayPath = 'http://TechSite5/kaskad/reports/sorbent/Day/uzli_ucheta_utvh/uzli_ucheta_utvh_';

if (uzliUchetaUtvhLDay) {
  uzliUchetaUtvhLDay.addEventListener('click', (e) => {
    e.preventDefault();
    reportDayFunc(uzliUchetaUtvhLDayPath);
  });
}

const uzliUchetaUtvhMonth = document.querySelector('.energy-reports-utvh-m-js');
const uzliUchetaUtvhMonthPath = 'http://TechSite5/kaskad/Reports/sorbent/Month/uzli_ucheta_utvh/uzli_ucheta_utvh__';

if (uzliUchetaUtvhMonth) {
  uzliUchetaUtvhMonth.addEventListener('click', (e) => {
    e.preventDefault();
    reportMonthFunc(uzliUchetaUtvhMonthPath);
  });
}
