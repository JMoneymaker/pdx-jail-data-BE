const superagent = require('superagent');
const Throttle = require('superagent-throttle');

let throttle = new Throttle({
  active: true,  
  rate: 5,
  ratePer: 10000,
  concurrent: 5  
});

const scrapeDetention = bookingKey => {
  process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0;
  return superagent
    .post('https://web3.clackamas.us/roster/detail/inmates')
    .send(bookingKey)
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
    .then(response => response.body)
    .then(body => makeDetentionObject(body))
    .catch(error => console.log(error));
};

const getDateAdded = () => {
  const dateObj = new Date();
  const month = dateObj.getMonth() + 1;
  const day = dateObj.getDate();
  const year = dateObj.getFullYear();
  return (month + '/' + day + '/' + year);
};

const makeDetentionObject = body => {
  return ({
    county: 'Clackamas',
    dateAdded: getDateAdded(),
    bookingDate: body.bookdate,
    bookingNumber: body.bookno,
    swisId: body.sidno,
    fullName: body.name,
    //do something about this
    dob: body.dob,
    // ^^ that right there
    gender: body.sex,
    race: body.race,
    height: body.height,
    weight: body.weight,
    hairColor: body.hair,
    eyeColor: body.eyes,
    image: body.image,
    projectedReleaseDate: body.releasedate,
    charges: body.charges.map(charge => ({
      description: charge.charge,
      bail: charge.bail,
      status: charge.status
    }))
  });
};

module.exports = scrapeDetention;
