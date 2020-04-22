require('dotenv').config();
require('../../utils/connect')();

const mongoose = require('mongoose');
const DailyDetention = require('../../models/DailyDetention');
const scrapeBookingNumbers = require('./scrape-booking-numbers-clack');
const scrapeDetention = require('./scrape-detention-clack');

function scrapeDetentions(bookingNumbers) {
  return Promise.all(bookingNumbers
    .map(bookingNumber => scrapeDetention(bookingNumber)));
}

function seedDatabase(){
  return scrapeBookingNumbers()
    .then(bookingNumbers => scrapeDetentions(bookingNumbers))
    .then(detentions=> DailyDetention.create(detentions))
    .catch(error => console.log(error));
}

seedDatabase()
  .then(() => console.log('done'))
  .finally(() => mongoose.connection.close());
