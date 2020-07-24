const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  facility: String,
  total: Number,
  county: String
}, {
  timestamps: true
});

schema.statics.getDailyFacilityCount = function() {
  return this.aggregate([
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
      }, {
        '$sort': {
          'county': 1, 
          'facility': 1
        }
      }
    ]
  ]);
};

module.exports = mongoose.model('DailyFacilityCount', schema);
