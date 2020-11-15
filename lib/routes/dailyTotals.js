const { Router } = require('express');
const DailyTotal = require('../models/DailyTotal')

module.exports = Router()
.get('/', (req, res, next) => {
    DailyTotal
    .findOne()
    .then(data => res.send(data))
    .catch(next)
})