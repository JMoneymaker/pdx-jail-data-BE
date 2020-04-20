require('dotenv').config();
require('../../utils/connect')();
const mongoose = require('mongoose');

const DailyDetentions = require('../../models/DailyDetentions');
const scrapeBookingNumbers = require('./scrape-booking-numbers');
const scrapeBookings = require('./scrape-bookings');


const seedDatabase = async() => {
  const bookingNumbers = await scrapeBookingNumbers();
  await Promise.all(bookingNumbers.map(async(bookingNumber) => {
    const bookingObject = await scrapeBookings(bookingNumber);
    const dailyDetentions = await DailyDetentions.create(bookingObject);
    return dailyDetentions;
  }));
};

seedDatabase()
  .then(() => console.log('done'))
  .finally(() => mongoose.connection.close());
