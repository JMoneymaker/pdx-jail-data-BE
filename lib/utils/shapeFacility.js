const facilityMap = {
  'MCDC': 'Multnomah County' + '\n' + 'Detention Center',
  'MCIJ': 'Inverness Jail',
  'CC': 'Community Corrections Center',
  'JL': 'Washington County Jail',
  'OA': 'Non-Washington County Facility'
};

const shapeFacility = string => {
  // eslint-disable-next-line no-prototype-builtins
  return facilityMap.hasOwnProperty(string) ? facilityMap[string] : 'Clackamas County Jail'; 
};
        
module.exports = { 
  shapeFacility
};
