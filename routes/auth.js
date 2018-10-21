var express = require('express');
var router = express.Router();
const User = require('../Models/User');
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

router.post('/login', middlewares.alreadyLoggedIn, middlewares.requireFields, (req, res, next) => {
  const { username, password } = req.body;

  User.findOne({ username })
    .then(userFound => {
      // Login user
      if (bcrypt.compareSync(password, userFound.password)) {
        // Save the login in the session!
        console.log(req.session);
        req.session.currentUser = userFound;
        res.redirect('/profile/profile');
      } else {
        console.log('Password erroneo');
        res.redirect('/auth/login', { error: 'Username or password are incorrect.' });
      }
    })
    .catch((error) => {
      next(error);
    });
});

/* GET signup page */
router.get('/signup', (req, res, next) => {
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
      res.redirect('/profile/profile');
    })
    .catch((error) => {
      next(error);
    });
});

router.get('/logout', middlewares.requireUser, (req, res, next) => {
  req.session.destroy((err) => {
    next(err);
  });
  // cannot access session here
  res.redirect('/');
});
// - GET /auth/login
//   - redirects to /user if user logged in
//   - renders the login form (with flash msg)

// - GET /auth/signup
//   - redirects to /user if user logged in
//   - renders the signup form (with flash msg)

module.exports = router;
