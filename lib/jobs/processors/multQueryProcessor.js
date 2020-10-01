const cheerio = require('cheerio');
const superagent = require('superagent');
const { multScraperQueue } = require('../queue');

module.exports = () => {
  return superagent
    .post('http://www.mcso.us/PAID/Home/SearchResults')
    .then(res => cheerio.load(res.text))
    .then(html => html('tr a')
      .map((_, el) => html(el).attr('href')
        .slice(19)).get())
    .then(idArray => Promise.all(idArray
      .map(id => multScraperQueue.add({ id }, { jobId: id }))))
    .catch(error => console.log(error)); 
};
