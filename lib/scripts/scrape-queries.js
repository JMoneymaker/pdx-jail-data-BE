const cheerio = require('cheerio');
const superagent = require('superagent');

const getClackQueries = () => {
  process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0;
  return superagent
    .get('https://web3.clackamas.us/roster/query/inmates')
    .then(res => res.body.results.map(item => item.bookno))
    .then(bookNos => bookNos.map(bookNo => ({ pk: bookNo })))
    .catch(error => console.log(error));
};

const getMultQueries = () => {
  return superagent
    .post('http://www.mcso.us/PAID/Home/SearchResults')
    .then(res => cheerio.load(res.text))
    .then(html => html('tr a')
      .map((_, el) => html(el).attr('href')
        .slice(19)).get())
    .catch(error => console.log(error)); 
};

const washQueries = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

module.exports = { 
  getClackQueries,
  getMultQueries,
  washQueries
};
