const express = require('express');
const app = express();

app.use(express.json());

// app.use('/api/v1/scrapers', require('./routes/clackamas'));
app.use('/api/v1/dailyDetentions', require('./routes/daily-detentions'));

app.use(require('./middleware/not-found'));
app.use(require('./middleware/error'));

module.exports = app;
