require('dotenv').config();

const Queue = require ('bull');
const { setQueues } = require('bull-board');

// const options = ({ max, durationInMinutes, attempts = 1 }) => (
//   {
//     limiter: {
//       max,
//       duration: 1000 * 60 * durationInMinutes
//     },
//     defaultJobOptions: {
//       attempts,
//       removeOnComplete: true,
//       removeOnFail: 100
//     }
//   }
// );

const multIdQueue = new Queue('multnomah id list scraper', process.env.REDIS_URL);

setQueues(multIdQueue);

module.exports = {
  multIdQueue
};


