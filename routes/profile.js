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
    .then(() => {
      res.render('profile/profile');
    })
    .catch(next);
});

// EDIT PROFILE
router.get('/edit', (req, res, next) => {
  const user = req.session.currentUser;

  // User.findById(user._id)
  User.findById(user._id)
    .then((edituser) => {
      res.render('profile/editprofile', { user: edituser });
    })
    .catch(next);
});

router.post('/edit', (req, res, next) => {
  const profile = req.body;
  const id = req.session.currentUser._id;

  User.findByIdAndUpdate(id, profile)
    .then((result) => {
      // console.log(result);
      res.redirect('/profile');
    })
    .catch(next);
});

// SHOW MESSAGES
router.get('/messages', (req, res, next) => {
  // const user = req.session.currentUser;

  const recievedMessagesPromise = Message.find({ reciever: { $eq: ObjectId(req.session.currentUser._id) } })
    .populate('sender');
  const sentMessagesPromise = Message.find({ sender: { $eq: ObjectId(req.session.currentUser._id) } })
    .populate('reciever');
  Promise.all([recievedMessagesPromise, sentMessagesPromise])
    // .then(({ receivedMessages, sentMessages }) => {
  // receivedMessages.forEach(recieve => {
    .then((messages) => {
      const [recivers, senders] = messages;
      const messageData = {
        senders,
        recivers
      };
      res.render('profile/messages', messageData);
      // .catch(next);
    })
    .catch(next);
  // res.render('index');
});

// EDIT MY SPACES - HAY QUE CONTROLAR QUE SÓLO PUEDA ENTRAR USUARIO NOARTIST

router.get('/space', (req, res, next) => {
  // const user = req.session.currentUser;

  Space.find({ owner: { $eq: ObjectId(req.session.currentUser._id) } })
    // .populate('sender');
    .then((space) => {
      // console.log(space);
      res.render('profile/editspace', { space: space });
    })
    .catch(next);
});

router.post('/space', (req, res, next) => {
  const profile = req.body;

  console.log(profile);
  Space.findByIdAndUpdate(profile.id, profile)
    .then((result) => {
      // console.log(result);
      res.redirect('/profile');
    })
    .catch(next);
});

module.exports = router;
