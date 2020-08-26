const { 
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
} = require('../queue');

const path = require('path');

//Clackamas County detentions(all)
clackQueryQueue.process(1, path.resolve('./lib/jobs/processors/clackQueryProcessor.js'));
clackScraperQueue.process(1, path.resolve('./lib/jobs/processors/clackScrapeProcessor.js'));
clackParserQueue.process(1, path.resolve('./lib/jobs/processors/clackParseProcessor.js'));

//Multnomah County detentions(all)
multQueryQueue.process(1, path.resolve('./lib/jobs/processors/multQueryProcessor.js'));
multScraperQueue.process(1, path.resolve('./lib/jobs/processors/multScrapeProcessor.js'));
multParserQueue.process(1, path.resolve('./lib/jobs/processors/multParseProcessor.js'));

//Multnomah County releases(last 7 days)
multReleaseQueriesQueue.process(1, path.resolve('./lib/jobs/processors/multReleaseQueriesProcessor.js'));
multReleaseScraperQueue.process(1, path.resolve('./lib/jobs/processors/multReleaseScraperProcessor.js'));
multReleaseParserQueue.process(1, path.resolve('./lib/jobs/processors/multReleaseParserProcessor.js'));

//Multnomah County bookings(last 7 days)
multBookingQueriesQueue.process(1, path.resolve('./lib/jobs/processors/multBookingQueriesProcessor.js'));
multBookingScraperQueue.process(1, path.resolve('./lib/jobs/processors/multBookingScraperProcessor.js'));
multBookingParserQueue.process(1, path.resolve('./lib/jobs/processors/multBookingParserProcessor.js'));

//Washington County detentions(all)
washQueryQueue.process(1, path.resolve('./lib/jobs/processors/washQueryProcessor.js'));
washScraperQueue.process(1, path.resolve('./lib/jobs/processors/washScrapeProcessor.js'));
washParserQueue.process(1, path.resolve('./lib/jobs/processors/washParseProcessor.js'));


//Queue management
clackQueryQueue.on('completed', (job) => {
  Promise.all(job.returnvalue
    .map(id => clackScraperQueue.add({ id }, { jobId: id })));
});

clackScraperQueue.on('completed', (job) => {
  clackParserQueue.add({ id: job.returnvalue._id  }, { jobId: job.returnvalue._id });
});

multQueryQueue.on('completed', (job) => {
  Promise.all(job.returnvalue
    .map(id => multScraperQueue.add({ id }, { jobId: id })));
});

multScraperQueue.on('completed', (job) => {
  multParserQueue.add({ id: job.returnvalue._id  }, { jobId: job.returnvalue._id });
});

washQueryQueue.on('completed', (job) => {
  Promise.all(job.returnvalue
    .map(id => washScraperQueue.add({ id }, { jobId: id })));
});

washScraperQueue.on('completed', (job) => {
  washParserQueue.add({ id: job.returnvalue._id  }, { jobId: job.returnvalue._id });
});

multBookingQueriesQueue.on('completed', (job) => {
  Promise.all(job.returnvalue
    .map(id => multBookingScraperQueue.add({ id }, { jobId: id })));
});

multBookingScraperQueue.on('completed', (job) => {
  multBookingParserQueue.add({ id: job.returnvalue._id  }, { jobId: job.returnvalue._id });
});

multReleaseQueriesQueue.on('completed', (job) => {
  Promise.all(job.returnvalue
    .map(id => multReleaseScraperQueue.add({ id }, { jobId: id })));
});

multReleaseScraperQueue.on('completed', (job) => {
  multReleaseParserQueue.add({ id: job.returnvalue._id  }, { jobId: job.returnvalue._id });
});

