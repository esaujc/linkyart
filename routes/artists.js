var express = require('express');
var router = express.Router();
const User = require('../Models/User');
const middlewares = require('../middlewares/middlewares');
const artistsUsers = new User();

// npm install bcrypt
const bcrypt = require('bcrypt');
const saltRounds = 10;

/* GET index home page */
router.get('/', (req, res, next) => {
  User.find({ is_artist: { $eq: true } })
  // db.users.find({is_artist: {$eq: true}})
  // User.find()
    .then(users => {
      res.render('artists/list', { users });
    })
    .catch((error) => {
      console.log(error);
    });
  // res.render('index');
});

router.get('/:id', (req, res) => {
  const idUser = req.params.id;

  User.findById(idUser)
    .then((user) => {
      res.render('artists/detail', { user: user });
    });
});

router.post('/:id', (req, res) => {
  res.send('Aqui envia el mensaje');
});

module.exports = router;
