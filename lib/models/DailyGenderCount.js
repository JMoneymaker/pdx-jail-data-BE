const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  gender: String,
  total: Number,
  county: String
}, {
  timestamps: true
});

schema.statics.getDailyGenderCount = function() {
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
          'gender': '$gender', 
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
          'gender': 1
        }
      }
    ]
  ]);
};

module.exports = mongoose.model('DailyGenderCount', schema);
