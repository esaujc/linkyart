const mongoose = require('mongoose');
const User = require('../Models/User');
require('dotenv').config();

// npm install bcrypt
const bcrypt = require('bcrypt');
const saltRounds = 10;
// Signup user
const salt = bcrypt.genSaltSync(saltRounds);
const hashedPassword = bcrypt.hashSync('1234', salt);

const users = [
  {
    is_artist: false,
    username: 'kamelm',
    password: hashedPassword,
    name: 'Kamel Mennour',
    email: 'info@kamelmennour.com',
    telephone: '33156240363',
    homepage: 'http://www.kamelmennour.com/',
    image: '/images/users/kamelm_profile.jpeg'
  },
  {
    is_artist: false,
    username: 'thadro',
    password: hashedPassword,
    name: 'Thaddaeus Ropac',
    email: 'info@ropac.net',
    telephone: '436655443322',
    homepage: 'https://www.ropac.net/',
    image: '/images/users/thadro_profile.jpg'
  },
  {
    is_artist: false,
    username: 'lien',
    password: hashedPassword,
    name: 'Lien Truong',
    email: 'info@lientruong',
    telephone: '463458901',
    homepage: 'https://www.lientruong.com/',
    image: '/images/users/lien_profile.webp'
  },
  {
    is_artist: false,
    username: 'sadie',
    password: hashedPassword,
    name: 'Sadie Coles',
    email: 'info@sadiecoles.com',
    telephone: '442074938611',
    homepage: 'https://www.sadiecoles.com/',
    image: '/images/users/sadie_profile.jpg'
  },
  {
    is_artist: false,
    username: 'massimo',
    password: hashedPassword,
    name: 'Massimo de Carlo',
    email: 'milano@massimodecarlo.com',
    telephone: '390270003987',
    homepage: 'http://www.massimodecarlo.com/',
    image: '/images/users/massimo_profile.jpg'
  },
  {
    is_artist: false,
    username: 'elba',
    password: hashedPassword,
    name: 'Elba Benítez',
    email: 'info@elbabenitez.com',
    telephone: '34913080468',
    homepage: 'http://www.elbabenitez.com/',
    image: '/images/users/elba_profile.webp'
  }

];

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true })
  .then(() => {
    console.log('Connected to Mongo!');
    User.create(users)
      .then(() => {
        console.log('Add Users correct.');
        mongoose.connection.close();
      })
      .catch((error) => {
        console.log(error, 'Error');
        mongoose.connection.close();
      });
  }).catch(err => {
    console.error('Error connecting to mongo', err);
  });
