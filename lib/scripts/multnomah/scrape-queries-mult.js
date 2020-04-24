const cheerio = require('cheerio');
const superagent = require('superagent');
const Throttle = require('superagent-throttle');

let throttle = new Throttle({
  active: true,  
  rate: 5,
  ratePer: 10000,
  concurrent: 5  
});

const scrapeQueriesMult = () => {
  return superagent
    .post('http://www.mcso.us/PAID/Home/SearchResults')
    .use(throttle.plugin())
    .then(res => cheerio.load(res.text))
    .then(getQueryStrings)
    .catch(error => console.log(error)); 
};
  
const getQueryStrings = html => {
  return html('tr a')
    .map((_, el) => html(el).attr('href').slice(19)).get();
};
    
// scrapeBookingNumbers()
//   .then(results => console.log(results));
       
module.exports = scrapeQueriesMult;
