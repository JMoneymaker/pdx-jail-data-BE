const mongoose = require('mongoose');

const chargeSchema = new mongoose.Schema({
  description: String,
  category: String,
  bail: Number,
  status: String
});

const schema = new mongoose.Schema({
  bookingNumber: {
    type: String,
    required: true,
  },
  bookingDate: {
    type: Date,
    required: true
  },
  swisId: {
    type: String,
    required: true
  },
  arrestingAgency: String,
  releaseDate: Date,
  fullName: String,
  age: String,
  gender: String,
  race: String,
  height: String,
  weight: String,
  hairColor: String,
  eyeColor: String,
  caseNumber: String,
  charges: [chargeSchema]
}, {
  toJSON: {
    virtuals: true,
    transform: (doc, ret) => {
      delete ret.id;
    }
  }
});

module.exports = mongoose.model('DailyDetentions', schema);
