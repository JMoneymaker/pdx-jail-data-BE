const request = require('superagent');

const scrapeDetaineePage = url => {
  process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0;
  return request.post(url)
    .send({ pk: 2020700380 })
    .then(response => console.log(response))
    .catch(error => console.log(error));
};

scrapeDetaineePage('https://web3.clackamas.us/roster/detail/inmates')
  .then((results) => console.log(results));

module.exports = scrapeDetaineePage;


