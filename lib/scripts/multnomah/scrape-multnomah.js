const cheerio = require('cheerio');
const superagent = require('superagent');
const Throttle = require('superagent-throttle');
const { makeDate, makeDateWithTime, numifyBail, makeTimeless } = require('../../utils/dataShapers');
const { reKeyRace } = require('../../utils/reKeyRace');

let throttle = new Throttle({
  active: true,  
  rate: 5,
  ratePer: 1000,
  concurrent: 5  
});

const scrapeMultnomah = query => {
  const url = `http://www.mcso.us/PAID/Home/Booking/${query}`;
  return superagent
    .get(url)
    .use(throttle.plugin())
    .retry(3)
    .then(response => cheerio.load(response.text))
    .then(html => makeDetentionObject(html));
};

const makeDetentionObject = html => {
  const labelFinder = label => html(`label[for="${label}"]`).parent().next().text().trim();
  return ({
    county: 'Multnomah',
    dateAdded: makeTimeless(),
    bookingDate: makeDateWithTime(labelFinder('BookingDateTime')),
    projectedReleaseDate: makeDate(labelFinder('ProjectedReleaseDateTime')),
    bookingNumber: html('#BookingNumber').attr('value'),
    swisId: labelFinder('Person_SwisID'),
    fullName: labelFinder('Person_FullName'),
    age: labelFinder('Person_Age'),
    gender: labelFinder('Person_Gender'),
    race: reKeyRace(labelFinder('Person_Race')),
    height: labelFinder('Person_Height'),
    weight: labelFinder('Person_Weight'),
    hairColor: labelFinder('Person_HairColor'),
    eyeColor: labelFinder('Person_EyeColor'),
    arrestingAgency: labelFinder('ArrestingAgency'),
    assignedFacility: labelFinder('AssignedFacility'),
    charges: html('#charge-info ol li').get()
      .map((el) => {
        const caseFinder = htmlTag => html(el).parent().parent().prev().find(htmlTag).text();
        const chargeFinder = htmlTag => html(el).find(htmlTag).text();
        const [description, category] = chargeFinder('.charge-description-display').split('(');
        return ({
          caseNumber: caseFinder('.court-case-number > b'),
          daCaseNumber: caseFinder('.da-case-number > b'),
          citationNumber: caseFinder('.citation-number > b'),
          description: description.toString().trim(),
          category: category.toString().trim().slice(0, -1),
          bail: numifyBail(chargeFinder('.charge-bail-value')),
          status: chargeFinder('.charge-status-value')
        });
      })
  });  
};

// scrapeMultnomah(1489480)
//   .then(console.log);

module.exports = scrapeMultnomah;
