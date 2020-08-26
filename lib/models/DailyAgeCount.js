const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  age: String,
  total: Number,
  county: String
}, {
  timestamps: true
});

module.exports = mongoose.model('DailyAgeCount', schema);
