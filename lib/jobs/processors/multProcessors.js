const { multIdQueue, multRawDetentionQueue, multParsedDetentionQueue } = require('../queue');
const path = require('path');

multIdQueue.process(1, path.resolve('./lib/jobs/processors/multIdListProcessor.js'));
multRawDetentionQueue.process(1, path.resolve('./lib/jobs/processors/multRawDetentionProcessor.js'));
multParsedDetentionQueue.process(1, path.resolve('./lib/jobs/processors/multParsedDetentionProcessor.js'));

