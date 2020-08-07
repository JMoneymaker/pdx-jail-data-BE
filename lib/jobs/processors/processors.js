const { 
  clackQueryQueue, 
  clackScraperQueue, 
  clackParserQueue,
  multQueryQueue, 
  multScraperQueue, 
  multParserQueue, 
  washScraperQueue, 
  washParserQueue  
} = require('../queue');

const path = require('path');

clackQueryQueue.process(1, path.resolve('./lib/jobs/processors/clackQueryProcessor.js'));
clackScraperQueue.process(1, path.resolve('./lib/jobs/processors/clackScrapeProcessor.js'));
clackParserQueue.process(1, path.resolve('./lib/jobs/processors/clackParseProcessor.js'));

multQueryQueue.process(1, path.resolve('./lib/jobs/processors/multQueryProcessor.js'));
multScraperQueue.process(1, path.resolve('./lib/jobs/processors/multScrapeProcessor.js'));
multParserQueue.process(1, path.resolve('./lib/jobs/processors/multParseProcessor.js'));

washScraperQueue.process(1, path.resolve('./lib/jobs/processors/washScrapeProcessor.js'));
washParserQueue.process(1, path.resolve('./lib/jobs/processors/washParseProcessor.js'));

