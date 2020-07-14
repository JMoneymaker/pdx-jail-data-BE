const cheerio = require('cheerio');
const superagent = require('superagent');
const Throttle = require('superagent-throttle');
const { makeDateWash, numifyBail, getAgeWash, makeTimeless } = require('../../utils/dataShapers');
const { shapeRace } = require('../../utils/shapeRace');
const { shapeAgency } = require('../../utils/shapeAgency');
const { shapeGender } = require('../../utils/shapeGender');


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
      const tableScraper = i => html(el).find('dd').eq(i).text();
      const tableFooter = i => html(el).find('tfoot td').contents().eq(i).text().trim();
      const bookingData = i => html(el).find('.booking-data tbody tr td').eq(i).text();
      return ({
        county: 'Washington',
        dateAdded: makeTimeless(),
        bookingDate: makeDateWash(bookingData(4)),
        projectedReleaseDate: makeDateWash(bookingData(7)),
        bookingNumber: html(el).find('.booking-data tbody tr th').eq(0).text(),
        mni: tableScraper(5),
        fullName: html(el).find('.individual h3').text(),
        age: getAgeWash(tableScraper(4)),
        dob: makeDateWash(tableScraper(4)),
        gender: shapeGender(tableScraper(0)),
        race: shapeRace(tableScraper(1)),
        height: tableScraper(2),
        weight: tableScraper(3),
        arrestingAgency: shapeAgency(html(el).find('.booking-data tbody tr td').eq(5).find('a').attr('title')),
        assignedFacility: tableFooter(3).trim(),
        status: tableFooter(0),
        charges: html(el).find('.booking-data tbody tr').get()
          .map((el) => {
            const tableData = i => html(el).find('td').eq(i);
            const [description, category] = tableData(0).text().split('/');
            return ({
              bookingNo: html(el).find('th').text(),
              caseNo: tableData(2).text(),
              description: description.trim(),
              category: category.trim(),
              osb: tableData(1).text(),
              arrestDate: tableData(4).text(),
              arrestingAgency: shapeAgency(tableData(5).find('a').attr('title')),
              court: tableData(3).find('a').attr('title'),
              bail: numifyBail(tableData(6).text()),
              scheduledReleaseDate: makeDateWash(tableData(7).text())
            });
          })
      });
    });
};

// scrapeWashington('A')
//   .then(response => console.log(JSON.stringify(response, null, 2)));
       
module.exports = scrapeWashington;
