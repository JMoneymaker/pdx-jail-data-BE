require('dotenv').config();
require('../../utils/connect')();

const mongoose = require('mongoose');
const DailyDetention = require('../../models/DailyDetention');
const scrapeQueriesMult = require('./scrape-queries-mult');
const scrapeDetentionMult = require('./scrape-detention-mult');

function scrapeDetentions(bookingNumbers) {
  return Promise.all(bookingNumbers
    .map(bookingNumber => scrapeDetentionMult(bookingNumber)));
}

function seedMult(){
  return scrapeQueriesMult()
    .then(bookingNumbers => scrapeDetentions(bookingNumbers))
    .then(detentions => DailyDetention.create(detentions))
    .catch(error => console.log(error));
}

seedMult()
  .then(() => console.log('done'))
  .finally(() => mongoose.connection.close());
