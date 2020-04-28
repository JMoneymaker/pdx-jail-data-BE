const cheerio = require('cheerio');
const superagent = require('superagent');
const Throttle = require('superagent-throttle');
require('superagent-retry')(superagent);
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
    .map((el) => ({
      county: 'Washington',
      dateAdded: makeTimeless(),
      bookingDate: makeDateWash(html(el).find('.booking-data tbody tr td').eq(4).text()),
      projectedReleaseDate: makeDateWash(html(el).find('.booking-data tbody tr td').eq(7).text()),
      bookingNumber: html(el).find('.booking-data tbody tr th').eq(0).text(),
      mni: html(el).find('dd').eq(5).text(),
      fullName: html(el).find('.individual h3').text(),
      age: getAgeWash(html(el).find('dd').eq(4).text()),
      dob: makeDateWash(html(el).find('dd').eq(4).text()),
      gender: html(el).find('dd').eq(0).text(),
      race: html(el).find('dd').eq(1).text(),
      height: html(el).find('dd').eq(2).text(),
      weight: html(el).find('dd').eq(3).text(),
      arrestingAgency: html(el).find('.booking-data tbody tr td').eq(5).find('a').attr('title'),
      assignedFacility: html(el).find('tfoot td').contents().eq(3).text().trim(),
      status: html(el).find('tfoot td').contents().eq(0).text(),
      charges: html(el).find('.booking-data tbody tr').get()
        .map((el) => ({
          bookingNo: html(el).find('th').text(),
          caseNo: html(el).find('td').eq(2).text(),
          description: html(el).find('td').eq(0).text()
            .substr(html(el).find('td').eq(0).text().indexOf(' ') + 1),
          category: html(el).find('td').eq(0).text()
            .substr(0, html(el).find('td').eq(0).text().indexOf(' ')),
          osb: html(el).find('td').eq(1).text(),
          arrestDate: html(el).find('td').eq(4).text(),
          arrestingAgency: html(el).find('td').eq(5).find('a').attr('title'),
          court: html(el).find('td').eq(3).find('a').attr('title'),
          bail: numifyBail(html(el).find('td').eq(6).text()),
          scheduledReleaseDate: makeDateWash((html(el).find('td').eq(7).text()))
        })),
    }));
};

// scrapeWashington('A')
//   .then(response => console.log(response));
       
module.exports = scrapeWashington;
