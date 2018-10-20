const User = require('../Models/User');

function requireFields (req, res, next) {
  const user = req.body;
  
  if (!user.username || !user.password) {
    return res.render('auth/signup', {error: 'Username or password can not be empty.'});
  } else {
    next();
  }
}

function userExists (req, res, next) {
  const user = req.body;

  User.findOne({username: user.username})
      .then(user => {
        if(user) {
          return res.render('auth/signup', {error: 'Username already taken.'});
        } else {
          next();
        }
      })
}

function requireUser (req, res, next) {

  if (!user) {
    return res.redirect('/auth/login')
  } else {
    next();
  }
}

module.exports = {
  requireFields,
  userExists,
  requireUser
}