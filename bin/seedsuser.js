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
    username: 'noArtist01',
    password: hashedPassword,
    name: 'Kamel Mennour',
    email: 'info@kamelmennour.com',
    telephone: '33156240363',
    homepage: 'http://www.kamelmennour.com/',
    img: 'http://metro.paris/uploads/media/place_poster/0001/01/thumb_299_place_poster_article.jpeg'
  },
  {
    is_artist: false,
    username: 'noArtist02',
    password: hashedPassword,
    name: 'Thaddaeus Ropac',
    email: 'info@ropac.net',
    telephone: '436655443322',
    homepage: 'https://www.ropac.net/',
    img: 'http://the-talks.com/wp-content/uploads/2015/02/Thaddaeus-Ropac-02.jpg'
  },
  {
    is_artist: false,
    username: 'noArtist03',
    password: hashedPassword,
    name: 'Lien Truong',
    email: 'info@lientruong',
    telephone: '463458901',
    homepage: 'https://www.lientruong.com/',
    image: 'https://static.wixstatic.com/media/720b89_0c02f545bf4c4719ab52c7d45204bdc6~mv2.jpg/v1/fill/w_948,h_703,al_c,q_85,usm_0.66_1.00_0.01/720b89_0c02f545bf4c4719ab52c7d45204bdc6~mv2.webp'
  },
  {
    is_artist: false,
    username: 'noArtist04',
    password: hashedPassword,
    name: 'Sadie Coles',
    email: 'info@sadiecoles.com',
    telephone: '442074938611',
    homepage: 'https://www.sadiecoles.com/',
    img: 'http://www.6a.co.uk/img/YnhjbEpiVmh0TjVxRW5VVnQ1WDU3UT09/sadie-coleshq-6a-jd-13.jpg'
  },
  {
    is_artist: false,
    username: 'noArtist05',
    password: hashedPassword,
    name: 'Massimo de Carlo',
    email: 'milano@massimodecarlo.com',
    telephone: '390270003987',
    homepage: 'http://www.massimodecarlo.com/',
    img: 'http://butterboom.com/wp-content/uploads/2016/02/massimodecarlo_butterboom.jpg'
  },
  {
    is_artist: false,
    username: 'noArtist06',
    password: hashedPassword,
    name: 'Elba Benítez',
    email: 'info@elbabenitez.com',
    telephone: '34913080468',
    homepage: 'http://www.elbabenitez.com/',
    img: 'https://res.cloudinary.com/dqzqcuqf9/image/fetch/w_600,f_auto,q_auto:good,dpr_1.0,ar_1.6,c_fill,g_auto/https://d2u3kfwd92fzu7.cloudfront.net/catalog/gallery/1124/profiles/EB_Exterior.jpg'
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
