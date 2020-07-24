const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  facility: String,
  total: Number,
  county: String
}, {
  timestamps: true
});

module.exports = mongoose.model('DailyFacilityCount', schema);
