const { multIdQueue, multRawDetentionQueue, multParsedDetentionQueue } = require('./lib/jobs/queue.js');


Promise.all([
  multIdQueue.empty(),
  multRawDetentionQueue.empty(),
  multParsedDetentionQueue.empty()
])
  .then(() => multIdQueue.add({}))
  .then(() => console.log('Jobs added'))
  .catch(error => console.log('Error adding jobs', error))
  .finally(() => Promise.all(([
    multIdQueue.close(),
    multRawDetentionQueue.close(),
    multParsedDetentionQueue.close()
  ])));





