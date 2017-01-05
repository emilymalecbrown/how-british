var db = require('./db/index.js');
const cheerio = require('cheerio');
const request = require('request');

let britishWords = [];
let americanWords = [];
let url = 'http://www.tysto.com/uk-us-spelling-list.html';

request(url, function(error, response, html){
  let $ = cheerio.load(html);

  if(error){
    throw new Error(error);
  }

  let firstColumn = $('table tr .Body p').first();
  let secondColumn = $('table tr .Body p').last();

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
  })
  db.Promise.map([
    {language: 'British English', words: britishWords},
    {language: 'American English', words: americanWords},
  ], wordlist => db.model('wordlist').create(wordlist));
});

