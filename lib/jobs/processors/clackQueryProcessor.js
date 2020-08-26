const superagent = require('superagent');

module.exports = () => {

  process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0;
  return superagent
    .post('https://web3.clackamas.us/roster/query/inmates')
    .then(res => res.body.results.map(item => item.bookno))
    .catch(error => console.log(error));
    
};
