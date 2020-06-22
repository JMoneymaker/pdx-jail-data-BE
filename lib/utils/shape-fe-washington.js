const rawData = [
  {
    _id: 'U',
    total: 1
  },
  {
    _id: 'W',
    total: 414
  },
  {
    _id: 'B',
    total: 53
  },
  {
    _id: 'A',
    total: 18
  },
  {
    _id: 'I',
    total: 2
  }
];
  
const keysMap = {
  A: 'Asian',
  B: 'Black',
  I: 'Indigenous',
  U: 'Unknown',
  W: 'White'
};
  
const reKeyRace = (keyMap, arr) => {
  return arr.map(obj => 
    Object.keys(obj).reduce((acc, key) => ({ 
      ...acc, ...{ _id: keyMap[obj._id] || key, total: obj[key] }
    }), {})
  );
};
  
console.log(reKeyRace(keysMap, rawData));
  
module.exports = { 
  reKeyRace 
};
  
  
