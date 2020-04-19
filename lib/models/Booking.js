const mongoose = require('mongoose');

const chargeSchema = new mongoose.Schema({
  description: String,
  bail: Number,
  status: String
});

const schema = new mongoose.Schema({
  bookingNumber: {
    type: Number,
    required: true
  },
  bookingDate: {
    type: String,
    required: true
  },
  swisId: {
    type: String,
    required: true
  },
  fullName: String,
  dob: String,
  height: String,
  weight: String,
  gender: String,
  race: String,
  hairColor: String,
  eyeColor: String,
  image: String,
  releaseDate: String,
  charges: [chargeSchema]
}, {
  toJSON: {
    virtuals: true,
    transform: (doc, ret) => {
      delete ret.id;
    }
  }
});

module.exports = mongoose.model('Booking', schema);
