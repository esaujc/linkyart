var express = require('express');
var router = express.Router();
const User = require('../Models/User');
const Space = require('../Models/Space');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const middlewares = require('../middlewares/middlewares');

// npm install bcrypt
const bcrypt = require('bcrypt');
const saltRounds = 10;

/* GET index home page */
router.get('/', function (req, res, next) {
  res.render('index');
});

/* GET login page */
router.get('/login', middlewares.alreadyLoggedIn, (req, res, next) => {
  res.render('auth/login');
});

router.post('/login', middlewares.requireFields, (req, res, next) => {
  const { username, password } = req.body;

  User.findOne({ username })
    .then(userFound => {
      if (userFound) {
        // Login user
        if (bcrypt.compareSync(password, userFound.password)) {
          // Saves the login in the session!
          req.session.currentUser = userFound;
          return res.redirect('/profile');
        } else {
          // sends error message: req.flash('message-name', 'The message content');
          req.flash('error', 'Username or password is incorrect.');
          return res.redirect('/auth/login');
        }
      } else {
        req.flash('error', 'Username or password is incorrect.');
        return res.redirect('/auth/login');
      }
    })
    .catch((err) => {
      next(err);
    });
});

/* GET signup page */
router.get('/signup', middlewares.alreadyLoggedIn, (req, res, next) => {
  res.render('auth/signup');
});

router.post('/signup', middlewares.requireFields, middlewares.userExists, (req, res, next) => {
  let user = req.body;

  // Signup new user
  const salt = bcrypt.genSaltSync(saltRounds);
  const hashedPassword = bcrypt.hashSync(user.password, salt);

  user.password = hashedPassword;

  User.create(user)
    .then((user) => {
      req.session.currentUser = user;
      const space = [
        {
          owner: ObjectId(user._id),
          name: '',
          contactName: '',
          email: '',
          telephone: '',
          homepage: '',
          image: '/images/no_space.png'
        }
      ];
      Space.create(space);
      return res.redirect('/profile');
    })
    .catch((error) => {
      next(error);
    });
});

router.post('/logout', middlewares.isLoggedIn, (req, res, next) => {
  delete req.session.currentUser;
  req.flash('info', 'Welcome back soon!');
  res.redirect('/');
});

module.exports = router;
