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
  let SelDate = tbSelDate.value;
  if (SelDate <= 9) {
    SelDate = '0' + SelDate;
  }
  let SelMonth = tbSelMonth.value;
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

//sushilki
const sushilka1T = document.querySelector('.sushilka-1-t-js');
const sushilka1TPath = 'http://Techsite4/kaskad/graphics/sushilka1/';
const sushilka1TPathName = '_Susulka1_T.jpg';

if (sushilka1T) {
  sushilka1T.addEventListener('click', (e) => {
    e.preventDefault();
    graphicFunc(sushilka1TPath, sushilka1TPathName);
  });
}

const sushilka1P = document.querySelector('.sushilka-1-p-js');
const sushilka1PPath = 'http://Techsite4/kaskad/graphics/sushilka1/';
const sushilka1PPathName = '_Susulka1_P.jpg';

if (sushilka1P) {
  sushilka1P.addEventListener('click', (e) => {
    e.preventDefault();
    graphicFunc(sushilka1PPath, sushilka1PPathName);
  });
}

const sushilka2T = document.querySelector('.sushilka-2-t-js');
const sushilka2TPath = 'http://Techsite4/kaskad/graphics/sushilka2/';
const sushilka2TPathName = '_Susulka2_T.jpg';

if (sushilka2T) {
  sushilka2T.addEventListener('click', (e) => {
    e.preventDefault();
    graphicFunc(sushilka2TPath, sushilka2TPathName);
  });
}

const sushilka2P = document.querySelector('.sushilka-2-p-js');
const sushilka2PPath = 'http://Techsite4/kaskad/graphics/sushilka2/';
const sushilka2PPathName = '_Susulka2_P.jpg';

if (sushilka2P) {
  sushilka2P.addEventListener('click', (e) => {
    e.preventDefault();
    graphicFunc(sushilka2PPath, sushilka2PPathName);
  });
}

//pechiVr
const pechVr1T = document.querySelector('.pechvr-1-t-js');
const pechVr1TPath = 'http://Techsite4/kaskad/graphics/pechVR1/';
const pechVr1TPathName = '_PechVR1_T.jpg';

if (pechVr1T) {
  pechVr1T.addEventListener('click', (e) => {
    e.preventDefault();
    graphicFunc(pechVr1TPath, pechVr1TPathName);
  });
}

const pechVr1P = document.querySelector('.pechvr-1-p-js');
const pechVr1PPath = 'http://Techsite4/kaskad/graphics/pechVR1/';
const pechVr1PPathName = '_PechVR1_P.jpg';

if (pechVr1P) {
  pechVr1P.addEventListener('click', (e) => {
    e.preventDefault();
    graphicFunc(pechVr1PPath, pechVr1PPathName);
  });
}

const pechVr1Level = document.querySelector('.pechvr-1-level-js');
const pechVr1LevelPath = 'http://Techsite4/kaskad/graphics/uroven-v-barabane-kotla/';
const pechVr1LevelPathName = '_Uroven-v-barabane-kotla-VR1.jpg';

if (pechVr1Level) {
  pechVr1Level.addEventListener('click', (e) => {
    e.preventDefault();
    graphicFunc(pechVr1LevelPath, pechVr1LevelPathName);
  });
}

const pechVr1DavlParBaraban = document.querySelector('.pechvr-1-p-baraban-js');
const pechVr1DavlParBarabanPath = 'http://Techsite4/kaskad/graphics/pechVR-1-davlParBarabanKotla/';
const pechVr1DavlParBarabanPathName = '_pechVR-1-davlParBarabanKotla.jpg';

if (pechVr1DavlParBaraban) {
  pechVr1DavlParBaraban.addEventListener('click', (e) => {
    e.preventDefault();
    graphicFunc(pechVr1DavlParBarabanPath, pechVr1DavlParBarabanPathName);
  });
}

const pechVr2T = document.querySelector('.pechvr-2-t-js');
const pechVr2TPath = 'http://Techsite4/kaskad/graphics/pechVR2/';
const pechVr2TPathName = '_PechVR2_T.jpg';

if (pechVr2T) {
  pechVr2T.addEventListener('click', (e) => {
    e.preventDefault();
    graphicFunc(pechVr2TPath, pechVr2TPathName);
  });
}

const pechVr2P = document.querySelector('.pechvr-2-p-js');
const pechVr2PPath = 'http://Techsite4/kaskad/graphics/pechVR2/';
const pechVr2PPathName = '_PechVR2_P.jpg';

if (pechVr2P) {
  pechVr2P.addEventListener('click', (e) => {
    e.preventDefault();
    graphicFunc(pechVr2PPath, pechVr2PPathName);
  });
}

const pechVr2Level = document.querySelector('.pechvr-2-level-js');
const pechVr2LevelPath = 'http://Techsite4/kaskad/graphics/uroven-v-barabane-kotla/';
const pechVr2LevelPathName = '_Uroven-v-barabane-kotla-VR2.jpg';

if (pechVr2Level) {
  pechVr2Level.addEventListener('click', (e) => {
    e.preventDefault();
    graphicFunc(pechVr2LevelPath, pechVr2LevelPathName);
  });
}

const pechVr2DavlParBaraban = document.querySelector('.pechvr-2-p-baraban-js');
const pechVr2DavlParBarabanPath = 'http://Techsite4/kaskad/graphics/pechVR-2-davlParBarabanKotla/';
const pechVr2DavlParBarabanPathName = '_pechVR-2-davlParBarabanKotla.jpg';

if (pechVr2DavlParBaraban) {
  pechVr2DavlParBaraban.addEventListener('click', (e) => {
    e.preventDefault();
    graphicFunc(pechVr2DavlParBarabanPath, pechVr2DavlParBarabanPathName);
  });
}

//pechiMpa
const pechMpa2T = document.querySelector('.pechmpa-2-t-js');
const pechMpa2TPath = 'http://Techsite4/kaskad/graphics/pechMPA2/';
const pechMpa2TPathName = '_PechMPA2_T.jpg';

if (pechMpa2T) {
  pechMpa2T.addEventListener('click', (e) => {
    e.preventDefault();
    graphicFunc(pechMpa2TPath, pechMpa2TPathName);
  });
}

const pechMpa2P = document.querySelector('.pechmpa-2-p-js');
const pechMpa2PPath = 'http://Techsite4/kaskad/graphics/pechMPA2/';
const pechMpa2PPathName = '_PechMPA2_P.jpg';

if (pechMpa2P) {
  pechMpa2P.addEventListener('click', (e) => {
    e.preventDefault();
    graphicFunc(pechMpa2PPath, pechMpa2PPathName);
  });
}

const pechMpa3T = document.querySelector('.pechmpa-3-t-js');
const pechMpa3TPath = 'http://Techsite4/kaskad/graphics/pechMPA3/';
const pechMpa3TPathName = '_PechMPA3_T.jpg';

if (pechMpa3T) {
  pechMpa3T.addEventListener('click', (e) => {
    e.preventDefault();
    graphicFunc(pechMpa3TPath, pechMpa3TPathName);
  });
}

const pechMpa3P = document.querySelector('.pechmpa-3-p-js');
const pechMpa3PPath = 'http://Techsite4/kaskad/graphics/pechMPA3/';
const pechMpa3PPathName = '_PechMPA3_P.jpg';

if (pechMpa3P) {
  pechMpa3P.addEventListener('click', (e) => {
    e.preventDefault();
    graphicFunc(pechMpa3PPath, pechMpa3PPathName);
  });
}

const pechMpa4T = document.querySelector('.pechmpa-4-t-js');
const pechMpa4TPath = 'http://Techsite4/kaskad/graphics/pechMPA4/';
const pechMpa4TPathName = '_PechMPA4_T.jpg';

if (pechMpa4T) {
  pechMpa4T.addEventListener('click', (e) => {
    e.preventDefault();
    graphicFunc(pechMpa4TPath, pechMpa4TPathName);
  });
}

const pechMpa4P = document.querySelector('.pechmpa-4-p-js');
const pechMpa4PPath = 'http://Techsite4/kaskad/graphics/pechMPA4/';
const pechMpa4PPathName = '_PechMPA4_P.jpg';

if (pechMpa4P) {
  pechMpa4P.addEventListener('click', (e) => {
    e.preventDefault();
    graphicFunc(pechMpa4PPath, pechMpa4PPathName);
  });
}

//melnizi
const shbm3 = document.querySelector('.shbm-3-js');
const shbm3Path = 'http://Techsite4/kaskad/graphics/melnizi-graph/';
const shbm3PathName = '_SHBM_3.jpg';

if (shbm3) {
  shbm3.addEventListener('click', (e) => {
    e.preventDefault();
    graphicFunc(shbm3Path, shbm3PathName);
  });
}

const ygm9517 = document.querySelector('.ygm-9517-js');
const ygm9517Path = 'http://Techsite4/kaskad/graphics/melnizi-graph/';
const ygm9517PathName = '_YGM.jpg';

if (ygm9517) {
  ygm9517.addEventListener('click', (e) => {
    e.preventDefault();
    graphicFunc(ygm9517Path, ygm9517PathName);
  });
}

const ycvok130 = document.querySelector('.ycvok-130-js');
const ycvok130Path = 'http://Techsite4/kaskad/graphics/melnizi-graph/';
const ycvok130PathName = '_YCVOK.jpg';

if (ycvok130) {
  ycvok130.addEventListener('click', (e) => {
    e.preventDefault();
    graphicFunc(ycvok130Path, ycvok130PathName);
  });
}

const melniza1 = document.querySelector('.melniza1-js');
const melniza1Path = 'http://Techsite4/kaskad/graphics/melnizi-graph/';
const melniza1PathName = '_Melniza1.jpg';

if (melniza1) {
  melniza1.addEventListener('click', (e) => {
    e.preventDefault();
    graphicFunc(melniza1Path, melniza1PathName);
  });
}

const melniza2 = document.querySelector('.melniza2-js');
const melniza2Path = 'http://Techsite4/kaskad/graphics/melnizi-graph/';
const melniza2PathName = '_Melniza2.jpg';

if (melniza2) {
  melniza2.addEventListener('click', (e) => {
    e.preventDefault();
    graphicFunc(melniza2Path, melniza2PathName);
  });
}

//par
const pechMpaParRashod = document.querySelector('.carbon-par-rashod-js');
const pechMpaParRashodPath = 'http://Techsite4/kaskad/graphics/MPA_Par/';
const pechMpaParRashodPathName = '_MPA_Par.jpg';

if (pechMpaParRashod) {
  pechMpaParRashod.addEventListener('click', (e) => {
    e.preventDefault();
    graphicFunc(pechMpaParRashodPath, pechMpaParRashodPathName);
  });
}

const pechMpaPardavl = document.querySelector('.carbon-par-davl-js');
const pechMpaPardavlPath = 'http://Techsite4/kaskad/graphics/MPA_Par/';
const pechMpaPardavlPathName = '_CARBON_Par_P.jpg';

if (pechMpaPardavl) {
  pechMpaPardavl.addEventListener('click', (e) => {
    e.preventDefault();
    graphicFunc(pechMpaPardavlPath, pechMpaPardavlPathName);
  });
}

//k296
const k296T = document.querySelector('.k296-t-js');
const k296TPath = 'http://Techsite4/kaskad/graphics/reaktora/';
const k296TPathName = '_Temperatura_reaktora_Day.jpg';

if (k296T) {
  k296T.addEventListener('click', (e) => {
    e.preventDefault();
    graphicFunc(k296TPath, k296TPathName);
  });
}

const k296L = document.querySelector('.k296-l-js');
const k296LPath = 'http://Techsite4/kaskad/graphics/reaktora/';
const k296LPathName = '_Uroven_reaktora_Day.jpg';

if (k296L) {
  k296L.addEventListener('click', (e) => {
    e.preventDefault();
    graphicFunc(k296LPath, k296LPathName);
  });
}

//notis pechi
const notisPechVr1 = document.querySelector('.notis-pechvr-1-js');
const notisPechVr1Path = 'http://Techsite5/kaskad/graphics/notis/pechVR1/';
const notisPechVr1PathName = '_notis-pechVR1.jpg';

if (notisPechVr1) {
  notisPechVr1.addEventListener('click', (e) => {
    e.preventDefault();
    graphicFunc(notisPechVr1Path, notisPechVr1PathName);
  });
}

const notisPechVr2 = document.querySelector('.notis-pechvr-2-js');
const notisPechVr2Path = 'http://Techsite5/kaskad/graphics/notis/pechVR2/';
const notisPechVr2PathName = '_notis-pechVR2.jpg';

if (notisPechVr2) {
  notisPechVr2.addEventListener('click', (e) => {
    e.preventDefault();
    graphicFunc(notisPechVr2Path, notisPechVr2PathName);
  });
}

//вывод отчетов
const pechMpaParLDay = document.querySelector('.carbon-par-l-day-js');
const pechMpaParLDayPath = 'http://TechSite4/kaskad/Reports/sorbent/Day/ParMPA/D_CARBON_Par_';

if (pechMpaParLDay) {
  pechMpaParLDay.addEventListener('click', (e) => {
    e.preventDefault();
    reportDayFunc(pechMpaParLDayPath);
  });
}

const pechMpaParMonth = document.querySelector('.carbon-par-m-js');
const pechMpaParMonthPath = 'http://TechSite4/kaskad/Reports/sorbent/Month/ParMPA/M_CARBON_Par_';

if (pechMpaParMonth) {
  pechMpaParMonth.addEventListener('click', (e) => {
    e.preventDefault();
    reportMonthFunc(pechMpaParMonthPath);
  });
}

const notisPechVrLDay = document.querySelector('.notis-pechvr-l-day-js');
const notisPechVrLDayPath = 'http://TechSite5/kaskad/reports/sorbent/Day/notis/pechVR/notis-pechVR_';

if (notisPechVrLDay) {
  notisPechVrLDay.addEventListener('click', (e) => {
    e.preventDefault();
    reportDayFunc(notisPechVrLDayPath);
  });
}

const notisPechVrMonth = document.querySelector('.notis-pechvr-m-js');
const notisPechVrMonthPath = 'http://TechSite5/kaskad/reports/sorbent/Month/notis/pechVR/notis-pechVR__';

if (notisPechVrMonth) {
  notisPechVrMonth.addEventListener('click', (e) => {
    e.preventDefault();
    reportMonthFunc(notisPechVrMonthPath);
  });
}

//gorelki
const sushilkiGorelki = document.querySelector('.sushilka-gorelki-js');
const sushilkiGorelkiPath = 'http://Techsite4/kaskad/graphics/sushilki-gorelki/';
const sushilkiGorelkiPathName = '_sushilki-gorelki.jpg';

if (sushilkiGorelki) {
  sushilkiGorelki.addEventListener('click', (e) => {
    e.preventDefault();
    graphicFunc(sushilkiGorelkiPath, sushilkiGorelkiPathName);
  });
}

const pechVR = document.querySelector('.pechvr-gorelki-js');
const pechVRPath = 'http://Techsite4/kaskad/graphics/pechVR-gorelki/';
const pechVRPathName = '_pechVR-gorelki.jpg';

if (pechVR) {
  pechVR.addEventListener('click', (e) => {
    e.preventDefault();
    graphicFunc(pechVRPath, pechVRPathName);
  });
}

const gorelkiLDay = document.querySelector('.energy-reports-gorelki-l-day-js');
const gorelkiLDayPath = 'http://TechSite4/kaskad/reports/sorbent/Day/gorelki/gorelki_';

if (gorelkiLDay) {
  gorelkiLDay.addEventListener('click', (e) => {
    e.preventDefault();
    reportDayFunc(gorelkiLDayPath);
  });
}

const gorelkiMonth = document.querySelector('.energy-reports-gorelki-m-js');
const gorelkiMonthPath = 'http://TechSite4/kaskad/reports/sorbent/Month/gorelki/gorelki_';

if (gorelkiMonth) {
  gorelkiMonth.addEventListener('click', (e) => {
    e.preventDefault();
    reportMonthFunc(gorelkiMonthPath);
  });
}
