const { multIdQueue } = require('../queue.js');
const path = require('path');

multIdQueue.process(1, path.resolve('./lib/jobs/processors/multIdListProcessor.js'));
