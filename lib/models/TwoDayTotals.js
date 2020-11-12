const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    dateToday: Date,
    clack: Number,
    mult: Number,
    wash: Number
});

schema.statics.getCSVCounts = function(){
  return this.aggregate([
    [
      {
        '$unwind': {
          'path': '$counts'
        }
      }, {
        '$project': {
          'date': '$counts.date', 
          'clackamas': '$counts.clack', 
          'multnomah': '$counts.mult', 
          'washington': '$counts.wash'
        }
      }
    ]
  ]);
};

module.exports = mongoose.model('TwoDayTotals', schema);