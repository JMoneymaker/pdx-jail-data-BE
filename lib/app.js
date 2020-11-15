const express = require('express');
const notFound = require('./middleware/not-found');
const cors = require('cors');
const app = express();

const { UI } = require('bull-board');
app.use(express.static('public'));

app.use('/bull', (req, res, next) => {
  const { pw } = req.query;
  if(pw === process.env.BULL_PASSWORD || /\/.+/.test(req.path)) return UI(req, res, next);
  return notFound(req, res, next);
});

app.use(cors());
app.use(express.json());

// app.use('/api/v1/dailyCounts', require('./routes/dailyCounts'));
app.use('/api/v1/multnomah', require('./routes/multnomah'));
app.use('/api/v1/clackamas', require('./routes/clackamas'));
app.use('/api/v1/washington', require('./routes/washington'));
app.use('/api/v1/dailyTotals', require('./routes/dailyTotals'));

app.use(notFound);
app.use(require('./middleware/error'));

module.exports = app;
