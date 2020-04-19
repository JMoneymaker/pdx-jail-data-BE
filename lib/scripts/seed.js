require('dotenv').config();
require('../utils/connect')();

const mongoose = require('mongoose');
const Booking = require('../models/Booking');
const scrapeBookingNumbers = require('./scrape-booking-numbers');
const scrapeDetaineePage = require('./scrape-detainee-page');

function seedBookings(){
  return scrapeBookingNumbers()
    .then(bookingNumbers => bookingNumbers
      .map(bookingNumber => scrapeDetaineePage(bookingNumber)))
    .then(bookings => Booking.create(bookings))
    .catch(error => console.log(error));
}

seedBookings()
  .then(() => console.log('done'))
  .finally(() => mongoose.connection.close());
