const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  race: String,
  total: Number,
  county: String
}, {
  timestamps: true
});

module.exports = mongoose.model('DailyRaceCount', schema);
