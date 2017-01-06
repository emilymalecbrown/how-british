var express = require('express');
var router = express.Router();
var WordList = require('./db/models/words');

router.get('/words', (req, res, next) => {
  WordList.findAll()
  .then((words) => {
    res.send(words);
  });
});

router.get('/words/british', (req, res, next) => {
  WordList.find({where: {language: 'British English'}})
  .then((response) => {
    res.send(response);
  });
});

router.get('/words/american', (req, res, next) => {
  WordList.find({where: {language: 'American English'}})
  .then((response) => {
    res.send(response);
  });
});

module.exports = router;
