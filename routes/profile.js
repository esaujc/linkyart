var express = require('express');
var router = express.Router();
const User = require('../Models/User');
const middlewares = require('../middlewares/middlewares');

router.get('/', middlewares.requireUser, (req, res, next) => {
  const user = req.session.currentUser;

  User.findById(user._id)
    .catch(next);
  res.render('profile');
});

module.exports = router;
