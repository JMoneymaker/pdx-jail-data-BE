const { makeDate, makeDateWithTime, numifyBail, getAge, makeDateWash } = require('../lib/utils/dataShapers.js');
const moment = require('moment');
moment().format();

describe('bail numifier', () => {
  test('it returns a number if the value is a word', () => {
    const input = 'NO BAIL';
    const output = 0;

    expect(numifyBail(input)).toEqual(output);
  });

  test('it returns a number if the value is a string with a $', () => {
    const input = '$2500';
    const output = 2500;

    expect(numifyBail(input)).toEqual(output);
  });

  test('it returns a number if the value is a string with a ,', () => {
    const input = '$2,500';
    const output = 2500;

    expect(numifyBail(input)).toEqual(output);
  });

  test('it returns a number if the value is a string with $0', () => {
    const input = '$0';
    const output = 0;

    expect(numifyBail(input)).toEqual(output);
  });

  test('it returns a number if the value is a string without a $', () => {
    const input = '2500';
    const output = 2500;

    expect(numifyBail(input)).toEqual(output);
  });
});

describe('date maker', () => {
  it('returns a date if the format is m/d/yy', () => {
    const input = '2/19/80';
    const output = '1980-02-19T00:00:00.000Z';

    expect(makeDate(input)).toEqual(new Date(output));
  });

  it('returns a date if the format is mm/dd/yy', () => {
    const input = '02/19/80';
    const output = '1980-02-19T00:00:00.000Z';

    expect(makeDate(input)).toEqual(new Date(output));
  });

  it('returns a date if the format is mm/dd/yyyy', () => {
    const input = '02/19/1980';
    const output = '1980-02-19T00:00:00.000Z';

    expect(makeDate(input)).toEqual(new Date(output));
  });

  it('returns undefined if the date is an empty string', () => {
    const input = ' ';
    const output = undefined;

    expect(makeDate(input)).toEqual(output);
  });
});

describe.only('date and time maker', () => {
  it('returns correct time for PM', () => {
    const input = '05/21/2020 10:31 PM';
    const output = '2020-05-21T22:31:00-07:00';

    expect(makeDateWithTime(input)).toEqual(output);
  });

  it('returns correct time for AM', () => {
    const input = '05/21/2020 10:31 AM';
    const output = '2020-05-21T10:31:00-07:00';

    expect(makeDateWithTime(input)).toEqual(output);
  });

  it('returns correct time with missing numbers', () => {
    const input = '05/21/2020 1:31 AM';
    const output = '2020-05-21T01:31:00-07:00';

    expect(makeDateWithTime(input)).toEqual(output);
  });

  it('returns correct date with no time', () => {
    const input = '05/21/2020';
    const output = '2020-05-21T00:00:00-07:00';

    expect(makeDateWithTime(input)).toEqual(output);
  });

  it('returns undefined if the date is an empty string', () => {
    const input = ' ';
    const output = undefined;

    expect(makeDateWithTime(input)).toEqual(output);
  });
});

describe('washington date maker', () => {
  it('returns undefined if the date is an empty string', () => {
    const input = ' ';
    const output = undefined;

    expect(makeDateWash(input)).toEqual(output);
  });

  it('returns a date if the format is yyyy/mm/dd', () => {
    const input = '1980/02/19';
    const output = '1980-02-19T00:00:00.000Z';

    expect(makeDateWash(input)).toEqual(new Date(output));
  });
});

describe('get age', () => {
  it('returns the correct age if the format is m/d/yy', () => {
    const input = '2/19/80';
    const output = 40;
  
    expect(getAge(input)).toEqual(output);
  });
  
  it('returns the correct age if the format is mm/dd/yy', () => {
    const input = '02/19/80';
    const output = 40;
  
    expect(getAge(input)).toEqual(output);
  });
  
  it('returns the correct age if the format is mm/dd/yyyy', () => {
    const input = '02/19/1980';
    const output = 40;
  
    expect(getAge(input)).toEqual(output);
  });
  
});
