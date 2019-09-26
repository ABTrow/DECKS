const db = require('./database');
const User = require('./models/User');
const Card = require('./models/Card');
const Deck = require('./models/Deck');

// import models above and define associations below

module.exports = {
  db,
  User,
  Card,
  Deck
};
