const mongoose = require('mongoose');
const Space = require('../Models/Space');
const ObjectId = mongoose.Types.ObjectId;

const spaces = [
  {
    owner: ObjectId('5bcb42b89e9fea2931581199'), // User05
    name: 'Linky Art Gallery',
    contactName: 'Frank',
    email: 'frank@lag.com',
    telephone: '123456',
    homepage: 'https://github.com/esaujc/linkyart'
  },
  {
    owner: ObjectId('5bcb42b89e9fea2931581198'), // User04
    name: 'Ron Gallery',
    contactName: 'Ron',
    email: 'ron@ron-gallery.com',
    telephone: '123456',
    homepage: 'https://github.com/esaujc/linkyart'
  },
  {
    owner: ObjectId('5bcb42b89e9fea293158119a'), // User06
    name: 'Linky Art Restaurant',
    contactName: 'Lorel',
    email: 'lorel@lagrest.com',
    telephone: '123456',
    homepage: 'https://github.com/esaujc/linkyart'
  }

];

mongoose.connect('mongodb://localhost/linkyartApp', { useNewUrlParser: true })
  .then(() => {
    console.log('Connected to Mongo!');
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
