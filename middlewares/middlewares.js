const User = require('../Models/User');

function requireFields (req, res, next) {
  const user = req.body;

  if (!user.username || !user.password) {
    return res.render('auth/signup', { error: 'Username or password can not be empty.' });
  } else {
    next();
  }
}

function userExists (req, res, next) {
  const user = req.body;

  User.findOne({ username: user.username })
    .then(user => {
      if (user) {
        return res.render('auth/signup', { error: 'Username already taken.' });
      } else {
        next();
      }
    });
}

function requireUser (req, res, next) {
  const user = req.body;

  if (!user) {
    return res.redirect('/auth/login');
  } else {
    next();
  }
}

function alreadyLoggedIn (req, res, next) {
  if (req.session.currentUser) {
    return res.redirect('/profile/profile');
  } else {
    next();
  }
}

//   User.findOne({username})
//     .then(userFound => {
//       // Login user
//       if (userFound && )) {
//         req.session.currentUser = userFound.username;
//         res.redirect('/users');
//       } else {
//         console.log('Password erroneo');
//         res.redirect('/users/login', {error: 'Username or password are incorrect.'});
//       }
//     })

//   if () {
//     return res.redirect('/profile');
//   } else {
//     next();
//   }
// }

module.exports = {
  requireFields,
  userExists,
  requireUser,
  alreadyLoggedIn
};
