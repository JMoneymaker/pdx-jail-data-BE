require('dotenv').config();
require('../../utils/connect')();

const mongoose = require('mongoose');
const DailyDetention = require('../../models/DailyDetention');
const scrapeQueriesClack = require('./scrape-queries-clack');
const scrapeDetentionClack = require('./scrape-detention-clack');

function scrapeDetentionsClack(bookingNumbers) {
  return Promise.all(bookingNumbers
    .map(bookingNumber => scrapeDetentionClack(bookingNumber)));
}

function seedClack(){
  return scrapeQueriesClack()
    .then(bookingNumbers => scrapeDetentionsClack(bookingNumbers))
    .then(detentions=> DailyDetention.create(detentions))
    .catch(error => console.log(error));
}

seedClack()
  .then(() => console.log('done'))
  .finally(() => mongoose.connection.close());
