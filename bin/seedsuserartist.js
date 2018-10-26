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
    is_artist: true,
    username: 'kotaro',
    password: hashedPassword,
    name: 'Kotaro Fukui',
    email: 'info@kotaro-f.com',
    telephone: '812345654',
    homepage: 'http://www.kotaro-f.com/profile/index_e.html',
    image: '/images/users/kotaro_profile.jpg'
  },
  {
    is_artist: true,
    username: 'acosta',
    password: hashedPassword,
    name: 'Acosta Gustavo',
    email: 'info@gustavoacosta.com',
    telephone: '6655443322',
    homepage: 'https://www.gustavoacosta.com/',
    image: '/images/users/acosta_profile.jpeg'
  },
  {
    is_artist: true,
    username: 'himoru',
    password: hashedPassword,
    name: 'Hiromu Arakawa',
    email: 'fullmetal@viz.com',
    telephone: '815639834',
    homepage: 'https://www.viz.com/fullmetal-alchemist',
    image: '/images/users/himoru_profile.jpg'
  },
  {
    is_artist: true,
    username: 'raul',
    password: hashedPassword,
    name: 'Raul Cote',
    email: 'raul@godzilla.com',
    telephone: '34654883301',
    homepage: 'https://raulcote.github.io/go-go-godzilla/',
    image: '/images/raul_profile.jpg'
  },
  {
    is_artist: true,
    username: 'nadja',
    password: hashedPassword,
    name: 'Nadja Verena',
    email: 'nvmstudio@gmail.com',
    telephone: '49224036177',
    homepage: 'http://www.nadjamarcin.de/',
    image: '/images/users/nadja_profile.jpg'
  },
  {
    is_artist: true,
    username: 'john',
    password: hashedPassword,
    name: 'John A. Parks',
    email: 'johnaparks@msn.com',
    telephone: '9177013338',
    homepage: 'http://www.johnaparks.com/parks.html',
    image: '/images/users/john_profile.jpg'
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
