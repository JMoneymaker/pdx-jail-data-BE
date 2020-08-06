const cheerio = require('cheerio');
const superagent = require('superagent');
const { rawMultDetentionQueue } = require('../queue');


module.exports = async() => {
  return superagent
    .post('http://www.mcso.us/PAID/Home/SearchResults')
    .then(res => cheerio.load(res.text))
    .then(html => html('tr a')
      .map((_, el) => html(el).attr('href')
        .slice(19)).get())
    .then(idArray => idArray
      .forEach(id => rawMultDetentionQueue
        .add({ id }, { jobId: id })))
    .catch(error => console.log(error)); 
};


