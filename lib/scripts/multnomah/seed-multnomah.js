require('dotenv').config();
require('../../utils/connect')();

const mongoose = require('mongoose');
const DailyDetentions = require('../../models/DailyDetentions');
const scrapeBookingNumbers = require('./scrape-booking-numbers');
const scrapeBooking = require('./scrape-booking');

function scrapeBookings(bookingNumbers) {
  return Promise.all(bookingNumbers
    .map(bookingNumber => scrapeBooking(bookingNumber)));
}

function seedDatabase(){
  return scrapeBookingNumbers()
    .then(bookingNumbers => scrapeBookings(bookingNumbers))
    .then(dailyDetentions => DailyDetentions.create(dailyDetentions))
    .catch(error => console.log(error));
}

seedDatabase()
  .then(() => console.log('done'))
  .finally(() => mongoose.connection.close());
