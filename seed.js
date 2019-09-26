const {db, User} = require('./server/db/index');
const {green, red} = require('chalk');

// DEFINE OBJECTS WITH DATA HERE:

const users = [
  {email: 'test@email.com', password: '12345'}
];


const seed = async () => {
  try {
    await db.sync({force: true});

    // await creation of instances here (Use Promise.All?)
    await Promise.all(users.map(user => {
      return User.create(user);
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
