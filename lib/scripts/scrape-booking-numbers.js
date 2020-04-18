const request = require('superagent');
const cheerio = require('cheerio');

const scrapeBookingNumbers = url => {
  return request.get(url)
    .then(response => cheerio.load(response.text))
    .then(findBookingNumbers)
    // .then(makeDetaineeLinks)
    .catch(error => console.log(error));
};

const findBookingNumbers = html => {
  return html('.detail-link')
    .map((_, el) => html(el).attr('data-index')).get;
};


scrapeBookingNumbers('https://web3.clackamas.us/roster/?q=#inmates')
  .then(results => console.log(results));

module.exports = scrapeBookingNumbers;


