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
} = require('./lib/jobs/queue.js');

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
  washQueryQueue.empty(),
  washScraperQueue.empty(),
  washParserQueue.empty()
])
  // .then(() => clackQueryQueue.add({}))
  // .then(() => console.log('Clackamas County jobs added'))
  // .then(() => multQueryQueue.add({}))
  // .then(() => console.log('Multnomah County jobs added'))
  // .then(() => multReleaseQueriesQueue.add({}))
  // .then(() => console.log('Multnomah County Relaeases jobs added'))
  // .then(() => multBookingQueriesQueue.add({}))
  // .then(() => console.log('Multnomah County Bookings jobs added'))
  // .then(() => washQueryQueue.add({}))
  // .then(() => console.log('Washington County jobs added'))
  // .catch(error => console.log('Error adding jobs', error))
  .then(() => clackQueryQueue.add({}, { repeat: { cron: '0 6 * * Sun-Sat' } }))
  .then(() => console.log('Clackamas County jobs added'))
  .then(() => multQueryQueue.add({}, { repeat: { cron: '0 6 * * Sun-Sat' } }))
  .then(() => console.log('Multnomah County jobs added'))
  .then(() => multReleaseQueriesQueue.add({}, { repeat: { cron: '0 6 * * Sun-Sat' } }))
  .then(() => console.log('Multnomah County Relaeases jobs added'))
  .then(() => multBookingQueriesQueue.add({}, { repeat: { cron: '0 6 * * Sun-Sat' } }))
  .then(() => console.log('Multnomah County Bookings jobs added'))
  .then(() => washQueryQueue.add({}, { repeat: { cron: '0 6 * * Sun-Sat' } }))
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
    washQueryQueue.close(),
    washScraperQueue.close(),
    washParserQueue.close()
  ])));







