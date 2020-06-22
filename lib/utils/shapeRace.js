const raceMap = {
  A: 'Asian',
  B: 'Black',
  I: 'Indigenous',
  U: 'Unknown',
  W: 'White',
  P: 'Pacific Islander',
  ASIAN: 'Asian',
  OTHER: 'Other',
  BLACK: 'Black',
  WHITE: 'White',
  HISPANIC: 'Hispanic',
  UNKNOWN: 'Unknown'
};
    
const shapeRace = string => {
  // eslint-disable-next-line no-prototype-builtins
  return raceMap.hasOwnProperty(string) ? raceMap[string] : string; 
};
      
module.exports = { 
  shapeRace 
};
    
    
  
