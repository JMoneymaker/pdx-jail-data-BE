const mongoose = require('mongoose');

const schema = new mongoose.Schema({
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
  eyeColor: String
}, {
  toJSON: {
    virtuals: true,
    transform: (doc, ret) => {
      delete ret.id;
    }
  }
});

schema.virtual('booking', {
  ref: 'Booking',
  localField: 'bookingNumber',
  foreignField: 'person'
});

module.exports = mongoose.model('Person', schema);
