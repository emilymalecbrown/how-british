var express = require('express');
var router = express.Router();
var WordList = require('./db/models/words');

router.get('/words', function(req, res, next) {
  WordList.findAll()
  .then(function(words) {
    res.send(words);
  });
});

router.get('/words/british', function(req, res, next) {
  WordList.find({where: {language: 'British English'}})
  .then(function(response) {
    res.send(response);
  });
});

router.get('/words/american', function(req, res, next) {
  WordList.find({where: {language: 'American English'}})
  .then(function(response) {
    res.send(response);
  });
});

module.exports = router;
