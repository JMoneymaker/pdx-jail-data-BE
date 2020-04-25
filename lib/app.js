const express = require('express');
const app = express();

app.use(express.json());

// app.use('/api/v1/scrapers', require('./routes/clackamas'));
app.use('/api/v1/clackDailyDetentions', require('./routes/clackamas/clackScrapes'));
app.use('/api/v1/dailyCounts', require('./routes/dailyCounts'));


app.use(require('./middleware/not-found'));
app.use(require('./middleware/error'));

module.exports = app;
