const cheerio = require('cheerio');
const superagent = require('superagent');
const Throttle = require('superagent-throttle');
const { makeDateWash, numifyBail, getAgeWash, makeTimeless } = require('../../utils/dataShapers');
const moment = require('moment');
moment().format();


let throttle = new Throttle({
  active: true,  
  rate: 5,
  ratePer: 10000,
  concurrent: 5  
});

const scrapeWashington = query => {
  const url = `https://www.co.washington.or.us/Sheriff/Jail/who-is-in-custody.cfm?alpha=${query}`;
  return superagent
    .get(url)
    .use(throttle.plugin())
    .retry(3)
    .then(response => cheerio.load(response.text))
    .then(html => makeDetentionObject(html));
};

const makeDetentionObject = html => {
  return html('.inmates li').get()
    .map((el) => {
      const tableScraper = (tag, n) => html(el).find(tag).eq(n).text();
      const allPurpose = tag => html(el).find(tag).text();
      const withContents = (tag, n) => html(el).find(tag).contents().eq(n).text().trim();
      return ({
        county: 'Washington',
        dateAdded: makeTimeless(),
        bookingDate: makeDateWash(tableScraper('.booking-data tbody tr td', 4)),
        projectedReleaseDate: makeDateWash(tableScraper('.booking-data tbody tr td', 7)),
        bookingNumber: tableScraper('.booking-data tbody tr th', 0),
        mni: tableScraper('dd', 5),
        fullName: allPurpose('.individual h3'),
        age: getAgeWash(tableScraper('dd', 4)),
        dob: makeDateWash(tableScraper('dd', 4)),
        gender: tableScraper('dd', 0),
        race: tableScraper('dd', 1),
        height: tableScraper('dd', 2),
        weight: tableScraper('dd', 3),
        arrestingAgency: html(el).find('.booking-data tbody tr td').eq(5).find('a').attr('title'),
        assignedFacility: withContents('tfoot td', 3),
        status: withContents('tfoot td', 0),
        charges: html(el).find('.booking-data tbody tr').get()
          .map((el) => {
            const getCharges = (tag, n) => html(el).find(tag).eq(n).text();
            const [description, category] = getCharges(html(el).find('td').eq(0).text().split(''));
            return ({
              bookingNo: html(el).find('th').text(),
              caseNo: getCharges('td', 2),
              description: description,
              category: category,
              osb: getCharges('td', 1),
              arrestDate: getCharges('td', 4),
              arrestingAgency: html(el).find('td').eq(5).text().find('a').attr('title'),
              court: html(el).find('td').eq(3).text().find('a').attr('title'),
              bail: numifyBail(getCharges('td', 6)),
              scheduledReleaseDate: makeDateWash((getCharges('td', 7)))
            });
          })
      });
    });
};

scrapeWashington('A')
  .then(response => console.log(response));
       
module.exports = scrapeWashington;
