const db = require('./database');
const User = require('./models/User');
const Card = require('./models/Card');
const Deck = require('./models/Deck');

// import models above and define associations below
User.belongsToMany(Deck, {through: 'userDeck'});
Deck.belongsToMany(User, {through: 'userDeck'});

Card.belongsTo(Deck);
Deck.hasMany(Card);

module.exports = {
  db,
  User,
  Card,
  Deck
};
