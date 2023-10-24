const express = require('express');
const router = express.Router();
const quotesCtrl = require('../controllers/quotes');
const Quote = require('../models/quote');
const ensureLoggedIn = require('../config/ensureLoggedIn');


router.get('/:id/edit', ensureLoggedIn, quotesCtrl.edit)
  
//update
router.put('/:id/edit', quotesCtrl.update);

  //display (index)
router.get('/', quotesCtrl.display);

//add
router.get('/add', (req, res) => {
  res.render('quotes/add');
});

//create
router.post('/', quotesCtrl.create);

//delete
router.delete('/:id', quotesCtrl.destroy);

module.exports = router;