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

