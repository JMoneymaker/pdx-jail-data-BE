const scrapeBooking = require('./scrape-booking');
const superagent = require('superagent');
const Throttle = require('superagent-throttle');

let throttle = new Throttle({
  active: true,
  rate: 5,
  ratePer: 10000, 
  concurrent: 5
});

const scrapeBookings = bookingNumber => {

  const url = `http://www.mcso.us/PAID/Home/Booking/${bookingNumber}`;

  return superagent
    .get(url)
    .use(throttle.plugin())
    .then(res => res.text)
    .then(res => scrapeBooking(res));
};

module.exports = scrapeBookings;
