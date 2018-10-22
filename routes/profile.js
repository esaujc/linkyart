var express = require('express');
var router = express.Router();
const User = require('../Models/User');
const Message = require('../Models/Message');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const middlewares = require('../middlewares/middlewares');

// const idArtist = ObjectId('5bcb8cdb8e835b5fa1ebab7a'); // user12

router.get('/profile', middlewares.requireUser, (req, res, next) => {
  const user = req.session.currentUser;

  User.findById(user._id)
    .then(() => {
      res.render('profile/profile');
    })
    .catch(next);
});

router.get('/messages', middlewares.requireUser, (req, res, next) => {
  const user = req.session.currentUser;

  let senderData = [];
  let recieverData = [];

  // const recievedMessagesPromise = Message.find({ reciever: { $eq: '5bcc76872732493d331fe73c' } })
  const recievedMessagesPromise = Message.find({ reciever: { $eq: ObjectId(req.session.currentUser._id) } })
  // const recievedMessagesPromise = Message.find({ reciever: { $eq: ObjectId(req.session.currentUser._id) }, {username:1, name:1, email:1, telephone:1, homepage:1} )
    // .populate('reciever')
    // .populate('spaceToRent')
    .populate('sender');

  // OJO COn esto que hay que cambiarlo por la sesión.
  // const sentMessagesPromise = Message.find({ sender: { $eq: '5bcc76872732493d331fe73c' } })
  const sentMessagesPromise = Message.find({ sender: { $eq: ObjectId(req.session.currentUser._id) } })
  // const sentMessagesPromise = Message.find({ sender: { $eq: ObjectId(req.session.currentUser._id) }, {username:1, name:1} )
    .populate('reciever');
    // .populate('spaceToRent')

  Promise.all([recievedMessagesPromise, sentMessagesPromise])
    // .then(({ receivedMessages, sentMessages }) => {
  // receivedMessages.forEach(recieve => {
    .then((messages) => {
      const [recivers, senders] = messages;
      // console.log(senders[0].reciever.username);
      // console.log(recivers[0].sender.username);

      // senders.forEach((send) => {

      // });
      // // senders.forEach((send) => {
      // //   // console.log(send);
      // //   // let sender = {
      // //   //   username: send.sender.username,
      // //   //   name: send.sender.name,
      // //   //   email: send.sender.email,
      // //   //   // usernameSpace: send.spaceToRent.name,
      // //   //   homepage: send.sender.homepage,
      // //   //   date: send.sender.date
      // //   // };
      // //   // senderData.push(sender);
      // // });
      // recivers.forEach((recieve) => {
      //   // console.log(recieve);
      //   let reciever = {
      //     username: recieve.reciever.username,
      //     name: recieve.reciever.name,
      //     email: recieve.reciever.email,
      //     // usernameSpace: recieve.spaceToRent.name,
      //     homepage: recieve.reciever.homepage,
      //     date: recieve.sender.date
      //   };
      //   recieverData.push(reciever);
      // });
      const messageData = {
        senders,
        recivers
      };
      res.render('profile/messages', messageData);
      // .catch(next);
    })
    .catch((error) => {
      console.log('Error de promises', error);
    });
  // res.render('index');
});

module.exports = router;
