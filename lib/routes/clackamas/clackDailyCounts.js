const { Router } = require('express');
const ClackDailyCount = require('../../models/ClackDailyCount');

module.exports = Router() 

  .get('/', (req, res, next) => {
    ClackDailyCount
      .find()
      .then(detentions => res.send(detentions))
      .catch(next);
  });
