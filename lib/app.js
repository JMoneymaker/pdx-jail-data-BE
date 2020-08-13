require('dotenv').config();
const express = require('express');
const notFound = require('./middleware/not-found');
const cors = require('cors');
const app = express();

const { UI } = require('bull-board');

app.use('/bull', (req, res, next) => {
  const { pw } = req.query;
  if(pw === process.env.BULL_PASSWORD) return next();
  return notFound(req, res, next);
}, require(UI));
  
app.use(cors());
app.use(express.static('public'));
app.use(express.json());

// app.use('/api/v1/dailyCounts', require('./routes/dailyCounts'));
app.use('/api/v1/multnomah', require('./routes/multnomah'));
app.use('/api/v1/clackamas', require('./routes/clackamas'));
app.use('/api/v1/washington', require('./routes/washington'));

app.use(require(notFound));
app.use(require('./middleware/error'));

module.exports = app;
