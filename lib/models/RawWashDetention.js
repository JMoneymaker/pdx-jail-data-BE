const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  county: String,
  letter: {
    type: String,
    required: true
  },
  html: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('RawWashDetention', schema);
