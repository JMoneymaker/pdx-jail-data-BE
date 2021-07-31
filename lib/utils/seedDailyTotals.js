require('dotenv').config();
require('../utils/connect')();
const mongoose = require('mongoose');
const DailyTotal = require('../models/DailyTotal');
const MultDetention = require('../models/MultDetention');
const ClackDetention = require('../models/ClackDetention');
const WashDetention = require('../models/WashDetention');

let multTotal;
let clackTotal;
let washTotal;
const seedDailyTotals = async() => {
  const dailyTotal = await DailyTotal.findOne();

  await Promise.all([
    [multTotal] = await MultDetention.findLatestTotal(),
    [clackTotal] = await ClackDetention.findLatestTotal(),
    [washTotal] = await WashDetention.findLatestTotal()
  ]); 

  dailyTotal.counts.push({ date: multTotal.createdAt, clack: clackTotal.total, mult: multTotal.total, wash: washTotal.total });
  await dailyTotal.save();
};

seedDailyTotals()
  .then(() => console.log('done'))
  .finally(() => mongoose.connection.close());
