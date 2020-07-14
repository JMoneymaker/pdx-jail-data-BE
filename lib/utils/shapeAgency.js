const agencyMap = {
  'Portland Police, North Precinct': 'PPB North Precinct',
  'Portland Police, Central Precinct': 'PPB Central Precinct',
  'Portland Police, East Precinct': 'PPB East Precinct',
  'Portland Police, Other': 'PPB Other',
  'Multnomah County Sheriff Booking': 'MCSO Booking',
  'Gresham Police Department': 'Gresham PD',
  'Drug Enforcement Administration': 'DEA',
  'WASHINGTON COUNTY COMM CORR': 'WACO Comm Corr',
  'SO WASHINGTON COUNTY JAIL': 'WACO Jail',
  'SO WASHINGTON COUNTY': 'WACO Sheriff\'s Office',
  'PD NEWBERG': 'Newberg PD',
  'PD FOREST GROVE': 'Forest Grove PD',
  'PD BEAVERTON': 'Beaverton PD',
  null: 'Not Provided',
  'SPOL BANKS': 'Banks State Police',
  'PD HILLSBORO':'Hillsboro PD',
  'PD TUALATIN': 'Tualatin PD',
  'PD CORNELIUS': 'Cornelius PD',
  'PD SHERWOOD': 'Sherwood PD',
  'PD TIGARD': 'Tigard PD'
};
          
const shapeAgency = string => {
  // eslint-disable-next-line no-prototype-builtins
  return agencyMap.hasOwnProperty(string) ? agencyMap[`${string}`] : string; 
};
            
module.exports = { 
  shapeAgency
};   
