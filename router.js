var express = require('express');
var router = express.Router();
var WordList = require('./db/models/words.js');

router.get('/words', (req, res, next) => {
  WordList.findAll()
  .then((words) => {
    console.log('here')
    res.send(words);
  });
});

module.exports = router;
