// DATES
const moment = require('moment');
moment().format();

const getAge = dobStr => {
  let ageDifferenceMs = Date.now() - makeDate(dobStr);
  let ageDateMs = new Date(ageDifferenceMs);
  
  return Math.abs(ageDateMs.getUTCFullYear() - 1970);
};

const getAgeWash = dobStr => {
  let ageDifferenceMs = Date.now() - makeDateWash(dobStr);
  let ageDateMs = new Date(ageDifferenceMs);
  
  return Math.abs(ageDateMs.getUTCFullYear() - 1970);
};

const makeDate = dobStr => {
  const cleanDate = moment(dobStr, 'MM-DD-YYYY').format('L');
  if(cleanDate === 'Invalid Date' || cleanDate === 'Invalid date'){
    return undefined;
  } else {
    let [mo, day, yr] = cleanDate.split('/');  
    return new Date(yr, mo - 1, day);
  }
};

const makeDateWash = dobStr => {
  const cleanDate = moment(dobStr, 'YYYY-MM-DD').format('L');
  if(cleanDate === 'Invalid Date' || cleanDate === 'Invalid date'){
    return undefined;
  } else {
    let [mo, day, yr] = cleanDate.split('/');  
    return new Date(yr, mo - 1, day);
  }
};

function makeTimeless(){
  const longDate = new Date();
  return moment(longDate).format('L');
}

//BAIL 

const numifyBail = bailString => {
  const justTheNumbers = parseFloat(bailString.replace(/\$|,/g, ''));
  if(!Number(justTheNumbers)){
    return 0;
  } else {
    return (Number(justTheNumbers));
  }
};

// Charges

const getLaw = chargeString => {
  return chargeString.substr(0, chargeString.indexOf(' - ')).trim();
};

const getDescription = chargeString => {
  return chargeString.substr(chargeString.indexOf(' - ') + 1).slice(1).trim();
};

module.exports = {
  getAge,
  getAgeWash,
  makeDate,
  makeDateWash,
  makeTimeless,
  numifyBail,
  getDescription,
  getLaw
};


