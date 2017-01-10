var db = require('./db/index.js');
var cheerio = require('cheerio');
var request = require('request');

var britishWords = [];
var americanWords = [];
var url = 'http://www.tysto.com/uk-us-spelling-list.html';

request(url, function(error, response, html){
  var $ = cheerio.load(html);

  if(error){
    throw new Error(error);
  }

  var firstColumn = $('table tr .Body p').first();
  var secondColumn = $('table tr .Body p').last();

  //console.log(britishWords['0'])
  firstColumn['0'].children.forEach(function(elem) {
    if (elem.data) {
      britishWords.push(elem.data.replace(/\s/g,''));
    }
  });

  secondColumn['0'].children.forEach(function(elem) {
    if (elem.data) {
      americanWords.push(elem.data.replace(/\s/g,''));
    }
  });
  db.Promise.map([
    {language: 'British English', words: britishWords},
    {language: 'American English', words: americanWords},
  ], function(wordlist) { db.model('wordlist').create(wordlist); });
});

