require('dotenv').config();
require('../utils/connect')();

const mongoose = require('mongoose');
const ClackBack = require('../models/ClackBack');
const MultBack = require('../models/MultBack');
const WashBack = require('../models/WashBack');
const { getClackQueries, getMultQueries, washQueries } = require('./scrape-queries');
const scrapeClackamas = require('./clackamas/scrape-clackamas');
const scrapeMultnomah = require('./multnomah/scrape-multnomah');
const scrapeWashington = require('./washington/scrape-washington');

function scrapeClack(queryArray) {
  return Promise.all(queryArray
    .map(query => scrapeClackamas(query)));
}

function scrapeMult(queryArray) {
  return Promise.all(queryArray
    .map(query => scrapeMultnomah(query)));
}

function scrapeWash(queryArray) {
  return Promise.all(queryArray
    .map(query => scrapeWashington(query)));
}

let count = 0;
async function seedDatabase(){
  try {
    const [clackamas, multnomah, washington] = await Promise.all([
      getClackQueries().then(scrapeClack),
      getMultQueries().then(scrapeMult),
      scrapeWash(washQueries)
    ]);

    return Promise.all([
      ClackBack.create(...clackamas), 
      MultBack.create(...multnomah), 
      WashBack.create(...washington.flat())]);
  } 
  catch(error){
    if(count < 3){
      count ++;
      return seedDatabase();
    } else {
      throw error;
    }
  }
}

seedDatabase()
  .then(() => console.log('done'))
  .catch(errors => console.log(errors)) //send email or text
  .finally(() => mongoose.connection.close());
