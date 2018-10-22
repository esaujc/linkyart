const mongoose = require('mongoose');
const Space = require('../Models/Space');
const ObjectId = mongoose.Types.ObjectId;
const User = require('../Models/User');

const spaces = [
  {
    owner: ObjectId('111111111111111111111111'), // User01
    name: 'Linky Art Gallery',
    contactName: 'Frank',
    email: 'frank@lag.com',
    telephone: '123456',
    homepage: 'https://github.com/esaujc/linkyart'
  },
  {
    owner: ObjectId('111111111111111111111111'), // User02
    name: 'Ron Gallery',
    contactName: 'Ron',
    email: 'ron@ron-gallery.com',
    telephone: '123456',
    homepage: 'https://github.com/esaujc/linkyart'
  },
  {
    owner: ObjectId('111111111111111111111111'), // User03
    name: 'Linky Art Restaurant',
    contactName: 'Lorel',
    email: 'lorel@lagrest.com',
    telephone: '123456',
    homepage: 'https://github.com/esaujc/linkyart'
  },
  {
    owner: ObjectId('111111111111111111111111'), // User04
    name: 'Mart Art Gallery',
    contactName: 'Marco',
    email: 'marco@lag.com',
    telephone: '123456',
    homepage: 'https://github.com/esaujc/linkyart'
  },
  {
    owner: ObjectId('111111111111111111111111'), // User05
    name: 'Mat Gallery',
    contactName: 'Mat',
    email: 'mat@math-gallery.com',
    telephone: '123456',
    homepage: 'https://github.com/esaujc/linkyart'
  },
  {
    owner: ObjectId('111111111111111111111111'), // User06
    name: 'Gallery Jarl',
    contactName: 'Oliver',
    email: 'oliver@ljarlgallery.com',
    telephone: '123456',
    homepage: 'https://github.com/esaujc/linkyart'
  }

];

mongoose.connect('mongodb://localhost/artyApp', { useNewUrlParser: true })
  .then(() => {
    console.log('Connected to Mongo!');
    User.find()
      .then((users) => {
        // console.log(users.length);
        let indx = 0;
        users.forEach((user, index) => {
          if (user.is_artist === false) {
            spaces[indx].owner = ObjectId(user._id);
            indx++;
          }
        });
        // for (let i = 2; i < users.length; i++) {
        //   console.log(ObjectId(users[i]._id));
        //   spaces[i].owner = ObjectId(users[i]._id);
        // }
        Space.create(spaces)
          .then(() => {
            console.log('Add Spaces to Users correctly.');
            mongoose.connection.close();
          })
          .catch((error) => {
            console.log(error, 'Error');
            mongoose.connection.close();
          });
      }).catch(err => {
        console.error('Error connecting to mongo', err);
      });
  });
