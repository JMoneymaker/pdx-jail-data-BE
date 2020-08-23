require('dotenv').config();
require('../utils/connect')();

const mongoose = require('mongoose');
const DailyCount = require('../models/DailyCount');
const { getClackQueries, getMultQueries, washQueries } = require('./scrape-queries');
const scrapeWashington = require('./scrape-washington');

function scrapeWash(queryArray) {
  return Promise.all(queryArray
    .map(query => scrapeWashington(query)));
}

const date = new Date();

async function seedDatabase(){
  const [dailyCount, clackamas, multnomah, washington] = await Promise.all([
    DailyCount.findOne(),
    getClackQueries(),
    getMultQueries(),
    scrapeWash(washQueries)
  ]);

  await dailyCount.counts.push({ 
    date, 
    clack: clackamas.length, 
    mult: multnomah.length, 
    wash: washington.flat().length 
  }); 

  return dailyCount.save();
}

seedDatabase()
  .then(() => console.log('done'))
  .catch(errors => console.log(errors))
  .finally(() => mongoose.connection.close());
