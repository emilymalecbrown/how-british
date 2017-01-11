'use strict';

var Sequelize = require('sequelize');

var databaseURI = process.env.DATABASE_URL || 'postgres://localhost:5432/howbritish';

var db = module.exports = new Sequelize(databaseURI, {
  define: {
    timestamps: false,
    underscored: true
  }
});

require('./models');

db.sync();
