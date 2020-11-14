// Run this only when there are problems with the seed

require('dotenv').config();
require('../utils/connect')();
// const MultRelease = require('../models/MultRelease');
// const MultDetention = require('../models/MultDetention');
// const MultBooking = require('../models/MultBooking');
// const ClackDetention = require('../models/ClackDetention');
const WashDetention = require('../models/WashDetention')
const mongoose = require('mongoose');

const cleanupMisSeeed = async() => {
  await WashDetention
    .deleteMany()
    .where('createdAt')
    .gt('2020-11-11T00:00:00.000+00:00')
    .catch(err => console.log(err));
};

cleanupMisSeeed()
  .then(() => console.log('done removing misseed'))
  .finally(() => mongoose.connection.close());
