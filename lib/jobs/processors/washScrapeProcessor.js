require('dotenv').config();
const mongoose = require('mongoose');

const superagent = require('superagent');
const RawWashDetention = require('../../models/RawWashDetention');
const { washParserQueue } = require('../queue');

module.exports = async(job) => {
  mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  });

  return superagent
    .get(`https://www.co.washington.or.us/Sheriff/Jail/who-is-in-custody.cfm?alpha=${job.data.id}`)
    .then(res => RawWashDetention.create({ 
      letter: job.data.id, 
      county: 'washington', 
      html: res.text }))
    .then(rawDetention => washParserQueue.add({ id: rawDetention._id  }, { jobId: rawDetention._id }))
    .finally(() => mongoose.connection.close());
};





