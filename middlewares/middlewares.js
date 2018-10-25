const User = require('../Models/User');

function requireFields (req, res, next) {
  // checkFieldsLogin
  const user = req.body;
  const url = req.originalUrl;
  if (!user.username || !user.password) {
    req.flash('error', 'Username or password can not be empty.');
    return res.redirect(url);
    // return res.render('auth/signup', { error: 'Username or password can not be empty.' });
  } else {
    next();
  }
}

function userExists (req, res, next) {
  const user = req.body;

  User.findOne({ username: user.username })
    .then(user => {
      if (user) {
        req.flash('error', 'Username already taken.');
        return res.redirect('/auth/signup');
      } else {
        next();
      }
    });
}

function alreadyLoggedIn (req, res, next) {
  if (req.session.currentUser) {
    return res.redirect('/profile');
  } else {
    next();
  }
}

function notifications (req, res, next) {
  // We extract the messages separately cause we call req.flash() we'll clean the object flash.
  res.locals.errorMessages = req.flash('error');
  res.locals.infoMessages = req.flash('info');
  res.locals.dangerMessages = req.flash('danger');
  res.locals.successMessages = req.flash('success');
  res.locals.warningMessages = req.flash('warning');
  next();
};

function isLoggedInArtist (req, res, next) {
  if (req.session.currentUser.is_artist === true) {
    return res.redirect('/profile');
  } else {
    next();
  }
};

function isLoggedInNotArtist (req, res, next) {
  if (req.session.currentUser.is_artist === false) {
    return res.redirect('/profile');
  } else {
    next();
  }
};

function isLoggedIn (req, res, next) {
  if (!req.session.currentUser) {
    req.flash('error', 'You should log in first.');
    return res.redirect('/auth/login');
  } else {
    next();
  }
};

function notIdValid (req, res, next) {
  const user = req.body;

  User.findById(user._id)
    .then(user => {
      if (!req.session.currentUser) {
        req.flash('error', 'You should log in first.');
        return res.redirect('/auth/login');
      } else {
        next();
      }
    })
    .catch(next);
};

module.exports = {
  requireFields,
  userExists,
  alreadyLoggedIn,
  notifications,
  isLoggedInArtist,
  isLoggedInNotArtist,
  isLoggedIn,
  notIdValid
  // notIdValidLoggedIn
  // alreadyRequested
};
