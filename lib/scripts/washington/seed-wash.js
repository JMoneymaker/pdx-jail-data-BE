require('dotenv').config();
require('../../utils/connect')();

const mongoose = require('mongoose');
const DailyDetention = require('../../models/DailyDetention');
const scrapeQueriesWash = require('./scrape-queries-wash');
const scrapeDetentionsWash = require('./scrape-detentions-wash');

function scrapeAllDetentionsWash(queries) {
  return Promise.all(queries
    .map(query => scrapeDetentionsWash(query)));
}

function seedWashington(){
  return scrapeQueriesWash()
    .then(queries => scrapeAllDetentionsWash(queries))
    .then(detentions => DailyDetention.create(detentions.flat()))
    .catch(error => console.log(error));
}

seedWashington()
  .then(() => console.log('done'))
  .finally(() => mongoose.connection.close());
