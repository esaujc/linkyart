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
    image: 'http://www.kotaro-f.com/profile/images/kotaro_photo.jpg'
  },
  {
    is_artist: true,
    username: 'acosta',
    password: hashedPassword,
    name: 'Acosta Gustavo',
    email: 'info@gustavoacosta.com',
    telephone: '6655443322',
    homepage: 'https://www.gustavoacosta.com/',
    image: 'https://www.gustavoacosta.com/uploads/8/1/6/6/81666230/published/img-4866.jpeg?1514145623'
  },
  {
    is_artist: true,
    username: 'himoru',
    password: hashedPassword,
    name: 'Hiromu Arakawa',
    email: 'fullmetal@viz.com',
    telephone: '815639834',
    homepage: 'https://www.viz.com/fullmetal-alchemist',
    image: 'https://dw9to29mmj727.cloudfront.net/promo/2016/5352-SeriesHeaders_Tier01_FMAv2_2000x800.jpg'
  },
  {
    is_artist: true,
    username: 'raul',
    password: hashedPassword,
    name: 'Raul Cote',
    email: 'raul@godzilla.com',
    telephone: '34654883301',
    homepage: 'https://raulcote.github.io/go-go-godzilla/',
    img: 'https://vignette.wikia.nocookie.net/headhuntersholosuite/images/8/89/Atomic_breath.jpg/revision/latest?cb=20140923005559'
  },
  {
    is_artist: true,
    username: 'nadja',
    password: hashedPassword,
    name: 'Nadja Verena',
    email: 'nvmstudio@gmail.com',
    telephone: '49224036177',
    homepage: 'http://www.nadjamarcin.de/',
    image: 'http://www.nadjamarcin.de/public/images/photography/jedi1.jpg'
  },
  {
    is_artist: true,
    username: 'john',
    password: hashedPassword,
    name: 'John A. Parks',
    email: 'johnaparks@msn.com',
    telephone: '9177013338',
    homepage: 'http://www.johnaparks.com/parks.html',
    image: 'http://www.johnaparks.com/alex.jpg'
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
