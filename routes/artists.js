var express = require('express');
var router = express.Router();
const User = require('../Models/User');
const Message = require('../Models/Message');
const Space = require('../Models/Space');
const middlewares = require('../middlewares/middlewares');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const newMessage = new Message();

// Formato de la fecha yyyy/mm/dd
const dateObj = new Date();
const month = dateObj.getUTCMonth() + 1; // months from 1-12
const day = dateObj.getUTCDate();
const year = dateObj.getUTCFullYear();
const newdate = year + '/' + month + '/' + day;

/* GET index home page */
router.get('/', (req, res, next) => {
  User.find({ is_artist: { $eq: true } })
    .then(users => {
      res.render('artists/list', { users });
    })
    .catch((error) => {
      console.log(error);
    });
});

router.get('/:id', (req, res) => {
  const idUser = req.params.id;

  User.findById(idUser)
    .then((user) => {
      res.render('artists/detail', { user: user });
    });
});

router.post('/:id', (req, res) => {
  const idArtist = ObjectId(req.params.id);
  // const idArtist = ObjectId(req.session.currentUser);
  // const idArtist = ObjectId('5bcc76872732493d331fe73c'); // user12
  const idNonArtist = ObjectId('5bcc7680c39a8e3d19444db2'); // user06

  Space.find({ owner: { $eq: ObjectId('5bcc7680c39a8e3d19444db2') } })
    .then((space) => {
      newMessage.sender = idNonArtist;
      newMessage.spaceToRent = ObjectId(space._id);
      newMessage.reciever = idArtist;
      newMessage.date = newdate;
      console.log(newMessage);
      Message.create(newMessage)
        .then(() => {
          res.redirect('/artists');
        })
        .catch((error) => {
          console.log(error);
        });
    });
});

module.exports = router;
