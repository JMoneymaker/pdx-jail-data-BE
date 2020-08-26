const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  gender: String,
  total: Number,
  county: String
}, {
  timestamps: true
});

module.exports = mongoose.model('DailyGenderCount', schema);
