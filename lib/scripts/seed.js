require('dotenv').config();
require('../utils/connect')();

const mongoose = require('mongoose');
const Booking = require('../models/Booking');
const scrapeBookingNumbers = require('./scrape-booking-numbers');
const scrapeDetaineePage = require('./scrape-detainee-page');

function seedBookings(bookingNumbers) {
  return Promise.all(bookingNumbers.map(bookingNumber => scrapeDetaineePage(bookingNumber)));
}

function seedDatabase(){
  return scrapeBookingNumbers()
    .then(bookingNumbers => seedBookings(bookingNumbers))
    .then(({ bookings }) => Booking.create(bookings))
    .catch(error => console.log(error));
}

seedDatabase()
  .then(() => console.log('done'))
  .finally(() => mongoose.connection.close());
