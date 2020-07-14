const genderMap = {
  'M': 'Male',
  'F': 'Female'
};
      
const shapeGender = string => {
  // eslint-disable-next-line no-prototype-builtins
  return genderMap.hasOwnProperty(string) ? genderMap[string] : string; 
};
        
module.exports = { 
  shapeGender
};
