require('dotenv').config();
require('../utils/connect')();

const mongoose = require('mongoose');
const ClackScrape = require('../models/ClackScrape');
const ClackDailyCount = require('../models/ClackDailyCount');
const MultScrape = require('../models/MultScrape');
const MultDailyCount = require('../models/MultDailyCount');
const WashScrape = require('../models/WashScrape');
const WashDailyCount = require('../models/WashDailyCount');
const scrapeQueriesClack = require('./clackamas/scrape-queries-clack');
const scrapeQueriesMult = require('./multnomah/scrape-queries-mult');
const scrapeQueriesWash = require('./washington/scrape-queries-wash');
const scrapeDetentionClack = require('./clackamas/scrape-detention-clack');
const scrapeDetentionMult = require('./multnomah/scrape-detention-mult');
const scrapeDetentionsWash = require('./washington/scrape-detentions-wash');

let count = 0;
const date = new Date();

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
    const [clackCount, multCount, washCount, clackamas, multnomah, washington] = await Promise.all([
      ClackDailyCount.findOne(),
      MultDailyCount.findOne(),
      WashDailyCount.findOne(),
      scrapeQueriesClack().then(scrapeAllDetentionsClack),
      scrapeQueriesMult().then(scrapeAllDetentionsMult),
      scrapeQueriesWash().then(scrapeAllDetentionsWash)
    ]);

    clackCount.counts.push({ date, count: clackamas.length }); await clackCount.save();
    multCount.counts.push({ date, count: multnomah.length }); await multCount.save(); 
    washCount.counts.push({ date, count: washington.flat().length }); await washCount.save();   

    return ClackScrape.create(...clackamas), 
    MultScrape.create(...multnomah), 
    WashScrape.create(...washington.flat());
  } 
  catch(error){
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
