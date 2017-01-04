const request = require('request');
const cheerio = require('cheerio');

const scrapeWords = () => {

  let url = 'http://www.tysto.com/uk-us-spelling-list.html';
  request(url, function(error, response, html){
    let $ = cheerio.load(html);

    if(error){
      throw new Error(error);
    }

    let firstColumn = $('table tr .Body p').first();
    let secondColumn = $('table tr .Body p').last();
    let britishWords = [];
    let americanWords = [];

    //console.log(britishWords['0'])
    firstColumn['0'].children.forEach((elem) => {
      if (elem.data) {
        britishWords.push(elem.data.replace(/\s/g,''));
      }
    });

    secondColumn['0'].children.forEach((elem) => {
      if (elem.data) {
        americanWords.push(elem.data.replace(/\s/g,''));
      }
    });

  });
};

scrapeWords();
