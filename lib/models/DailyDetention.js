const mongoose = require('mongoose');

const chargeSchema = new mongoose.Schema({
  description: String,
  category: String,
  bail: Number,
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
  dateAdded: Date,
  bookingDate: Date,
  projectedReleaseDate: Date,
  releaseDate: Date,
  bookingNumber: String,
  swisId: String,
  fullName: String,
  age: Number,
  dob: Date,
  gender: String,
  race: String,
  height: String,
  weight: String,
  hairColor: String,
  eyeColor: String,
  image: String,
  arrestingAgency: String,
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
