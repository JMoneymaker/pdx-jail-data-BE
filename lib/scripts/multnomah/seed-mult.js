require('dotenv').config();
require('../../utils/connect')();

const mongoose = require('mongoose');
const MultScrape = require('../../models/MultScrape');
const scrapeQueriesMult = require('./scrape-queries-mult');
const scrapeDetentionMult = require('./scrape-detention-mult');

function scrapeAllDetentionsMult(queries) {
  return Promise.all(queries
    .map(query => scrapeDetentionMult(query)));
}

function seedMult(){
  return scrapeQueriesMult()
    .then(queries => scrapeAllDetentionsMult(queries))
    .then(detentions => MultScrape.create(detentions))
    .catch(error => console.log(error));
}

seedMult()
  .then(() => console.log('done'))
  .finally(() => mongoose.connection.close());
