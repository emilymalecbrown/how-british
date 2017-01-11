var Sequelize = require('sequelize')
var db = require('../index.js');

var WordList = db.define('wordlist', {
  language: Sequelize.STRING,
  words: Sequelize.ARRAY(Sequelize.STRING),
});

module.exports = WordList
