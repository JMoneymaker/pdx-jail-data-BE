const cheerio = require('cheerio');
const superagent = require('superagent');

module.exports = () => {

  return superagent
    .post('https://www.co.washington.or.us/Sheriff/Jail/who-is-in-custody.cfm')
    .then(res => cheerio.load(res.text))
    .then(html => html('.inmatenav a')
      .map((_, el) => html(el).attr('href')
        .slice(-1)).get())
    .catch(error => console.log(error));
    
};
