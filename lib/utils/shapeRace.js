const raceMap = {
  'ASIAN': 'Asian',
  'OTHER': 'Other',
  'BLACK': 'Black',
  'WHITE': 'White',
  'HISPANIC': 'Hispanic',
  'UNKNOWN': 'Unknown',
  'AMER IND': 'Native American',
  A: 'Asian',
  B: 'Black',
  I: 'Native American',
  U: 'Unknown',
  W: 'White',
  P: 'Pacific Islander'
};
    
const shapeRace = string => {
  // eslint-disable-next-line no-prototype-builtins
  return raceMap.hasOwnProperty(string) ? raceMap[string] : string; 
};
      
module.exports = { 
  shapeRace
};
    
    
  
