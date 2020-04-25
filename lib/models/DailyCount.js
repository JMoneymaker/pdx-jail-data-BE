const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  counts: [{
    date: Date,
    clack: Number,
    mult: Number,
    wash: Number
  }]
});

module.exports = mongoose.model('DailyCount', schema);
