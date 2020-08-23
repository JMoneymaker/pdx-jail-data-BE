const cheerio = require('cheerio');
const superagent = require('superagent');

const scrapeWashington = query => {
  return superagent
    .get(`https://www.co.washington.or.us/Sheriff/Jail/who-is-in-custody.cfm?alpha=${query}`)
    .then(response => cheerio.load(response.text))
    .then(html => makeDetentionObject(html));
};

const makeDetentionObject = html => {
  return html('.inmates li').get()
    .map((el) => el);
};
       
module.exports = scrapeWashington;
