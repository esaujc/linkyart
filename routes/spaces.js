var express = require('express');
var router = express.Router();
const Space = require('../Models/Space');
const middlewares = require('../middlewares/middlewares');
const spacesUsers = new Space();

/* GET index home page */
router.get('/', (req, res, next) => {
  Space.find()
    .then(spaces => {
      res.render('spaces/list', { spaces });
    })
    .catch((error) => {
      console.log(error);
    });
  // res.render('index');
});

router.get('/:id', (req, res) => {
  const idSpace = req.params.id;

  Space.findById(idSpace)
    .then((space) => {
      res.render('spaces/detail', { space: space });
    });
});

router.post('/:id', (req, res) => {
  res.send('Aqui envia el mensaje');
});

module.exports = router;
