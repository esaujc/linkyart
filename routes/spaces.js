const express = require('express');
const router = express.Router();
const Space = require('../Models/Space');
const Message = require('../Models/Message');
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
  Space.find()
    .then(spaces => {
      res.render('spaces/list', { spaces });
    })
    .catch((error) => {
      console.log(error);
    });
  // res.render('index');
});

router.get('/:id', (req, res) => {
  const idSpace = req.params.id;

  Space.findById(idSpace)
    .then((space) => {
      res.render('spaces/detail', { space: space });
    });
});

router.post('/:id', (req, res) => {
  const idSpace = ObjectId(req.params.id);
  let idNonArtist;
  // const idArtist = ObjectId(req.session.currentUser);
  const idArtist = ObjectId('5bcc76872732493d331fe73c'); // user12

  Space.findById(idSpace)
    .then((space) => {
      idNonArtist = ObjectId(space.owner);
      newMessage.sender = idArtist;
      newMessage.spaceToRent = idSpace;
      newMessage.reciever = idNonArtist;
      newMessage.date = newdate;
      Message.create(newMessage)
        .then(() => {
          res.redirect('/spaces');
        })
        .catch((error) => {
          console.log(error);
        });
    });
  // res.send('Aqui envia el mensaje');
});

module.exports = router;
