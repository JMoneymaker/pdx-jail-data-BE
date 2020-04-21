const getAgeFromDOB = dob => {
  let day = dob.substr(0, dob.indexOf('/'));
  let mo = dob.substr(dob.indexOf('/') + 1).slice(0, -3).trim();
  let yr = dob.slice(-2);

  if(day < 10) day = (0 + day);
  if(mo < 10) mo = (0 + mo); 
  if(yr > 30){
    yr = (19 + yr);
  } else {
    yr = (20 + yr);
  }
  
  return (yr + mo + day);
};

console.log(getAgeFromDOB('12/13/01'));

const calculateAgeInMs = dob => {
  let ageDifMs = Date.now() - dob.getTime();
  let ageDate = new Date(ageDifMs);

  return Math.abs(ageDate.getUTCFullYear() - 1970);
};

console.log(calculateAgeInMs(new Date(1980, 12, 13)));
