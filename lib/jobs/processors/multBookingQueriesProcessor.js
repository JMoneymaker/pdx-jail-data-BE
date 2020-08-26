const cheerio = require('cheerio');
const superagent = require('superagent');

module.exports = () => {
  return superagent
    .post('http://www.mcso.us/PAID/Home/SearchResults')
    .send({ searchType: 3 })
    .then(res => cheerio.load(res.text))
    .then(html => html('tr a')
      .map((_, el) => html(el).attr('href').slice(-7)).get())
    .catch(error => console.log(error));
};

