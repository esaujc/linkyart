var express = require('express');
var router = express.Router();
const User = require('../Models/User');
const Message = require('../Models/Message');
const middlewares = require('../middlewares/middlewares');
const newMesage = new Message();

// const idArtist = ObjectId('5bcb8cdb8e835b5fa1ebab7a'); // user12

router.get('/', middlewares.requireUser, (req, res, next) => {
  const user = req.session.currentUser;

  User.findById(user._id)
    .catch(next);
  res.render('profile');
});

router.get('/messages', (req, res, next) => {
  let prueba = 'Lucas';
  let data2 = [];
  let data3 = [];

  const recievedMessagesPromise = Message.find({ reciever: { $eq: '5bcc76872732493d331fe73c' } })
    .populate('sender')
    .populate('spaceToRent')
    .populate('reciever');
  // OJO COn esto que hay que cambiarlo por la sesión.
  const sentMessagesPromise = Message.find({ sender: { $eq: '5bcc76872732493d331fe73c' } })
    .populate('sender')
    .populate('spaceToRent')
    .populate('reciever');
  Promise.all([recievedMessagesPromise, sentMessagesPromise])
    // .then(({ receivedMessages, sentMessages }) => {
  // receivedMessages.forEach(recieve => {
    .then((messages) => {
      messages[1].forEach((send) => {
        console.log(send);
        let sender = {
          usernameArtist: send.sender.username,
          nameArtist: send.sender.name,
          emailArtist: send.sender.email,
          usernameSpace: send.spaceToRent.name,
          nameSpace: send.sender.contactName,
          emailSpace: send.sender.email
        };
        data2.push(sender);
      });
      messages[0].forEach((recieve) => {
        // console.log(recieve);
        let reciever = {
          usernameArtist: recieve.reciever.username,
          nameArtist: recieve.reciever.name,
          emailArtist: recieve.reciever.email,
          usernameSpace: recieve.spaceToRent.name,
          nameSpace: recieve.reciever.contactName,
          emailSpace: recieve.reciever.email
        };
        data3.push(reciever);
      });
      const data4 = {
        data2,
        data3
      };
      res.render('messages/list', data4);
      // .catch(next);
    })
    .catch((error) => {
      console.log(error);
    });
  // res.render('index');
});

module.exports = router;
