const {db, User, Card, Deck} = require('./server/db/index');
const {green, red} = require('chalk');

// DEFINE OBJECTS WITH DATA HERE:

const users = [
  {email: 'test@email.com', password: '12345'}
];

const decks = [
  {name: 'Civil War', isPrivate: false}
];

const UserDeck = db.model('userDeck');

const userDecks = [
  {userId: 1, deckId: 1}
];


const cards = [
  { front: 'Abraham Lincoln', back: 'a very tall president', deckId: 1 },
  { front: 'Ulysses S. Grant', back: 'a very short president', deckId: 1 },
  { front: 'Andrew Johnson', back: 'a very angry president', deckId: 1 }
];

const seed = async () => {
  try {
    await db.sync({force: true});

    // await creation of instances here (Use Promise.All?)
    await Promise.all(users.map(user => {
      return User.create(user);
    }));

    await Promise.all(decks.map(deck => {
      return Deck.create(deck);
    }));

    await Promise.all(userDecks.map(userDeck => {
      return UserDeck.create(userDeck);
    }));

    await Promise.all(cards.map(card => {
      return Card.create(card);
    }));

    console.log(green('Seeding success!'));
    db.close();
  }
  catch (err) {
    console.error(red('Oh noes! Something went wrong!'));
    console.error(err);
    db.close();
  }
};

seed()
  .catch(err => {
    console.error(red('Oh noes! Something went wrong!'));
    console.error(err);
    db.close();
  });
