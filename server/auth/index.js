const router = require('express').Router();
const User = require('../db/models/User');
const googleAuth = require('./google');

router.post('/login', async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: {email: req.body.email}
    });
    if (!user) {
      res.status(401).send('User not found');
      return;
    } else if (!user.correctPassword(req.body.password)) {
      res.status(401).send('Incorrect Password');
    } else {
      req.login(user, err => {
        if (err) next(err);
        else res.json(user);
      });
    }
  } catch (error) {
    next(error);
  }
});

router.post('/signup', async (req, res, next) => {
  try {
    const user = await User.create(req.body);
    req.login(user, err => {
      if (err) next(err);
      else res.json(user);
    });
  } catch (error) {
    next(error);
  }
});

router.delete('/logout', async (req, res, next) => {
  req.logout();
  req.session.destroy();
  res.sendStatus(204);
});

router.get('/me', (req, res, next) => {
  res.json(req.user);
});

router.use('/google', googleAuth);

module.exports = router;
