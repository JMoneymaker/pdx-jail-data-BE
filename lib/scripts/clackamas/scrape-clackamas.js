const superagent = require('superagent');
const Throttle = require('superagent-throttle');
const { getAge, makeDate, numifyBail, getDescription, getLaw, makeTimeless } = require('../../utils/dataShapers');
const { reKeyRace } = require('../../utils/reKeyRace');


let throttle = new Throttle({
  active: true,  
  rate: 5,
  ratePer: 10000,
  concurrent: 5  
});

const scrapeClackamas = query => {
  process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0;
  return superagent
    .post('https://web3.clackamas.us/roster/detail/inmates')
    .send(query)
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
    .retry(3)
    .then(response => response.body)
    .then(body => makeDetentionObject(body));
};

const makeDetentionObject = body => {
  return ({
    county: 'Clackamas',
    dateAdded: makeTimeless(),
    bookingDate: makeDate(body.bookdate),
    projectedReleaseDate: makeDate(body.releasedate),
    bookingNumber: body.bookno,
    swisId: body.sidno.trim(),
    fullName: body.name.trim(),
    age: getAge(body.dob),
    dob: makeDate(body.dob),
    gender: body.sex,
    race: reKeyRace(body.race),
    height: body.height,
    weight: body.weight,
    hairColor: body.hair,
    eyeColor: body.eyes,
    image: body.image,
    charges: body.charges.map(charge => ({
      description: getDescription(charge.charge),
      category: getLaw(charge.charge),
      bail: numifyBail(charge.bail),
      status: charge.status
    }))
  });
};

// scrapeClackamas({ pk: 2020100215 })
//   .then(console.log);

module.exports = scrapeClackamas;
