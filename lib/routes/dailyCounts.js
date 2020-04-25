const { Router } = require('express');
const DailyCount = require('../../models/DailyCount');

module.exports = Router() 

  .get('/', (req, res, next) => {
    DailyCount
      .find()
      .then(detentions => res.send(detentions))
      .catch(next);
  });
