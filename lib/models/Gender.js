const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  county: String,
  gender: String,
  total: String,
  date: new Date()
});

module.exports = mongoose.models('GenderCount', schema);
