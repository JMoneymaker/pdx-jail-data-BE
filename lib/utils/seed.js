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

let count = 0;
const date = new Date();

async function seedDatabase(){

  try {
    const [dailyCount, clackamas, multnomah, washington] = await Promise.all([
      DailyCount.findOne(),
      getClackQueries(),
      getMultQueries(),
      scrapeWash(washQueries)
    ]);

    dailyCount.counts.push({ 
      date, 
      clack: clackamas.length, 
      mult: multnomah.length, 
      wash: washington.flat().length 
    }); 
    
    return dailyCount.save();
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
