const cheerio = require('cheerio');
const superagent = require('superagent');
const { washScraperQueue, closeQueues } = require('../queue');

module.exports = () => {
  return superagent
    .post('https://www.co.washington.or.us/Sheriff/Jail/who-is-in-custody.cfm')
    .then(res => cheerio.load(res.text))
    .then(html => html('.inmatenav a')
      .map((_, el) => html(el).attr('href')
        .slice(-1)).get())
    .then(idArray => Promise.all(idArray
      .map(id => washScraperQueue.add({ id }, { jobId: id }))))
    .catch(error => console.log(error))
    .finally(() => {
      closeQueues();
    });

};
