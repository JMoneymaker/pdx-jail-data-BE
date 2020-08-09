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
  multReleaseQueriesQueue.empty(), 
  multReleaseScraperQueue.empty(), 
  multReleaseParserQueue.empty(), 
  multBookingQueriesQueue.empty(),
  multBookingScraperQueue.empty(),
  multBookingParserQueue.empty(),
  washScraperQueue.empty(),
  washParserQueue.empty()
])
  .then(() => clackQueryQueue.add({}, { repeat: { cron: '0 6 * * *' } }))
  .then(() => console.log('Clackamas County jobs added'))
  .then(() => multQueryQueue.add({}, { repeat: { cron: '0 6 * * *' } }))
  .then(() => console.log('Multnomah County jobs added'))
  .then(() => multReleaseQueriesQueue.add({}, { repeat: { cron: '0 6 * * *' } }))
  .then(() => console.log('Multnomah County Relaeases jobs added'))
  .then(() => multBookingQueriesQueue.add({}, { repeat: { cron: '0 6 * * *' } }))
  .then(() => console.log('Multnomah County Bookings jobs added'))
  .then(() => Promise.all(washQueries.map(id => washScraperQueue.add({ id }, { repeat: { cron: '0 6 * * *' } }))))
  .then(() => console.log('Washington County jobs added'))
  .catch(error => console.log('Error adding jobs', error))
  .finally(() => Promise.all(([
    clackQueryQueue.close(),
    clackScraperQueue.close(),
    clackParserQueue.close(),
    multQueryQueue.close(),
    multScraperQueue.close(),
    multParserQueue.close(),
    multReleaseQueriesQueue.close(), 
    multReleaseScraperQueue.close(), 
    multReleaseParserQueue.close(),
    multBookingQueriesQueue.close(),
    multBookingScraperQueue.close(),
    multBookingParserQueue.close(), 
    washScraperQueue.close(),
    washParserQueue.close()
  ])));





