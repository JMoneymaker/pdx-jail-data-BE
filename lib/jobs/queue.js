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

const clackQueryQueue = new Queue('clack query scraper', process.env.REDIS_URL);
const clackScraperQueue = new Queue('clack detention scraper', process.env.REDIS_URL, options({ max: 100, durationInMinutes: 1 }));
const clackParserQueue = new Queue('clack detention parser', process.env.REDIS_URL, options({ max: 100, durationInMinutes: 1 }));

const multQueryQueue = new Queue('mult query scraper', process.env.REDIS_URL);
const multScraperQueue = new Queue('mult detention scraper', process.env.REDIS_URL, options({ max: 100, durationInMinutes: 1 }));
const multParserQueue = new Queue('mult detention parser', process.env.REDIS_URL, options({ max: 100, durationInMinutes: 1 }));

const multReleaseQueriesQueue = new Queue('mult release queries scraper', process.env.REDIS_URL);
const multReleaseScraperQueue = new Queue('mult release scraper', process.env.REDIS_URL, options({ max: 100, durationInMinutes: 1 }));
const multReleaseParserQueue = new Queue('mult release parser', process.env.REDIS_URL, options({ max: 100, durationInMinutes: 1 }));

const washScraperQueue = new Queue('wash detention scraper', process.env.REDIS_URL, options({ max: 100, durationInMinutes: 1 }));
const washParserQueue = new Queue('wash detention parser', process.env.REDIS_URL, options({ max: 100, durationInMinutes: 1 }));

setQueues([
  clackQueryQueue, 
  clackScraperQueue, 
  clackParserQueue,
  multQueryQueue, 
  multScraperQueue, 
  multParserQueue, 
  multReleaseQueriesQueue, 
  multReleaseScraperQueue, 
  multReleaseParserQueue, 
  washScraperQueue, 
  washParserQueue
]);

module.exports = {
  clackQueryQueue,
  clackScraperQueue,
  clackParserQueue,
  multQueryQueue,
  multScraperQueue,
  multParserQueue,
  multReleaseQueriesQueue, 
  multReleaseScraperQueue, 
  multReleaseParserQueue, 
  washScraperQueue,
  washParserQueue
};


