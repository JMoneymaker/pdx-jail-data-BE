require('dotenv').config();
const mongoose = require('mongoose');
const superagent = require('superagent');
const RawClackDetention = require('../../models/RawClackDetention');

module.exports = async(job) => {
  
  mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  });

  process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0;
  return superagent
    .post('https://web3.clackamas.us/roster/detail/inmates')
    .send({ pk: job.data.id })
    .set({
      'Accept': 'application/json, text/javascript, */*; q=0.01',
      'Accept-Encoding': 'gzip, deflate, br',
      'Connection': 'keep-alive',
      'Sec-Fetch-Dest': 'empty',
      'X-Requested-With': 'XMLHttpRequest',
      'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.163 Safari/537.36',
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
    })
    .then(res => RawClackDetention.create({ 
      bookingNo: job.data.id, 
      county: 'clackamas', 
      json: res.body }))
    .finally(() => mongoose.connection.close());

};

