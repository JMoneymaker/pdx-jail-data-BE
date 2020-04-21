// Get age from DOB Functions

const calculateAge = dob => {
  let ageDifferenceMs = Date.now() - dob.getTime();
  let ageDateMs = new Date(ageDifferenceMs);
  
  return Math.abs(ageDateMs.getUTCFullYear() - 1970);
};

const getAgeFromDOB = dobStr => {
  let day = dobStr.substr(0, dobStr.indexOf('/'));
  let mo = dobStr.substr(dobStr.indexOf('/') + 1).slice(0, -3).trim();
  let yr = dobStr.slice(-2);

  day < 10 ? (0 + day) : mo < 10 ? (0 + mo) : yr > 30 ? (19 + yr) : (20 + yr);
  
  return calculateAge(new Date(yr, mo, day));
};

module.exports = {
  getAgeFromDOB
};
