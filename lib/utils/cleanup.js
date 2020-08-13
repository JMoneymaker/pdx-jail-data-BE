// Run this only when there are problems with the seed

require('dotenv').config();
require('../utils/connect')();
const MultRelease = require('../models/MultRelease');
const mongoose = require('mongoose');

const cleanupMisSeeed = async() => {
  await MultRelease
    .remove()
    .where('dateAdded')
    .eq('2020-08-12T00:00:00.000+00:00')
    .catch(err => console.log(err));
};

cleanupMisSeeed()
  .then(() => console.log('done removing misseed'))
  .finally(() => mongoose.connection.close());
