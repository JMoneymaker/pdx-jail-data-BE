// DATES
const moment = require('moment');
moment().format();

const getAge = dobStr => {
  let ageDifferenceMs = Date.now() - makeDate(dobStr);
  let ageDateMs = new Date(ageDifferenceMs);
  
  return Math.abs(ageDateMs.getUTCFullYear() - 1970);
};

const makeDate = dobStr => {
  const cleanDate = moment(dobStr, 'MM-DD-YYYY').format('L');
  let mo = cleanDate.slice(0, 2);
  let day = cleanDate.slice(3, 5);
  let yr = cleanDate.slice(-4);

  return new Date(yr, mo - 1, day);
};

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
  makeDate,
  numifyBail,
  getDescription,
  getLaw
};


