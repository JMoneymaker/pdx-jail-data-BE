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
      removeOnComplete: true
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

const multBookingQueriesQueue = new Queue('mult booking queries scraper', process.env.REDIS_URL);
const multBookingScraperQueue = new Queue('mult booking scraper', process.env.REDIS_URL, options({ max: 100, durationInMinutes: 1 }));
const multBookingParserQueue = new Queue('mult booking parser', process.env.REDIS_URL, options({ max: 100, durationInMinutes: 1 }));

const washQueryQueue = new Queue('wash query scraper', process.env.REDIS_URL);
const washScraperQueue = new Queue('wash detention scraper', process.env.REDIS_URL, options({ max: 100, durationInMinutes: 1 }));
const washParserQueue = new Queue('wash detention parser', process.env.REDIS_URL, options({ max: 100, durationInMinutes: 1 }));

const queues = [
  clackQueryQueue, 
  clackScraperQueue, 
  clackParserQueue,
  multQueryQueue, 
  multScraperQueue, 
  multParserQueue, 
  multReleaseQueriesQueue, 
  multReleaseScraperQueue, 
  multReleaseParserQueue, 
  multBookingQueriesQueue,
  multBookingScraperQueue,
  multBookingParserQueue,
  washQueryQueue, 
  washScraperQueue, 
  washParserQueue
];

setQueues(queues);

const closeQueues = () => queues.map(queue => queue.close());

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
  multBookingQueriesQueue,
  multBookingScraperQueue,
  multBookingParserQueue, 
  washQueryQueue, 
  washScraperQueue,
  washParserQueue,
  closeQueues
};


