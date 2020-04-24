require('dotenv').config();
require('../../utils/connect')();

const mongoose = require('mongoose');
const DailyDetention = require('../../models/DailyDetention');
const scrapeQueriesClack = require('./scrape-queries-clack');
const scrapeDetentionClack = require('./scrape-detention-clack');

function scrapeAllDetentionsClack(queries) {
  return Promise.all(queries
    .map(query => scrapeDetentionClack(query)));
}

function seedClack(){
  return scrapeQueriesClack()
    .then(queries => scrapeAllDetentionsClack(queries))
    .then(detentions=> DailyDetention.create(detentions))
    .catch(error => console.log(error));
}

seedClack()
  .then(() => console.log('done'))
  .finally(() => mongoose.connection.close());
