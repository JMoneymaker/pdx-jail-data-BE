const express = require('express');
const app = express();

app.use(express.json());

// app.use('/api/v1/scrapers', require('./routes/clackamas'));
app.use('/api/v1/clackDailyDetentions', require('./routes/clackamas/clackScrapes'));
app.use('/api/v1/clackDailyCounts', require('./routes/clackamas/clackDailyCounts'));
app.use('/api/v1/washDailyCounts', require('./routes/washington/washDailyCounts'));
app.use('/api/v1/multDailyCounts', require('./routes/multnomah/multDailyCounts'));



app.use(require('./middleware/not-found'));
app.use(require('./middleware/error'));

module.exports = app;
