const mongoose = require('mongoose');

const chargeSchema = new mongoose.Schema({
  description: String,
  category: String,
  bail: String,
  status: String
});

const caseSchema = new mongoose.Schema({
  caseNumber: String,
  daCaseNumber: String,
  citationNumber: String,
  charges: [chargeSchema]
});

const schema = new mongoose.Schema({
  county: String,
  dateAdded: String,
  bookingDate: {
    type: Date,
    required: true
  },
  projectedReleaseDate: String,
  //fix that ^^
  bookingNumber: {
    type: String,
    required: true,
  },
  swisId: {
    type: String,
    required: true
  },
  fullName: String,
  age: String,
  gender: String,
  race: String,
  height: String,
  weight: String,
  hairColor: String,
  eyeColor: String,
  image: String,
  arrestingAgency: String,
  releaseDate: Date,
  cases: [caseSchema] 
}, {
  toJSON: {
    virtuals: true,
    transform: (doc, ret) => {
      delete ret.id;
    }
  }
});

module.exports = mongoose.model('DailyDetentions', schema);
