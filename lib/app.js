const express = require('express');
const cors = require('cors');
const app = express();

const { UI } = require('bull-board');
app.use('/bull', UI);

app.use(cors());
app.use(express.static('public'));
app.use(express.json());

// app.use('/api/v1/dailyCounts', require('./routes/dailyCounts'));
app.use('/api/v1/multnomah', require('./routes/multnomah'));
app.use('/api/v1/clackamas', require('./routes/clackamas'));
app.use('/api/v1/washington', require('./routes/washington'));

app.use(require('./middleware/not-found'));
app.use(require('./middleware/error'));

module.exports = app;
