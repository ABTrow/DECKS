const Sequelize = require('sequelize');
const db = require('../database');

const Deck = db.define('deck', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  isPrivate: {
    type: Sequelize.BOOLEAN,
    defaultValue: true
  }
});

module.exports = Deck;
