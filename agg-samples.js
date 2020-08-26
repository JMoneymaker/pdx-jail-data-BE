[
  {
    '$project': {
      'date': {
        '$dateToString': {
          'format': '%Y-%m-%d', 
          'date': '$createdAt'
        }
      }, 
      'facility': '$facility', 
      'total': '$total', 
      'county': '$county'
    }
  }, {
    '$sort': {
      'date': -1
    }
  }, {
    '$limit': 6
  }
];
