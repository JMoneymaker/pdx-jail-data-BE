const mongoose = require('mongoose');

const chargeSchema = new mongoose.Schema({
  bookingNo: String,
  caseNumber: String,
  daCaseNumber: String,
  citationNumber: String,
  description: String,
  category: String,
  osb: String,
  arrestDate: Date,
  arrestingAgency: String,
  court: String,
  bail: String,
  status: String,
  scheduledReleaseDate: Date
});

const schema = new mongoose.Schema({
  county: String,
  dateAdded: Date,
  bookingDate: Date,
  projectedReleaseDate: Date,
  releaseDate: Date,
  bookingNumber: String,
  swisId: String,
  mni: String,
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
  status: String,
  charges: [chargeSchema] 
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (doc, ret) => {
      delete ret.id;
    }
  }
});

module.exports = mongoose.model('WashScrape', schema);
