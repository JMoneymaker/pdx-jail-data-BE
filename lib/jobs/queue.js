require('dotenv').config();

const Queue = require ('bull');
const { setQueues } = require('bull-board');

const options = ({ max, durationInMinutes, attempts = 1 }) => (
  {
    limiter: {
      max,
      duration: 1000 * 60 * durationInMinutes
    },
    defaultJobOptions: {
      attempts,
      removeOnComplete: true,
      removeOnFail: 100
    }
  }
);

const multIdQueue = new Queue('multnomah id list scraper', process.env.REDIS_URL);
const multRawDetentionQueue = new Queue('mult raw detention scraper', process.env.REDIS_URL, options({ max: 100, durationInMinutes: 1 }));
const multParsedDetentionQueue = new Queue('mult detention parser', process.env.REDIS_URL, options({ max: 100, durationInMinutes: 1 }));

setQueues(multIdQueue);

module.exports = {
  multIdQueue,
  multRawDetentionQueue,
  multParsedDetentionQueue
};


