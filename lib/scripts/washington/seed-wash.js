require('dotenv').config();
require('../../utils/connect')();

const mongoose = require('mongoose');
const DailyDetention = require('../../models/DailyDetention');
const scrapeQueriesWash = require('./scrape-queries-wash');
const scrapeDetentionsWash = require('./scrape-detentions-wash');

function scrapeAllDetentions(bookingQueries) {
  return Promise.all(bookingQueries
    .map(bookingQuery => scrapeDetentionsWash(bookingQuery)));
}

function seedWashington(){
  return scrapeQueriesWash()
    .then(bookingQueries => scrapeAllDetentions(bookingQueries))
    .then(detentions => DailyDetention.create(detentions.flat()))
    .catch(error => console.log(error));
}

seedWashington()
  .then(() => console.log('done'))
  .finally(() => mongoose.connection.close());
