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
router.get('/login', /* middlewares.alreadyLoggedIn, */ (req, res, next) => {
  res.render('auth/login');
});

router.post('/login', middlewares.requireFields, (req, res, next) => {
  const { username, password } = req.body;

  User.findOne({ username })
    .then(userFound => {
      // Login user
      if (bcrypt.compareSync(password, userFound.password)) {
        // Save the login in the session!
        console.log(req.session);
        req.session.currentUser = userFound.username;
        res.redirect('/users');
      } else {
        console.log('Password erroneo');
        res.redirect('/users/login', { error: 'Username or password are incorrect.' });
      }
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
    .then(() => {
      res.redirect('/users');
    })
    .catch(() => {
      next(error);
    })
    .catch(next);
});

// - GET /auth/login
//   - redirects to /user if user logged in
//   - renders the login form (with flash msg)
// - POST /auth/login
//   - redirects to /user if user logged in
//   - body:
//     - username
//     - password
//     - artist: true/false
// - GET /auth/signup
//   - redirects to /user if user logged in
//   - renders the signup form (with flash msg)
// - POST /auth/signup
//   - redirects to /user if user logged in
//   - body:
//     - username
//     - password
//     - artist: true/false

// - POST /auth/logout
//   - redirects to /
//   - body: (empty)

module.exports = router;
