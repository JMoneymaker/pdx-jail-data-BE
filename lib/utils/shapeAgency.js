const agencyMap = {
  'Portland Police, North Precinct': 'PPB North Precinct',
  'Portland Police, Central Precinct': 'PPB Central Precinct',
  'Portland Police, East Precinct': 'PPB East Precinct',
  'Portland Police, Other': 'PPB Other',
  'Multnomah County Sheriff Booking': 'MCSO Booking',
  'Gresham Police Department': 'Gresham PD',
  'Drug Enforcement Administration': 'DEA',
  'WASHINGTON COUNTY COMM CORR': 'WACO COMM CORR',
  'SO WASHINGTON COUNTY JAIL': 'WACO Jail',
  'SO WASHINGTON COUNTY': 'WACO SO'
};
          
const shapeAgency = string => {
  // eslint-disable-next-line no-prototype-builtins
  return agencyMap.hasOwnProperty(string) ? agencyMap[string] : string; 
};
            
module.exports = { 
  shapeAgency
};
          
          
        
      
