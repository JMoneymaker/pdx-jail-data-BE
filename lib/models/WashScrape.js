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
  assignedFacility: String,
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

schema.statics.dailyAgeCount = function(){
  return this.aggregate([
    [
      {
        '$lookup': {
          'from': 'washscrapes', 
          'pipeline': [
            {
              '$sort': {
                'dateAdded': -1
              }
            }, {
              '$limit': 1
            }, {
              '$project': {
                '_id': 0, 
                'dateAdded': 1
              }
            }
          ], 
          'as': 'latest'
        }
      }, {
        '$addFields': {
          'latest': {
            '$arrayElemAt': [
              '$latest', 0
            ]
          }
        }
      }, {
        '$match': {
          '$expr': {
            '$eq': [
              '$dateAdded', '$latest.dateAdded'
            ]
          }
        }
      }, {
        '$bucket': {
          'groupBy': '$age', 
          'boundaries': [
            0, 18, 21, 26, 31, 36, 41, 46, 51, 56, 61, 66
          ], 
          'default': 'Over 60', 
          'output': {
            'total': {
              '$sum': 1
            }
          }
        }
      }
    ]
  ]);
};

schema.statics.dailyFacilityCount = function(){
  return this.aggregate([
    [
      {
        '$lookup': {
          'from': 'washscrapes', 
          'pipeline': [
            {
              '$sort': {
                'dateAdded': -1
              }
            }, {
              '$limit': 1
            }, {
              '$project': {
                '_id': 0, 
                'dateAdded': 1
              }
            }
          ], 
          'as': 'latest'
        }
      }, {
        '$addFields': {
          'latest': {
            '$arrayElemAt': [
              '$latest', 0
            ]
          }
        }
      }, {
        '$match': {
          '$expr': {
            '$eq': [
              '$dateAdded', '$latest.dateAdded'
            ]
          }
        }
      }, {
        '$group': {
          '_id': '$assignedFacility', 
          'total': {
            '$sum': 1
          }
        }
      }
    ]
  ]);
};

schema.statics.dailyRaceCount = function(){
  return this.aggregate([
    [
      {
        '$lookup': {
          'from': 'washscrapes', 
          'pipeline': [
            {
              '$sort': {
                'dateAdded': -1
              }
            }, {
              '$limit': 1
            }, {
              '$project': {
                '_id': 0, 
                'dateAdded': 1
              }
            }
          ], 
          'as': 'latest'
        }
      }, {
        '$addFields': {
          'latest': {
            '$arrayElemAt': [
              '$latest', 0
            ]
          }
        }
      }, {
        '$match': {
          '$expr': {
            '$eq': [
              '$dateAdded', '$latest.dateAdded'
            ]
          }
        }
      }, {
        '$group': {
          '_id': '$race', 
          'total': {
            '$sum': 1
          }
        }
      }
    ]
  ]);
};

module.exports = mongoose.model('WashScrape', schema);
