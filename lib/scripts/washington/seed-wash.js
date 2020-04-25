require('dotenv').config();
require('../../utils/connect')();

const mongoose = require('mongoose');
const WashScrape = require('../../models/WashScrape');
const scrapeQueriesWash = require('./scrape-queries-wash');
const scrapeDetentionsWash = require('./scrape-detentions-wash');

function scrapeAllDetentionsWash(queries) {
  return Promise.all(queries
    .map(query => scrapeDetentionsWash(query)));
}

const seedWashington = () => {
  return scrapeQueriesWash()
    .then(queries => scrapeAllDetentionsWash(queries))
    .then(detentions => WashScrape.create(detentions.flat()))
    .catch(error => console.log(error));
};

seedWashington()
  .then(() => console.log('done'))
  .finally(() => mongoose.connection.close());
