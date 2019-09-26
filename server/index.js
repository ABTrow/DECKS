const express = require('express');
const app = express();
const morgan = require('morgan');
const path = require('path');
const apiRouter = require('./api/index');
const authRouter = require('./auth');
const session = require('express-session');
const { db, User } = require('./db');
const passport = require('passport');

const port = process.env.PORT || 1337;

const SequelizeStore = require('connect-session-sequelize')(session.Store);
const dbStore = new SequelizeStore({ db: db });
dbStore.sync();


//middleware
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, '..', 'public')));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(session({ secret: process.env.SESSION_SECRET || 'Blaine Gabbert', store: dbStore, resave: false, saveUninitialized: false }));

// passport nonsense
app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser((user, done) => {
  try {
    done(null, user.id);
  } catch (err) {
    done(err);
  }
});
passport.deserializeUser((id, done) => {
  User.findOne( {
    where: {id: id}
  })
    .then(user => done(null, user))
    .catch(done);
});



// routes
app.use('/api', apiRouter);
app.use('/auth', authRouter);
app.use('/graphql', require('./api/graphql'));

// 404 page
app.use((req, res, next) => {
  let error = new Error('Page not found!');
  error.status = 404;
  next(error);
});

//serve home page
app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, '/public/index.html'));
});


// error handling
app.use(function (err, req, res, next) {
  console.error(err);
  console.error(err.stack);
  res.status(err.status || 500).send(err.message || 'Internal server error.');
});

app.listen(port, () => {
  console.log(`Listening to your thoughts on PORT ${port}`);
  console.log(`http://localhost:${port}`);
});
