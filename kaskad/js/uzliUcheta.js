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

//energyReports
const uzliUchetaOVLDay = document.querySelector('.uzliUcheta-OV-l-day-js');
const uzliUchetaOVLDayPath = 'http://TechSite3/kaskad/reports/OV/Day/D_YOV_';

if (uzliUchetaOVLDay) {
  uzliUchetaOVLDay.addEventListener('click', (e) => {
    e.preventDefault();
    reportDayFunc(uzliUchetaOVLDayPath);
  });
}

//rashod para
const UPrashodPar = document.querySelector('.par-nasyshenny-rashod-js');
const UPrashodParPath = 'http://Techsite5/kaskad/graphics/UPpar/rashodPar/';
const UPrashodParPathName = '_UP_rashodPar.jpg';

if (UPrashodPar) {
  UPrashodPar.addEventListener('click', (e) => {
    e.preventDefault();
    graphicFunc(UPrashodParPath, UPrashodParPathName);
  });
}

//rashod vozduha
const UPrashodVozduh = document.querySelector('.vozduh-rashod-js');
const UPrashodVozduhPath = 'http://Techsite5/kaskad/graphics/UPvozduh/rashodVozduh/';
const UPrashodVozduhPathName = '_UP_rashodVozduh.jpg';

if (UPrashodVozduh) {
  UPrashodVozduh.addEventListener('click', (e) => {
    e.preventDefault();
    graphicFunc(UPrashodVozduhPath, UPrashodVozduhPathName);
  });
}

//rashod pitRechVoda
const rashodPitRechVoda = document.querySelector('.pitivay-rechnai-stoki-rashod-js');
const rashodPitRechVodaPath = 'http://Techsite5/kaskad/graphics/rashodPitRechVoda/';
const rashodPitRechVodaPathName = '_rashodPitRechVoda.jpg';

if (rashodPitRechVoda) {
  rashodPitRechVoda.addEventListener('click', (e) => {
    e.preventDefault();
    graphicFunc(rashodPitRechVodaPath, rashodPitRechVodaPathName);
  });
}

//rashod prirod gaz
const rashodPrirodGaz = document.querySelector('.prirod-rashod-js');
const rashodPrirodGazPath = 'http://Techsite5/kaskad/graphics/rashodPrirodGaz/';
const rashodPrirodGazPathName = '_rashod_prirod_gaz.jpg';

if (rashodPrirodGaz) {
  rashodPrirodGaz.addEventListener('click', (e) => {
    e.preventDefault();
    graphicFunc(rashodPrirodGazPath, rashodPrirodGazPathName);
  });
}

//davl pitRechVoda
const davlPitRechVoda = document.querySelector('.pitivay-rechnai-stoki-davl-js');
const davlPitRechVodaPath = 'http://Techsite5/kaskad/graphics/davlPitRechVoda/';
const davlPitRechVodaPathName = '_davlPitRechVoda.jpg';

if (davlPitRechVoda) {
  davlPitRechVoda.addEventListener('click', (e) => {
    e.preventDefault();
    graphicFunc(davlPitRechVodaPath, davlPitRechVodaPathName);
  });
}

//pH pitRechVoda
const phPitRechVoda = document.querySelector('.pitivay-rechnai-stoki-ph-js');
const phPitRechVodaPath = 'http://Techsite5/kaskad/graphics/pHMetr/';
const phPitRechVodaPathName = '_pH_metr.jpg';

if (phPitRechVoda) {
  phPitRechVoda.addEventListener('click', (e) => {
    e.preventDefault();
    graphicFunc(phPitRechVodaPath, phPitRechVodaPathName);
  });
}

//uzli ucheta reports
const uzliUchetaLDay = document.querySelector('.energy-reports-l-day-js');
const uzliUchetaLDayPath = 'http://TechSite5/kaskad/Reports/sorbent/Day/uzli_ucheta/uzli_ucheta_';

if (uzliUchetaLDay) {
  uzliUchetaLDay.addEventListener('click', (e) => {
    e.preventDefault();
    reportDayFunc(uzliUchetaLDayPath);
  });
}

const uzliUchetaMonth = document.querySelector('.energy-reports-m-js');
const uzliUchetaMonthPath = 'http://TechSite5/kaskad/Reports/sorbent/Month/uzli_ucheta/uzli_ucheta__';

if (uzliUchetaMonth) {
  uzliUchetaMonth.addEventListener('click', (e) => {
    e.preventDefault();
    reportMonthFunc(uzliUchetaMonthPath);
  });
}

//rashod prirod gaz reports
const prirodGazLDay = document.querySelector('.prirod-gaz-rashod-l-day-js');
const prirodGazLDayPath = 'http://TechSite5/kaskad/Reports/sorbent/Day/prirodGaz/prirodGaz_';

if (prirodGazLDay) {
  prirodGazLDay.addEventListener('click', (e) => {
    e.preventDefault();
    reportDayFunc(prirodGazLDayPath);
  });
}

const prirodGazMonth = document.querySelector('.prirod-gaz-rashod-m-js');
const prirodGazMonthPath = 'http://TechSite5/kaskad/Reports/sorbent/Month/prirodGaz/prirodGaz_';

if (prirodGazMonth) {
  prirodGazMonth.addEventListener('click', (e) => {
    e.preventDefault();
    reportMonthFunc(prirodGazMonthPath);
  });
}

//rashod piyVoda
// const rashodPitVoda = document.querySelector('.voda-pitivay-rashod-js');
// const rashodPitVodaPath = 'http://Techsite5/kaskad/graphics/rashodPitVoda/';
// const rashodPitVodaPathName = '_rashodPitVoda.jpg';

// if (rashodPitVoda) {
//   rashodPitVoda.addEventListener('click', (e) => {
//     e.preventDefault();
//     graphicFunc(rashodPitVodaPath, rashodPitVodaPathName);
//   });
// }

// electricalReports
const electricalReportsCurrentM = document.querySelector('.electrical-reports-current-m-js');
const electricalReportsChoseM = document.querySelector('.electrical-reports-chose-m-js');

const electricReports_currentM = () => {
  const SelYear = tbSelYear.value;
  const FileName = 'http://TechSite3/kaskad/Reports/Electric/' + '2024' + '/askue_tomonth.htm';
  parent.FrD.location = FileName;
};

const electricReports_choseM = () => {
  const SelDate = tbSelDate.value;
  const SelMonth = tbSelMonth.value;
  const SelYear = tbSelYear.value;
  const FileName = 'http://TechSite3/kaskad/Reports/Electric/' + SelYear + '/askue_month_' + SelMonth + '.htm';
  parent.FrD.location = FileName;
};

if (electricalReportsCurrentM) {
  electricalReportsCurrentM.addEventListener('click', electricReports_currentM);
}

if (electricalReportsChoseM) {
  electricalReportsChoseM.addEventListener('click', electricReports_choseM);
}
