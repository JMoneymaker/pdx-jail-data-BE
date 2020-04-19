const request = require('superagent');

const scrapeBookingNumbers = url => {
  process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0;
  return request.get(url)
    .then(findBookingNumbers)
    .catch(error => console.log(error));
};

const findBookingNumbers = response => {
  return response.body.results
    .map(item => item.bookno);
};

scrapeBookingNumbers('https://web3.clackamas.us/roster/query/inmates')
  .then((results) => console.log(results));

module.exports = scrapeBookingNumbers;


