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
    bookingDate: makeDate(body.bookdate),
    projectedReleaseDate: makeDate(body.releasedate),
    bookingNumber: body.bookno,
    swisId: body.sidno.trim(),
    fullName: body.name.trim(),
    age: getAge(body.dob),
    dob: makeDate(body.dob),
    gender: shapeGender(body.sex.trim()),
    race: shapeRace(body.race.trim()),
    height: body.height,
    weight: body.weight,
    hairColor: body.hair,
    eyeColor: body.eyes,
    image: body.image,
    charges: body.charges.map(charge => ({
      description: getDescription(charge.charge),
      category: getLaw(charge.charge),
      bail: numifyBail(charge.bail),
      status: charge.status
    }))
  });
};

