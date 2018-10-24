const express = require('express');
const router = express.Router();
const User = require('../Models/User');
const Space = require('../Models/Space');
const Message = require('../Models/Message');
const middlewares = require('../middlewares/middlewares');
const mongoose = require('mongoose');
const formatDate = require('../public/javascript/main');
const ObjectId = mongoose.Types.ObjectId;

// Formato de la fecha yyyy/mm/dd
// const dateObj = new Date();
// const month = dateObj.getUTCMonth() + 1; // months from 1-12
// const day = dateObj.getUTCDate();
// const year = dateObj.getUTCFullYear();
// const newdate = year + '/' + month + '/' + day;

/* GET index home page */
router.get('/', middlewares.alreadyLoggedInNotArtist, (req, res, next) => {
  Space.find()
    .then(spaces => {
      res.render('spaces/list', { spaces });
    })
    .catch((error) => {
      console.log(error);
    });
  // res.render('index');
});

router.get('/:id', middlewares.notifications, middlewares.alreadyLoggedInNotArtist, (req, res, next) => {
  const idSpace = req.params.id;

  Space.findById(idSpace)
    .then((space) => {
      res.render('spaces/detail', { space: space });
    });
});

router.post('/:id', middlewares.notifications, middlewares.userExists, middlewares.alreadyLoggedInNotArtist, (req, res, next) => {
  const user = req.session.currentUser;

  const idSpace = ObjectId(req.params.id);
  let idNonArtist;
  const idArtist = ObjectId(user._id);
  // const idArtist = ObjectId(user._id); //

  User.findById(user)
    .then(() => {
      Space.findById(idSpace)
        .then(resSpace => {
          const newMessage = new Message();

          idNonArtist = resSpace.owner;
          newMessage.sender = idArtist;
          newMessage.spaceToRent = idSpace;
          newMessage.reciever = idNonArtist;
          newMessage.date = formatDate();

          Message.find({ sender: { $eq: ObjectId(idArtist) }, reciever: { $eq: ObjectId(idNonArtist) } })
            .then(result => {
              if (result.length > 0) {
                req.flash('error', 'Request already send to this space.');
                return res.redirect('/spaces/' + idSpace);
              } else {
                newMessage.save()
                  .then(() => {
                    req.flash('info', 'Request send successfully!');
                    return res.redirect('/spaces/' + idSpace);
                  })
                  .catch((error) => {
                    next(error);
                  });
              }
            })
            .catch(next);
        })
        .catch(next);
    })
    .catch(next);
});

module.exports = router;
