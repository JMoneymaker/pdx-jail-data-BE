const cheerio = require('cheerio');
const superagent = require('superagent');
const Throttle = require('superagent-throttle');

let throttle = new Throttle({
  active: true,  
  rate: 5,
  ratePer: 10000,
  concurrent: 5  
});

const scrapeQueriesWash = () => {
  return superagent
    .post('https://www.co.washington.or.us/Sheriff/Jail/who-is-in-custody.cfm')
    .use(throttle.plugin())
    .then(res => cheerio.load(res.text))
    .then(getQueryStrings)
    .catch(error => console.log(error)); 
};
  
const getQueryStrings = html => {
  return html('.inmatenav a')
    .map((_, el) => html(el).attr('href').slice(-8)).get();
};
    
// scrapeQueriesWash()
//   .then(results => console.log(results));
       
module.exports = scrapeQueriesWash;
