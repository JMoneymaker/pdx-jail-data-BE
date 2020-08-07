const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  county: String,
  bookingNo: {
    type: String,
    required: true
  },
  json: {
    type: JSON,
    required: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('RawClackDetention', schema);
