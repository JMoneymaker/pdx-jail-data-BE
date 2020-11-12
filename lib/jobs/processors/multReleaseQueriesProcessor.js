const cheerio = require('cheerio');
const superagent = require('superagent');
const { multReleaseScraperQueue } = require('../queue');

module.exports = () => {
  return superagent
    .post('http://www.mcso.us/PAID/Home/SearchResults')
    .send({ searchType: 1 })
    .then(res => cheerio.load(res.text))
    .then(html => html('tr a')
      .map((_, el) => html(el).attr('href').slice(-15)).get())
    .then(idArray => Promise.all(idArray
      .map(id => multReleaseScraperQueue.add({ id }, { jobId: id }))))
    .catch(error => console.log(error)); 
};

