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
    username: 'Artist01',
    password: hashedPassword,
    name: 'Jhon',
    email: 'jhon@jur.com',
    telephone: '1122334455',
    homepage: 'https://github.com/esaujc/linkyart',
    image: 'https://i.ytimg.com/vi/tA7Us1FXhak/maxresdefault.jpg'
  },
  {
    is_artist: true,
    username: 'Artist02',
    password: hashedPassword,
    name: 'Ann',
    email: 'ann@jur.com',
    telephone: '6655443322',
    homepage: 'https://github.com/esaujc/linkyart',
    image: 'https://i.amz.mshcdn.com/5tMk6gfURH36jfPU6o9PiyFuPoc=/950x534/filters:quality(90)/https%3A%2F%2Fblueprint-api-production.s3.amazonaws.com%2Fuploads%2Fcard%2Fimage%2F833061%2F515dc9e4-cc79-4539-b135-5dc780fc9b05.jpg'
  },
  {
    is_artist: true,
    username: 'Artist03',
    password: hashedPassword,
    name: 'Raul',
    email: 'raul@jur.com',
    telephone: '233445566',
    homepage: 'https://github.com/esaujc/linkyart',
    image: 'https://www.aaj.tv/wp-content/uploads/2018/10/vinci-960x540.jpg'
  },
  {
    is_artist: true,
    username: 'Artist04',
    password: hashedPassword,
    name: 'Raul',
    email: 'raul@jur.com',
    telephone: '233445566',
    homepage: 'https://github.com/esaujc/linkyart',
    image: 'https://poncerobles.com/es/img/temporadas/13_4.jpg'
  },
  {
    is_artist: true,
    username: 'Artist05',
    password: hashedPassword,
    name: 'Peter',
    email: 'peter@jur.com',
    telephone: '433445566',
    homepage: 'https://github.com/esaujc/linkyart',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0a/The_Great_Wave_off_Kanagawa.jpg/350px-The_Great_Wave_off_Kanagawa.jpg'
  },
  {
    is_artist: true,
    username: 'Artist06',
    password: hashedPassword,
    name: 'Maria',
    email: 'maria@jur.com',
    telephone: '277745566',
    homepage: 'https://github.com/esaujc/linkyart',
    image: 'https://thumbs-prod.si-cdn.com/aZL_yAaipqpzGHvAUx1-_yz-Bhg=/800x600/filters:no_upscale()/https://public-media.smithsonianmag.com/filer/77/3d/773d7fa1-8ed1-4a95-9571-3c57e68fba36/f504a6.jpg'
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
