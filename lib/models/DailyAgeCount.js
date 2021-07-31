const mongoose = require('mongoose');

const ageCountSchema = new mongoose.Schema({
  _id: Number,
  total: String
})

const schema = new mongoose.Schema({
  ageTotals: [ageCountSchema],
  county: String
}, {
  timestamps: true
});

module.exports = mongoose.model('DailyAgeCount', schema);
