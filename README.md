Code snippets

const matchDate = '2020-05-28T00:00:00.000+00:00';
  return this.aggregate([
    [
      {
        '$match': {
          'dateAdded': {
            '$eq': new Date(matchDate)
          }
        }
      }