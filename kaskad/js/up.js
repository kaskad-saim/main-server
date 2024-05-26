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

//k.266 pechVr
const pechVr1T = document.querySelector('.pechvr-1-t-js');
const pechVr1TPath = 'http://Techsite3/kaskad/graphics/k266pechiVr/';
const pechVr1TPathName = '_1.jpg';

if (pechVr1T) {
  pechVr1T.addEventListener('click', (e) => {
    e.preventDefault();
    graphicFunc(pechVr1TPath, pechVr1TPathName);
  });
}

const pechVr2T = document.querySelector('.pechvr-2-t-js');
const pechVr2TPath = 'http://Techsite3/kaskad/graphics/k266pechiVr/';
const pechVr2TPathName = '_2.jpg';

if (pechVr2T) {
  pechVr2T.addEventListener('click', (e) => {
    e.preventDefault();
    graphicFunc(pechVr2TPath, pechVr2TPathName);
  });
}

const pechVr3T = document.querySelector('.pechvr-3-t-js');
const pechVr3TPath = 'http://Techsite3/kaskad/graphics/k266pechiVr/';
const pechVr3TPathName = '_3.jpg';

if (pechVr3T) {
  pechVr3T.addEventListener('click', (e) => {
    e.preventDefault();
    graphicFunc(pechVr3TPath, pechVr3TPathName);Тщ
  });
}

//smolohoz-nasosy
const smolNasosy = document.querySelector('.smol-nasosy-js');
const smolNasosyPath = 'http://Techsite3/kaskad/graphics/Smola_k13/';
const smolNasosyPathName = '_Nasos_3_4.jpg';

if (smolNasosy) {
  smolNasosy.addEventListener('click', (e) => {
    e.preventDefault();
    graphicFunc(smolNasosyPath, smolNasosyPathName);
  });
}

//korp 9a
const korp9aTTopka = document.querySelector('.korp9a-topka-t-js');
const korp9aTTopkaPath = 'http://Techsite3/kaskad/graphics/korp9a/PechKS/Temperatyra/';
const korp9aTTopkaPathName = '_TempPechKS_topka.jpg';

if (korp9aTTopka) {
  korp9aTTopka.addEventListener('click', (e) => {
    e.preventDefault();
    graphicFunc(korp9aTTopkaPath, korp9aTTopkaPathName);
  });
}

const korp9aTZona = document.querySelector('.korp9a-zona-t-js');
const korp9aTZonaPath = 'http://Techsite3/kaskad/graphics/korp9a/PechKS/Temperatyra/';
const korp9aTZonaPathName = '_TempPechKS_zona.jpg';

if (korp9aTZona) {
  korp9aTZona.addEventListener('click', (e) => {
    e.preventDefault();
    graphicFunc(korp9aTZonaPath, korp9aTZonaPathName);
  });
}

const korp9aRashodGaza = document.querySelector('.korp9a-gaz-rashod-js');
const korp9aRashodGazaPath = 'http://Techsite3/kaskad/graphics/korp9a/PechKS/Rashod/';
const korp9aRashodGazaPathName = '_PechKSrachod_gaz.jpg';

if (korp9aRashodGaza) {
  korp9aRashodGaza.addEventListener('click', (e) => {
    e.preventDefault();
    graphicFunc(korp9aRashodGazaPath, korp9aRashodGazaPathName);
  });
}

const korp9aRashodVozduh = document.querySelector('.korp9a-vozduh-rashod-js');
const korp9aRashodVozduhPath = 'http://Techsite3/kaskad/graphics/korp9a/PechKS/Rashod/';
const korp9aRashodVozduhPathName = '_PechKSrachod_vozduh.jpg';

if (korp9aRashodVozduh) {
  korp9aRashodVozduh.addEventListener('click', (e) => {
    e.preventDefault();
    graphicFunc(korp9aRashodVozduhPath, korp9aRashodVozduhPathName);
  });
}

//korp 10b activaz
const korp10bTmpa11 = document.querySelector('.korp10b-mpa11-t-js');
const korp10bTmpa11Path = 'http://Servactive/kaskad/graphics/';
const korp10bTmpa11PathName = '_T11.jpg';

if (korp10bTmpa11) {
  korp10bTmpa11.addEventListener('click', (e) => {
    e.preventDefault();
    graphicFunc(korp10bTmpa11Path, korp10bTmpa11PathName);
  });
}

const korp10bTmpa12 = document.querySelector('.korp10b-mpa12-t-js');
const korp10bTmpa12Path = 'http://Servactive/kaskad/graphics/';
const korp10bTmpa12PathName = '_T12.jpg';

if (korp10bTmpa12) {
  korp10bTmpa12.addEventListener('click', (e) => {
    e.preventDefault();
    graphicFunc(korp10bTmpa12Path, korp10bTmpa12PathName);
  });
}

const korp10bParMpa = document.querySelector('.korp10b-mpa-par-js');
const korp10bParMpaPath = 'http://Servactive/kaskad/graphics/';
const korp10bParMpaPathName = '_Q11.jpg';

if (korp10bParMpa) {
  korp10bParMpa.addEventListener('click', (e) => {
    e.preventDefault();
    graphicFunc(korp10bParMpaPath, korp10bParMpaPathName);
  });
}

//korp 10b karboniz
const korp10bTemperSushilka1 = document.querySelector('.korp10b-sushilka1-t-js');
const korp10bTemperSushilka1Path = 'http://servkarbon/kaskad/graphic/';
const korp10bTemperSushilka1PathName = '_sushilka_1_T.jpg';

if (korp10bTemperSushilka1) {
  korp10bTemperSushilka1.addEventListener('click', (e) => {
    e.preventDefault();
    graphicFunc(korp10bTemperSushilka1Path, korp10bTemperSushilka1PathName);
  });
}

const korp10bTemperSushilka3 = document.querySelector('.korp10b-sushilka3-t-js');
const korp10bTemperSushilka3Path = 'http://servkarbon/kaskad/graphic/';
const korp10bTemperSushilka3PathName = '_sushilka_3_T.jpg';

if (korp10bTemperSushilka3) {
  korp10bTemperSushilka3.addEventListener('click', (e) => {
    e.preventDefault();
    graphicFunc(korp10bTemperSushilka3Path, korp10bTemperSushilka3PathName);
  });
}

const korp10bTemperSushilka4 = document.querySelector('.korp10b-sushilka4-t-js');
const korp10bTemperSushilka4Path = 'http://servkarbon/kaskad/graphic/';
const korp10bTemperSushilka4PathName = '_sushilka_4_T.jpg';

if (korp10bTemperSushilka4) {
  korp10bTemperSushilka4.addEventListener('click', (e) => {
    e.preventDefault();
    graphicFunc(korp10bTemperSushilka4Path, korp10bTemperSushilka4PathName);
  });
}

const korp10bTemperPC5 = document.querySelector('.korp10b-pc5-t-js');
const korp10bTemperPC5Path = 'http://servkarbon/kaskad/graphic/';
const korp10bTemperPC5PathName = '_pech_carbon_5_T.jpg';

if (korp10bTemperPC5) {
  korp10bTemperPC5.addEventListener('click', (e) => {
    e.preventDefault();
    graphicFunc(korp10bTemperPC5Path, korp10bTemperPC5PathName);
  });
}

const korp10bTemperPC6 = document.querySelector('.korp10b-pc6-t-js');
const korp10bTemperPC6Path = 'http://servkarbon/kaskad/graphic/';
const korp10bTemperPC6PathName = '_pech_carbon_6_T.jpg';

if (korp10bTemperPC6) {
  korp10bTemperPC6.addEventListener('click', (e) => {
    e.preventDefault();
    graphicFunc(korp10bTemperPC6Path, korp10bTemperPC6PathName);
  });
}

const korp10bTemperPC7 = document.querySelector('.korp10b-pc7-t-js');
const korp10bTemperPC7Path = 'http://servkarbon/kaskad/graphic/';
const korp10bTemperPC7PathName = '_pech_carbon_7_T.jpg';

if (korp10bTemperPC7) {
  korp10bTemperPC7.addEventListener('click', (e) => {
    e.preventDefault();
    graphicFunc(korp10bTemperPC7Path, korp10bTemperPC7PathName);
  });
}

const korp10bRazrezhenPC = document.querySelector('.korp10b-pc-razreyzhen-js');
const korp10bRazrezhenPCPath = 'http://servkarbon/kaskad/graphic/';
const korp10bRazrezhenPCPathName = '_pechi_razreg.jpg';

if (korp10bRazrezhenPC) {
  korp10bRazrezhenPC.addEventListener('click', (e) => {
    e.preventDefault();
    graphicFunc(korp10bRazrezhenPCPath, korp10bRazrezhenPCPathName);
  });
}

const korp10bSmotaT = document.querySelector('.korp10b-smola-t-js');
const korp10bSmotaTPath = 'http://servkarbon/kaskad/graphic/';
const korp10bSmotaTPathName = '_smola_T.jpg';

if (korp10bSmotaT) {
  korp10bSmotaT.addEventListener('click', (e) => {
    e.preventDefault();
    graphicFunc(korp10bSmotaTPath, korp10bSmotaTPathName);
  });
}

const korp10bSmotaUroven = document.querySelector('.korp10b-smola-uroven-js');
const korp10bSmotaUrovenPath = 'http://servkarbon/kaskad/graphic/';
const korp10bSmotaUrovenPathName = '_smola_L.jpg';

if (korp10bSmotaUroven) {
  korp10bSmotaUroven.addEventListener('click', (e) => {
    e.preventDefault();
    graphicFunc(korp10bSmotaUrovenPath, korp10bSmotaUrovenPathName);
  });
}

//davl para
const UPdavlPar = document.querySelector('.up-par-davl-js');
const UPdavlParPath = 'http://Techsite5/kaskad/graphics/UPpar/davlPar/';
const UPdavlParPathName = '_UP_davlPar.jpg';

if (UPdavlPar) {
  UPdavlPar.addEventListener('click', (e) => {
    e.preventDefault();
    graphicFunc(UPdavlParPath, UPdavlParPathName);
  });
}
