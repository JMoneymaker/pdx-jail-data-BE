const request = require('superagent');

// const bookingNo = { pk: 2020700380 };

const scrapeDetaineePage = bookingNo => {
  process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0;
  return request
    .post('https://web3.clackamas.us/roster/detail/inmates')
    .send(bookingNo)
    .set({
      'Accept': 'application/json, text/javascript, */*; q=0.01',
      'Accept-Encoding': 'gzip, deflate, br',
      'Connection': 'keep-alive',
      'Sec-Fetch-Dest': 'empty',
      'X-Requested-With': 'XMLHttpRequest',
      'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.163 Safari/537.36',
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
    })
    .then(response => response.body)
    .catch(error => console.log(error));
};

// scrapeDetaineePage(bookingNo)
//   .then((results) => console.log(results));

module.exports = scrapeDetaineePage;


