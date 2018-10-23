const mongoose = require('mongoose');
const Message = require('../Models/Message');
const ObjectId = mongoose.Types.ObjectId;
require('dotenv').config();

var dateObj = new Date();
var month = dateObj.getUTCMonth() + 1; // months from 1-12
var day = dateObj.getUTCDate();
var year = dateObj.getUTCFullYear();

const newdate = year + '/' + month + '/' + day;

const messages = [
  {
    sender: ObjectId('5bcb42b89e9fea2931581195'), // Artist U01
    spaceToRent: ObjectId('5bcb45947cd79c2c16a16f82'),
    reciever: ObjectId('5bcb42b89e9fea2931581198'), // No Artist U04
    date: newdate
  }

];

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true })
  .then(() => {
    console.log('Connected to Mongo!');
    Message.create(messages)
      .then(() => {
        console.log('Messages add correctly.');
        mongoose.connection.close();
      })
      .catch((error) => {
        console.log(error, 'Error');
        mongoose.connection.close();
      });
  }).catch(err => {
    console.error('Error connecting to mongo', err);
  });
