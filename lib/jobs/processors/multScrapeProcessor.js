require('dotenv').config();
const mongoose = require('mongoose');
const superagent = require('superagent');

const RawMultDetention = require('../../models/RawMultDetention');
const { multParserQueue, closeQueues } = require('../queue');

module.exports = async(job) => {
  mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  });

  return superagent
    .get(`http://www.mcso.us/PAID/Home/Booking/${job.data.id}`)
    .then(res => RawMultDetention.create({ 
      bookingNo: job.data.id, 
      county: 'multnomah', 
      html: res.text }))
    .then(rawDetention => multParserQueue.add({ id: rawDetention._id  }, { jobId: rawDetention._id }))
    .finally(() => {
      mongoose.connection.close();
      closeQueues();
    });};





