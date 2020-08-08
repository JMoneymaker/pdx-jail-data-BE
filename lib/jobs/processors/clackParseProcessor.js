require('dotenv').config();
const mongoose = require('mongoose');
const { getAge, makeDate, numifyBail, getDescription, getLaw, makeTimeless } = require('../../utils/dataShapers');
const { shapeRace } = require('../../utils/shapeRace');
const { shapeGender } = require('../../utils/shapeGender');
const RawClackDetention = require('../../models/RawClackDetention');
const ClackDetention = require('../../models/ClackDetention');

module.exports = async(job) => {
  mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  });
  
  try {
    const { json } = await RawClackDetention.findById(job.data.id);
    return await ClackDetention.create(parseDetention(json));
  } finally {
    await mongoose.connection.close();
  }
};

const parseDetention = body => {
  return ({
    county: 'Clackamas',
    dateAdded: makeTimeless(),
    bookingDate: body.bookdate ? makeDate(body.bookdate) : null,
    projectedReleaseDate: body.releasedate ? makeDate(body.releasedate) : null,
    bookingNumber: body.bookno ? body.bookno : null,
    swisId: body.sidno ? body.sidno.trim() : null,
    fullName: body.name ? body.name.trim() : null,
    age: body.dob ? getAge(body.dob) : null,
    dob: body.dob ? makeDate(body.dob) : null,
    gender: body.sex ? shapeGender(body.sex.trim()) : null,
    race: body.race ? shapeRace(body.race.trim()) : null,
    height: body.height ? body.height : null,
    weight: body.weight ? body.weight : null,
    hairColor: body.hair ? body.hair : null,
    eyeColor: body.eyes ? body.eyes : null,
    image: body.image ? body.image : null,
    charges: body.charges ? body.charges.map(charge => ({
      description: getDescription(charge.charge),
      category: getLaw(charge.charge),
      bail: numifyBail(charge.bail),
      status: charge.status
    })) : null
  });
};

