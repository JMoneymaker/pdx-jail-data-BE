const superagent = require('superagent');
require('superagent-retry-delay')(superagent);
const Throttle = require('superagent-throttle');

let throttle = new Throttle({
  active: true,  
  rate: 5,
  ratePer: 10000,
  concurrent: 5  
});

const scrapeDetaineePage = bookingNo => {
  process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0;
  return superagent
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
    .use(throttle.plugin())
    .retry(10, [2000], [401, 404])
    .then(response => response.body)
    .then(body => makeBookingObject(body))
    .then(results => console.log(results))
    .catch(error => console.log(error));
};

const makeBookingObject = body => {
  return ({
    bookingNumber: body.bookno,
    bookingDate: body.bookdate,
    swisId: body.sidno,
    fullName: body.name,
    dob: body.dob,
    height: body.height,
    weight: body.weight,
    gender: body.sex,
    race: body.race,
    hairColor: body.hair,
    eyeColor: body.eyes,
    image: body.image,
    releaseDate: body.releasedate,
    charges: body.charges.map(charge => ({
      description: charge.charge,
      bail: charge.bail,
      status: charge.status
    }))
  });
};

module.exports = scrapeDetaineePage;
