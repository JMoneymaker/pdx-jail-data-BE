require('dotenv').config();
require('../utils/connect')();

const mongoose = require('mongoose');
const DailyDetention = require('../models/DailyDetention');
const scrapeQueriesClack = require('./clackamas/scrape-queries-clack');
const scrapeQueriesMult = require('./multnomah/scrape-queries-mult');
const scrapeQueriesWash = require('./washington/scrape-queries-wash');
const scrapeDetentionClack = require('./clackamas/scrape-detention-clack');
const scrapeDetentionMult = require('./multnomah/scrape-detention-mult');
const scrapeDetentionsWash = require('./washington/scrape-detentions-wash');

let count = 0;

function scrapeAllDetentionsClack(clackQueries) {
  return Promise.all(clackQueries
    .map(clackQuery => scrapeDetentionClack(clackQuery)));
}

function scrapeAllDetentionsMult(multQueries) {
  return Promise.all(multQueries
    .map(multQuery => scrapeDetentionMult(multQuery)));
}

function scrapeAllDetentionsWash(washQueries) {
  return Promise.all(washQueries
    .map(washQuery => scrapeDetentionsWash(washQuery)));
}

async function masterSeeder(){
  try {
    const [clackamas, multnomah, washington] = await Promise.all([
      scrapeQueriesClack().then(scrapeAllDetentionsClack),
      scrapeQueriesMult().then(scrapeAllDetentionsMult),
      scrapeQueriesWash().then(scrapeAllDetentionsWash)
    ]);

    return DailyDetention.create([...clackamas, ...multnomah, ...washington.flat()]);
  } catch(error){
    if(count < 3){
      count ++;
      return masterSeeder();
    } else {
      throw error;
    }
  }
}

masterSeeder()
  .then(() => console.log('done'))
  .catch(errors => console.log(errors)) //send email or text
  .finally(() => mongoose.connection.close());
