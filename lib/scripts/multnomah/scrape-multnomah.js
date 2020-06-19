const cheerio = require('cheerio');
const superagent = require('superagent');
const Throttle = require('superagent-throttle');
const { makeDate, makeDateWithTime, numifyBail, makeTimeless } = require('../../utils/dataShapers');

let throttle = new Throttle({
  active: true,  
  rate: 5,
  ratePer: 1000,
  concurrent: 5  
});

const scrapeMultnomah = () => {
  const url = 'http://www.mcso.us/PAID/Home/Booking/1504929';
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
    race: labelFinder('Person_Race'),
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
        return ({
          caseNumber: caseFinder('.court-case-number > b'),
          daCaseNumber: caseFinder('.da-case-number > b'),
          citationNumber: caseFinder('.citation-number > b'),
          description: chargeFinder('.charge-description-display')
            .substr(0, chargeFinder('.charge-description-display').indexOf('(')).trim(),
          category: chargeFinder('.charge-description-display')
            .substr(chargeFinder('.charge-description-display').indexOf('(') + 1).slice(0, -1).trim(),
          bail: numifyBail(chargeFinder('.charge-bail-value')),
          status: chargeFinder('.charge-status-value')
        });
      })
  });  
};

scrapeMultnomah()
  .then(result => console.log(result));
       
module.exports = scrapeMultnomah;
