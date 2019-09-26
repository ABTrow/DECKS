const Sequelize = require('sequelize');
const db = require('../database');

const Card = db.define('card', {
  front: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  back: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  }
});


module.exports = Card;
