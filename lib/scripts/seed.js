require('dotenv').config();
require('../utils/connect')();

const mongoose = require('mongoose');
const DailyCount = require('../models/DailyCount');
const ClackScrape = require('../models/ClackScrape');
const MultScrape = require('../models/MultScrape');
const WashScrape = require('../models/WashScrape');
const DailyGenderCount = require('../models/DailyGenderCount');
const DailyFacilityCount = require('../models/DailyFacilityCount');
const DailyAgeCount = require('../models/DailyAgeCount');
const DailyRaceCount = require('../models/DailyRaceCount');
const DailyAgencyCount = require('../models/DailyAgencyCount');

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
      DailyCount.create({}),
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
    ClackScrape.findDailyGenderCount(),
    MultScrape.findDailyGenderCount(),
    WashScrape.findDailyGenderCount()
  ]);

  return DailyGenderCount.create([...clackGender, ...multGender, ...washGender]);
} 

async function aggregateFacility() {
  const [clackFacility, multFacility, washFacility] = await Promise.all([
    ClackScrape.findDailyFacilityCount(),
    MultScrape.findDailyFacilityCount(),
    WashScrape.findDailyFacilityCount()
  ]);

  return DailyFacilityCount.create([...clackFacility, ...multFacility, ...washFacility]);
} 

async function aggregateAge() {
  const [clackAge, multAge, washAge] = await Promise.all([
    ClackScrape.findDailyAgeCount(),
    MultScrape.findDailyAgeCount(),
    WashScrape.findDailyAgeCount()
  ]);

  return DailyAgeCount.create([...clackAge, ...multAge, ...washAge]);
} 

async function aggregateRace() {
  const [clackRace, multRace, washRace] = await Promise.all([
    ClackScrape.findDailyRaceCount(),
    MultScrape.findDailyRaceCount(),
    WashScrape.findDailyRaceCount()
  ]);

  return DailyRaceCount.create([...clackRace, ...multRace, ...washRace]);
} 

async function aggregateAgency() {
  const [multAgency, washAgency] = await Promise.all([
    MultScrape.findDailyAgencyCount(),
    WashScrape.findDailyAgencyCount()
  ]);

  return DailyAgencyCount.create([...multAgency, ...washAgency]);
} 

seedDatabase()
  .then(() => console.log('database seeded'))
  .then(aggregateGender)
  .then(() => console.log('gender aggregation seeded'))
  .then(aggregateFacility)
  .then(() => console.log('facility aggregation seeded'))
  .then(aggregateAge)
  .then(() => console.log('age aggregation seeded'))
  .then(aggregateRace)
  .then(() => console.log('race aggregation seeded'))
  .then(aggregateAgency)
  .then(() => console.log('agency aggregation seeded'))
  .catch(errors => console.log(errors)) //send email or text
  .finally(() => mongoose.connection.close());
