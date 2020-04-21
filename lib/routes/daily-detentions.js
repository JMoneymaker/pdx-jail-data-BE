const { Router } = require('express');
const DailyDetention = require('../models/DailyDetention');

module.exports = Router() 

  .get('/', (req, res, next) => {
    DailyDetention
      .find()
      .then(detentions => res.send(detentions))
      .catch(next);
  });
