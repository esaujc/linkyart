const mongoose = require('mongoose');
const Space = require('../Models/Space');
const ObjectId = mongoose.Types.ObjectId;
const User = require('../Models/User');
require('dotenv').config();

const spaces = [
  {
    owner: ObjectId('111111111111111111111111'), // User01
    name: '532 THOMAS JAECKEL',
    contactName: 'Lien Truong',
    email: 'info@532gallery.com ',
    telephone: '32003765850',
    homepage: 'http://www.532gallery.com',
    image: '/images/galleries/532_gallery.jpg'
  },
  {
    owner: ObjectId('111111111111111111111111'), // User02
    name: 'CYNTHIA CORBETT',
    contactName: 'Deborah Azzopardi',
    email: 'info@thecynthiacorbettgallery.com',
    telephone: '442089476782',
    homepage: 'www.thecynthiacorbettgallery.com',
    image: '/images/galleries/corbet_gallery.jpg'

  },
  {
    owner: ObjectId('111111111111111111111111'), // User03
    name: 'CANTOR FINE ART',
    contactName: 'Andrew Myers',
    email: 'ljc@cantorfineart.com ',
    telephone: '7003765850',
    homepage: 'https://github.com/esaujc/linkyart',
    image: '/images/galleries/cantor_gallery.jpg'
  },
  {
    owner: ObjectId('111111111111111111111111'), // User04
    name: 'MARK HACHEM',
    contactName: 'Mark Hachem',
    email: 'paris@markhachem.com',
    telephone: '33142769493',
    homepage: 'http://www.markhachem.com',
    image: '/images/galleries/mark_gallery.jpg'
  },
  {
    owner: ObjectId('111111111111111111111111'), // User05
    name: 'IPRECIATION',
    contactName: 'Dongling Wang',
    email: 'enquiry@ipreciation.com',
    telephone: '6563390678',
    homepage: 'http://www.ipreciation.com ',
    image: '/images/galleries/ipreciation_gallery.jpg'
  },
  {
    owner: ObjectId('111111111111111111111111'), // User06
    name: 'SHINSEIDO',
    contactName: 'Minami Aoyama',
    email: 'art@shinseido.com',
    telephone: '81334988383',
    homepage: 'http://www.shinseido.com',
    image: '/images/galleries/shinsheido_gallery.jpg'
  }
];

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true })
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
