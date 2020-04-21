require('dotenv').config();
require('../../utils/connect')();

const mongoose = require('mongoose');
const DailyDetentions = require('../../models/DailyDetentions');
const scrapeBookingNumbers = require('./scrape-booking-numbers-mult');
const scrapeDetention = require('./scrape-detention-mult');

function scrapeDetentions(bookingNumbers) {
  return Promise.all(bookingNumbers
    .map(bookingNumber => scrapeDetention(bookingNumber)));
}

function seedDatabase(){
  return scrapeBookingNumbers()
    .then(bookingNumbers => scrapeDetentions(bookingNumbers))
    .then(detentions => DailyDetentions.create(detentions))
    .catch(error => console.log(error));
}

seedDatabase()
  .then(() => console.log('done'))
  .finally(() => mongoose.connection.close());
