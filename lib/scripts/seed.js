require('dotenv').config();
require('../utils/connect')();

const mongoose = require('mongoose');
const DailyCount = require('../models/DailyCount');
const ClackScrape = require('../models/ClackScrape');
const MultScrape = require('../models/MultScrape');
const WashScrape = require('../models/WashScrape');
const { getClackQueries, getMultQueries, getWashQueries } = require('./scrape-queries');
const scrapeDetentionClack = require('./clackamas/scrape-detention-clack');
const scrapeDetentionMult = require('./multnomah/scrape-detention-mult');
const scrapeDetentionsWash = require('./washington/scrape-detentions-wash');

function scrapeClack(queries) {
  return Promise.all(queries
    .map(query => scrapeDetentionClack(query)));
}

function scrapeMult(queries) {
  return Promise.all(queries
    .map(query => scrapeDetentionMult(query)));
}

function scrapeWash(queries) {
  return Promise.all(queries
    .map(query => scrapeDetentionsWash(query)));
}

let count = 0;
const date = new Date();

async function seedDatabase(){

  try {
    const [dailyCount, clackamas, multnomah, washington] = await Promise.all([
      DailyCount.findOne(),
      getClackQueries().then(scrapeClack),
      getMultQueries().then(scrapeMult),
      getWashQueries().then(scrapeWash)
    ]);

    dailyCount.counts.push({ 
      date, 
      clack: clackamas.length, 
      mult: multnomah.length, 
      wash: washington.flat().length 
    }); 
    await dailyCount.save();

    return ClackScrape.create(...clackamas), 
    MultScrape.create(...multnomah), 
    WashScrape.create(...washington.flat());
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
