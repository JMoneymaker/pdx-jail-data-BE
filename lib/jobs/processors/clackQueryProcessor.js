const superagent = require('superagent');
const { clackScraperQueue } = require('../queue');

module.exports = () => {
  process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0;
  return superagent
    .post('https://web3.clackamas.us/roster/query/inmates')
    .then(res => res.body.results.map(item => item.bookno))
    .then(idArray => Promise.all(idArray
      .map(id => clackScraperQueue.add({ id }, { jobId: id }))))
    .catch(error => console.log(error)); 
};
