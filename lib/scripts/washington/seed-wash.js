require('dotenv').config();
require('../../utils/connect')();

const mongoose = require('mongoose');
const DailyDetention = require('../../models/DailyDetention');
const scrapeDetentionLinks = require('./scrape-links-wash');
const scrapeDetentions = require('./scrape-detentions-wash');

function scrapeAllDetentions(bookingQueries) {
  return Promise.all(bookingQueries
    .map(bookingQuery => scrapeDetentions(bookingQuery)));
}

function seedDatabase(){
  return scrapeDetentionLinks()
    .then(bookingQueries => scrapeAllDetentions(bookingQueries))
    .then(detentions => DailyDetention.create(detentions.flat()))
    .catch(error => console.log(error));
}

seedDatabase()
  .then(() => console.log('done'))
  .finally(() => mongoose.connection.close());
