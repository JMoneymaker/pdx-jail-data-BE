require('dotenv').config();
require('../../utils/connect')();

const mongoose = require('mongoose');
const DailyDetention = require('../../models/DailyDetention');
const scrapeQueriesMult = require('./scrape-queries-mult');
const scrapeDetentionMult = require('./scrape-detention-mult');

function scrapeAllDetentionsMult(queries) {
  return Promise.all(queries
    .map(query => scrapeDetentionMult(query)));
}

function seedMult(){
  return scrapeQueriesMult()
    .then(queries => scrapeAllDetentionsMult(queries))
    .then(detentions => DailyDetention.create(detentions))
    .catch(error => console.log(error));
}

seedMult()
  .then(() => console.log('done'))
  .finally(() => mongoose.connection.close());
