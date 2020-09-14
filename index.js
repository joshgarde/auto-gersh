const got = require('got')
const cheerio = require('cheerio')
const moment = require('moment')

async function getTodaysZoomInfo(username, password) {
  let response = await got('https://www.cpp.edu/~dagershman/cs2600-001/', {
    resolveBodyOnly: true,
    username: username,
    password: password
  });

  let $ = cheerio.load(response);
  let links = $('a');
  let today = moment().hours(0).minutes(0).seconds(0).millisecond(0)

  // Locate today's date
  for (let i = 0; i < links.length; i++) {
    let link = $(links[i]);
    let format = /^Day [0-9]{1,2} - .*, (.*, 2020)/g.exec(link.text());
    if (!format || format.length !== 2) continue; // Does not match the date format

    let date = moment(format[1], 'MMMM D, YYYY');
    if (!date.isSame(today)) continue; // Not today

    let rawSectionText = $(`#outline-container-${link.attr('href').substring(1)}`).text().trim();	 
    let zoomId = /Meeting ID: ([0-9]* [0-9]* [0-9]*)/i.exec(rawSectionText)[1];
    let zoomPassword = /Pass.*: ([0-9]*)/i.exec(rawSectionText)[1];
    let zoomUrl = `https://cpp.zoom.us/j/${zoomId.replace(/ /g, '')}`;

    return ({
    	successful: true,
    	id: zoomId,
    	password: zoomPassword,
    	url: zoomUrl
    });
  }
  return {
    successful: false
  };
}

module.exports = getTodaysZoomInfo;
