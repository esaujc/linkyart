var express = require('express');
var router = express.Router();
const middlewares = require('../middlewares/middlewares');

/* GET home page. */
router.get('/', middlewares.notifications, (req, res, next) => {
  foo();
  res.render('index');
});

module.exports = router;
