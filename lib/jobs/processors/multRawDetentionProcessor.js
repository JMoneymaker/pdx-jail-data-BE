require('dotenv').config();
const mongoose = require('mongoose');

const superagent = require('superagent');
const RawDetention = require('../../models/RawDetention');
const { multParsedDetentionQueue } = require('../queue');

module.exports = async(job) => {
  mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  });

  return superagent
    .get(`http://www.mcso.us/PAID/Home/Booking/${job.data.id}`)
    .then(res => RawDetention.create({ 
      bookingNo: job.data.id, 
      county: 'multnomah', 
      html: res.text }))
    .then(rawDetention => multParsedDetentionQueue.add({ id: rawDetention._id  }, { jobId: rawDetention._id }))
    .finally(() => mongoose.connection.close());
};





