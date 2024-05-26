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

let  SelectDate = () => {
  const SelDate = tbSelDate.value;
  if (SelDate <= 9) {
    SelDate = '0' + SelDate;
  }
  const SelMonth = tbSelMonth.value;
  if (SelMonth <= 9) {
    SelMonth = '0' + SelMonth;
  }
}

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

//energy resources soloviev reports
const energySolovievLDay = document.querySelector('.energy-soloviev-l-day-js');
const energySolovievLDayPath =
  'http://TechSite5/kaskad/Reports/sorbent/Day/energy_resources_Soloviev/energy_resources_Soloviev_';

if (energySolovievLDay) {
  energySolovievLDay.addEventListener('click', (e) => {
    e.preventDefault();
    reportDayFunc(energySolovievLDayPath);
  });
}

const energySolovievMonth = document.querySelector('.energy-soloviev-m-js');
const energySolovievMonthPath =
  'http://TechSite5/kaskad/Reports/sorbent/Month/energy_resources_Soloviev/energy_resources_Soloviev__';

if (energySolovievMonth) {
  energySolovievMonth.addEventListener('click', (e) => {
    e.preventDefault();
    reportMonthFunc(energySolovievMonthPath);
  });
}

//T2, Tcalc
const podmeshkaT2T2cacl = document.querySelector('.podmeshka-t2-tcalc-js');
const podmeshkaT2T2caclPath = 'http://Techsite5/kaskad/graphics/podmeshka/temp_calc/';
const podmeshkaT2T2caclPathName = '_temp_calc.jpg';

if (podmeshkaT2T2cacl) {
  podmeshkaT2T2cacl.addEventListener('click', (e) => {
    e.preventDefault();
    graphicFunc(podmeshkaT2T2caclPath, podmeshkaT2T2caclPathName);
  });
}
