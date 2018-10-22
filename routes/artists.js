var express = require('express');
var router = express.Router();
const User = require('../Models/User');
const Message = require('../Models/Message');
const Space = require('../Models/Space');
const middlewares = require('../middlewares/middlewares');
const mongoose = require('mongoose');
const formatDate = require('../public/javascript/main');
const ObjectId = mongoose.Types.ObjectId;

// // Formato de la fecha yyyy/mm/dd
// const dateObj = new Date();
// const month = dateObj.getUTCMonth() + 1; // months from 1-12
// const day = dateObj.getUTCDate();
// const year = dateObj.getUTCFullYear();
// const newdate = year + '/' + month + '/' + day;

/* GET index home page */
router.get('/', middlewares.alreadyLoggedInArtist, (req, res, next) => {
  User.find({ is_artist: { $eq: true } })
    .then(users => {
      res.render('artists/list', { users });
    })
    .catch((error) => {
      console.log(error);
    });
});

router.get('/:id', middlewares.alreadyLoggedInArtist, (req, res) => {
  const idUser = req.params.id;

  User.findById(idUser)
    .then((user) => {
      res.render('artists/detail', { user: user });
    });
});

router.post('/:id', middlewares.userExists, middlewares.alreadyLoggedInArtist, (req, res) => {
  const user = req.session.currentUser;

  const idArtist = ObjectId(req.params.id);
  const idNonArtist = ObjectId(user._id);

  Space.find({ owner: { $eq: ObjectId(user._id) } })
    .then((space) => {
      const newMessage = new Message();
      newMessage.sender = idNonArtist;
      newMessage.spaceToRent = ObjectId(space._id);
      newMessage.reciever = idArtist;
      newMessage.date = formatDate();
      console.log(newMessage);
      newMessage.save()
      // Message.create(newMessage)
        .then(() => {
          res.redirect('/artists');
        })
        .catch((error) => {
          console.log(error);
        });
    });
});

module.exports = router;
