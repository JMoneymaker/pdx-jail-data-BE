const request = require('superagent');
const Throttle = require('superagent-throttle');

let throttle = new Throttle({
  active: true,  
  rate: 5,
  ratePer: 10000,
  concurrent: 5  
});

const scrapeQueriesClack = () => {
  process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0;
  return request
    .get('https://web3.clackamas.us/roster/query/inmates')
    .use(throttle.plugin())
    .then(findBookingNumbers)
    .then(makeQueryKeys)
    .catch(error => console.log(error));
};

const findBookingNumbers = response => {
  return response.body.results
    .map(item => item.bookno);
};

const makeQueryKeys = bookingNumbers => {
  return bookingNumbers.map(bookingNumber => ({ pk: bookingNumber }));
};

// scrapeQueriesClack()
//   .then((results) => console.log(results));

module.exports = scrapeQueriesClack;


