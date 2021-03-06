var express = require('express');
var router = express.Router();
const User = require('../Models/User');
const Message = require('../Models/Message');
const Space = require('../Models/Space');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const middlewares = require('../middlewares/middlewares');

// const idArtist = ObjectId('5bcb8cdb8e835b5fa1ebab7a'); // user12

router.use(middlewares.isLoggedIn);

router.get('/', (req, res, next) => {
  const user = req.session.currentUser;

  User.findById(user._id)
    .then((edituser) => {
      return res.render('profile/profile', { edituser });
    })
    .catch(next);
});

// EDIT PROFILE
router.get('/edit', (req, res, next) => {
  const user = req.session.currentUser;

  User.findById(user._id)
    .then((edituser) => {
      return res.render('profile/editprofile', { user: edituser });
    })
    .catch(next);
});

router.post('/edit', (req, res, next) => {
  const profile = req.body;
  const id = req.session.currentUser._id;

  User.findByIdAndUpdate(id, profile)
    .then((result) => {
      return res.redirect('/profile');
    })
    .catch(next);
});

// SHOW MESSAGES
router.get('/messages', (req, res, next) => {
  const user = req.session.currentUser;

  if (user.is_artist === false) {
    const recievedMessagesPromise = Message.find({ reciever: user._id })
      .populate('sender');
    const sentMessagesPromise = Message.find({ sender: user._id })
      .populate('reciever');
    Promise.all([recievedMessagesPromise, sentMessagesPromise])
      .then((messages) => {
        const [recivers, senders] = messages;
        const messageData = {
          senders,
          recivers
        };
        return res.render('profile/messages', messageData);
      })
      .catch(next);
  }
  if (user.is_artist === true) {
    const recievedMessagesPromise = Message.find({ reciever: user._id })
      .populate('sender');
    const sentMessagesPromise = Message.find({ sender: user._id })
      .populate('reciever');
    const spaceSenderMessagesPromise = Message.find({ sender: user._id })
      .populate('spaceToRent');
    const spaceRecieverMessagesPromise = Message.find({ reciever: user._id })
      .populate('spaceToRent');

    Promise.all([recievedMessagesPromise, sentMessagesPromise, spaceSenderMessagesPromise, spaceRecieverMessagesPromise])
      .then((messages) => {
        const [recivers, senders, spacesender, spacereciever] = messages;
        const messageData = {
          senders,
          recivers,
          spacesender,
          spacereciever
        };
        return res.render('profile/messages', messageData);
      })
      .catch(next);
  }
});

// EDIT MY SPACES - HAY QUE CONTROLAR QUE SÓLO PUEDA ENTRAR USUARIO NOARTIST

router.get('/space', (req, res, next) => {
  // const user = req.session.currentUser;

  Space.find({ owner: { $eq: ObjectId(req.session.currentUser._id) } })
    .then((space) => {
      return res.render('profile/editspace', { space: space });
    })
    .catch(next);
});

router.post('/space', (req, res, next) => {
  const profile = req.body;

  Space.findByIdAndUpdate(profile.id, profile)
    .then((result) => {
      return res.redirect('/profile');
    })
    .catch(next);
});

module.exports = router;
