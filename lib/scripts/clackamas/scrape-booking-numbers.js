const request = require('superagent');

const scrapeBookingNumbers = () => {
  process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0;
  return request
    .get('https://web3.clackamas.us/roster/query/inmates')
    .then(findBookingNumbers)
    .then(makeBookingKeys)
    .catch(error => console.log(error));
};

const findBookingNumbers = response => {
  return response.body.results
    .map(item => item.bookno);
};

const makeBookingKeys = bookingNumbers => {
  return bookingNumbers.map(bookingNumber => ({ pk: bookingNumber }));
};

// scrapeBookingNumbers()
//   .then((results) => console.log(results));

module.exports = scrapeBookingNumbers;


