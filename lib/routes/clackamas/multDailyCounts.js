const { Router } = require('express');
const MultDailyCount = require('../../models/MultDailyCount');

module.exports = Router() 

  .get('/', (req, res, next) => {
    MultDailyCount
      .find()
      .then(detentions => res.send(detentions))
      .catch(next);
  });
