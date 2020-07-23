require('dotenv').config();
require('../utils/connect')();

const mongoose = require('mongoose');
const DailyCount = require('../models/DailyCount');
const ClackScrape = require('../models/ClackScrape');
const MultScrape = require('../models/MultScrape');
const WashScrape = require('../models/WashScrape');
const Gender = require('../models/Gender');

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
const date = new Date();

async function seedDatabase(){

  try {
    const [dailyCount, clackamas, multnomah, washington] = await Promise.all([
      DailyCount.findOne(),
      getClackQueries().then(scrapeClack),
      getMultQueries().then(scrapeMult),
      scrapeWash(washQueries)
    ]);

    dailyCount.counts.push({ 
      date, 
      clack: clackamas.length, 
      mult: multnomah.length, 
      wash: washington.flat().length 
    }); 
    await dailyCount.save();

    return Promise.all([
      ClackScrape.create(...clackamas), 
      MultScrape.create(...multnomah), 
      WashScrape.create(...washington.flat())]);
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

async function aggregateGender() {
  const [clackGender, multGender, washGender] = await Promise.all([
    ClackScrape.dailyGenderCount(),
    MultScrape.findDailyGenderCount(),
    WashScrape.dailyGenderCount()
  ]);

  return Gender.create([...clackGender, ...multGender, ...washGender]);
} 

seedDatabase()
  .then(() => console.log('database seeded'))
  .then(aggregateGender)
  .then(() => console.log('gender aggregated'))
  //run all aggregations and store new object in a different collection / other collection model.create
  //console.log aggregation seeded
  .catch(errors => console.log(errors)) //send email or text
  .finally(() => mongoose.connection.close());
