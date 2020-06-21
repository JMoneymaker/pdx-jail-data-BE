const raceKeysMap = {
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
    
const reKeyRace = string => {
  // eslint-disable-next-line no-prototype-builtins
  return raceKeysMap.hasOwnProperty(string) ? raceKeysMap[string] : string; 
};
      
module.exports = { 
  reKeyRace 
};
    
    
  
