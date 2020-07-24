const ageMap = {
  '0': 'Under 18',
  '18': '18 - 20',
  '21': '21 - 25',
  '26': '26 - 30',
  '31': '31 - 35',
  '36': '36 - 40',
  '41': '41 - 45',
  '46': '46 - 50',
  '51': '51 - 60',
  '56': '56 - 60',
  '61': '61 - 65',
};
  
const shapeAge = arr => {
  return arr.map(obj => 
    Object.keys(obj).reduce((acc, key) => ({ 
      ...acc, ...{ age: ageMap[obj.age] || 'Over 65', total: obj.total[key], ...obj }
    }), {}));
};

module.exports = {
  shapeAge
};
