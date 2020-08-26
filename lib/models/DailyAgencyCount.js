const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  agency: String,
  total: Number,
  county: String
}, {
  timestamps: true
});

module.exports = mongoose.model('DailyAgencyCount', schema);
