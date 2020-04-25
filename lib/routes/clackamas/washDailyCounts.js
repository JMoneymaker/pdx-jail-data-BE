const { Router } = require('express');
const WashDailyCount = require('../../models/WashDailyCount');

module.exports = Router() 

  .get('/', (req, res, next) => {
    WashDailyCount
      .find()
      .then(detentions => res.send(detentions))
      .catch(next);
  });
