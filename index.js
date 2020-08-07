const {
  clackQueryQueue, 
  clackScraperQueue, 
  clackParserQueue, 
  multQueryQueue, 
  multScraperQueue, 
  multParserQueue, 
  washScraperQueue, 
  washParserQueue  
} = require('./lib/jobs/queue.js');

const washQueries = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];

Promise.all([
  clackQueryQueue.empty(),
  clackScraperQueue.empty(),
  clackParserQueue.empty(),
  multQueryQueue.empty(),
  multScraperQueue.empty(),
  multParserQueue.empty(),
  washScraperQueue.empty(),
  washParserQueue.empty()
])
  .then(() => clackQueryQueue.add({}))
  .then(() => console.log('Clackamas County jobs added'))
  .then(() => multQueryQueue.add({}))
  .then(() => console.log('Multnomah County jobs added'))
  .then(() => Promise.all(washQueries.map(id => washScraperQueue.add({ id }))))
  .then(() => console.log('Washington County jobs added'))
  .catch(error => console.log('Error adding jobs', error))
  .finally(() => Promise.all(([
    clackQueryQueue.close(),
    clackScraperQueue.close(),
    clackParserQueue.close(),
    multQueryQueue.close(),
    multScraperQueue.close(),
    multParserQueue.close(),
    washScraperQueue.close(),
    washParserQueue.close()
  ])));





