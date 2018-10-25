var express = require('express');
var router = express.Router();
const User = require('../Models/User');
const Message = require('../Models/Message');
const Space = require('../Models/Space');
const middlewares = require('../middlewares/middlewares');
const mongoose = require('mongoose');
const formatDate = require('../public/javascript/main');
const ObjectId = mongoose.Types.ObjectId;
const createError = require('http-errors');

/* GET index home page */
router.get('/', middlewares.isLoggedIn, middlewares.isLoggedInArtist, (req, res, next) => {
  User.find({ is_artist: { $eq: true } })
    .then(users => {
      res.render('artists/list', { users });
    })
    .catch(next);
});

router.get('/:id', middlewares.notIdValid, middlewares.isLoggedIn, middlewares.isLoggedInArtist, middlewares.userExists, (req, res, next) => {
  const idUser = req.params.id;
  const user = req.session.currentUser;

  if (!ObjectId.isValid(idUser)) {
    return next();
  }

  if (user._id.match(/^[0-9a-fA-F]{24}$/)) {
    User.findById(idUser)
      .then((user) => {
        if (!user) {
          const err = createError(404, 'This user does not exist');
          next(err);
        } else {
          res.render('artists/detail', { user: user });
        }
      })
      .catch(next);
  }
});

router.post('/:id', middlewares.isLoggedIn, middlewares.isLoggedInArtist, (req, res, next) => {
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

      Message.find({ sender: { $eq: ObjectId(idNonArtist) }, reciever: { $eq: ObjectId(idArtist) } })
        .then(result => {
          if (result.length > 0) {
            req.flash('error', 'Request already send to this artist.');
            return res.redirect('/artists/' + idArtist);
          } else {
            newMessage.save()
              .then(() => {
                return res.redirect('/artists');
              })
              .catch((error) => {
                console.log(error);
              });
          }
        })
        .catch(next);
    })
    .catch(next);
});

module.exports = router;
