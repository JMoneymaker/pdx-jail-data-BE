const mongoose = require('mongoose');

const chargeSchema = new mongoose.Schema({
  description: String,
  bail: String,
  status: String
});

const schema = new mongoose.Schema({
  dateAdded: Date,
  bookingNumber: {
    type: Number,
    required: true
  },
  bookingDate: {
    type: String,
    required: true
  },
  swisId: String,
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

schema.statics.getdailyCount = function(){
  return this.aggregate([
    {
      '$group': {
        '_id': '$dateAdded', 
        'count': {
          '$sum': 1
        }
      }
    }
  ]);
};

module.exports = mongoose.model('Booking', schema);

