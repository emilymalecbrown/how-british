'use strict';

var Sequelize = require('sequelize');

var databaseURI = 'postgres://localhost:5432/howbritish';

var db = module.exports = new Sequelize(databaseURI, {
  define: {
    timestamps: false,
    underscored: true
  }
});

require('./models');

db.sync();
