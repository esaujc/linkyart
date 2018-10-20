const mongoose = require('mongoose');
const User = require('../Models/User');

// npm install bcrypt
const bcrypt = require('bcrypt');
const saltRounds = 10;
// Signup user
const salt = bcrypt.genSaltSync(saltRounds);
const hashedPassword = bcrypt.hashSync('1234', salt);

const users = [
  {
    is_artist: false,
    username: 'user01',
    password: hashedPassword,
    name: 'Jhon',
    email: 'jhon@jur.com',
    telephone: '1122334455',
    homepage: 'https://github.com/esaujc/linkyart'
  },
  {
    is_artist: false,
    username: 'user02',
    password: hashedPassword,
    name: 'Ann',
    email: 'ann@jur.com',
    telephone: '6655443322',
    homepage: 'https://github.com/esaujc/linkyart'
  },
  {
    is_artist: false,
    username: 'user03',
    password: hashedPassword,
    name: 'Raul',
    email: 'raul@jur.com',
    telephone: '233445566',
    homepage: 'https://github.com/esaujc/linkyart'
  },
  {
    is_artist: false,
    username: 'user04',
    password: hashedPassword,
    name: 'Raul',
    email: 'raul@jur.com',
    telephone: '233445566',
    homepage: 'https://github.com/esaujc/linkyart'
  },
  {
    is_artist: false,
    username: 'user05',
    password: hashedPassword,
    name: 'Peter',
    email: 'peter@jur.com',
    telephone: '433445566',
    homepage: 'https://github.com/esaujc/linkyart'
  },
  {
    is_artist: false,
    username: 'user06',
    password: hashedPassword,
    name: 'Maria',
    email: 'maria@jur.com',
    telephone: '277745566',
    homepage: 'https://github.com/esaujc/linkyart'
  }

];

mongoose.connect('mongodb://localhost/artyApp', { useNewUrlParser: true })
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
