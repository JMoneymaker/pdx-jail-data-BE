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
  washParserQueue,  
  closeQueues
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
  // .then(() => clackQueryQueue.getRepeatableJobs())
  // .then(console.log)
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
  .then(() => clackQueryQueue.add({}, { repeat: { cron: '0 14 * * *' } }))
  .then(() => console.log('Clackamas County jobs added'))
  .then(() => washQueryQueue.add({}, { repeat: { cron: '0 14 * * *' } }))
  .then(() => console.log('Washington County jobs added'))
  .then(() => multQueryQueue.add({}, { repeat: { cron: '0 14 * * *' } }))
  .then(() => console.log('Multnomah County jobs added'))
  .then(() => multReleaseQueriesQueue.add({}, { repeat: { cron: '0 14 * * *' } }))
  .then(() => console.log('Multnomah County Relaeases jobs added'))
  .then(() => multBookingQueriesQueue.add({}, { repeat: { cron: '0 14 * * *' } }))
  .then(() => console.log('Multnomah County Bookings jobs added'))
  .catch(error => console.log('Error adding jobs', error))
  .finally(() => Promise.all(
    closeQueues()
  ));







