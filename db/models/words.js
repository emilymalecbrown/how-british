const Sequelize = require('sequelize')
const db = require('../index.js');

const WordList = db.define('wordlist', {
  language: Sequelize.STRING,
  words: Sequelize.ARRAY(Sequelize.STRING),
});

module.exports = WordList
