const request = require('superagent');
const cheerio = require('cheerio');
const superagent = require('superagent');
const Throttle = require('superagent-throttle');

let throttle = new Throttle({
  active: true,  
  rate: 5,
  ratePer: 10000,
  concurrent: 5  
});

const getClackQueries = () => {
  process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0;
  return request
    .get('https://web3.clackamas.us/roster/query/inmates')
    .use(throttle.plugin())
    .then(res => res.body.results.map(item => item.bookno))
    .then(bookNos => bookNos.map(bookNo => ({ pk: bookNo })))
    .catch(error => console.log(error));
};

const getMultQueries = () => {
  return superagent
    .post('http://www.mcso.us/PAID/Home/SearchResults')
    .use(throttle.plugin())
    .then(res => cheerio.load(res.text))
    .then(html => html('tr a')
      .map((_, el) => html(el).attr('href')
        .slice(19)).get())
    .catch(error => console.log(error)); 
};

const getWashQueries = () => {
  return superagent
    .post('https://www.co.washington.or.us/Sheriff/Jail/who-is-in-custody.cfm')
    .use(throttle.plugin())
    .then(res => cheerio.load(res.text))
    .then(html => html('.inmatenav a')
      .map((_, el) => html(el).attr('href')
        .slice(-8)).get())
    .catch(error => console.log(error)); 
};

module.exports = { 
  getClackQueries,
  getMultQueries,
  getWashQueries 
};


