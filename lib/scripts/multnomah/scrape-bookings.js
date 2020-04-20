const scrapeBooking = require('./scrape-booking');
const superagent = require('superagent');
require('superagent-retry-delay')(superagent);
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
    .retry(10, [2000], [401, 404])
    .then(res => {
      return res.text;
    })
    .then(res => {
      return scrapeBooking(res);
    });
};

module.exports = scrapeBookings;
