const mongoose = require('mongoose');

const chargeSchema = new mongoose.Schema({
  description: String,
  category: String,
  bail: Number,
  //Washington County has an inmate status, not an individual case status
  status: String
});

const caseSchema = new mongoose.Schema({
  //Washington and Clackamas Counties do this differently. Not sure how best to handle.
  caseNumber: String,
  daCaseNumber: String,
  citationNumber: String,
  charges: [chargeSchema]
});

const schema = new mongoose.Schema({
  county: String,
  dateAdded: String,
  bookingDate: String,
  projectedReleaseDate: String,
  releaseDate: String,
  bookingNumber: String,
  swisId: String,
  MNI: String,
  fullName: String,
  age: Number,
  dob: String,
  gender: String,
  race: String,
  height: String,
  weight: String,
  hairColor: String,
  eyeColor: String,
  image: String,
  arrestingAgency: String,
  status: String,
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
