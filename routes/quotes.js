const express = require('express');
const router = express.Router();
const Quote = require('../models/quote');


router.get('/:id/edit', async (req, res) => {
    try {
        const quote = await Quote.findById(req.params.id);
      res.render('quotes/edit', { quote });
    } catch (error) {
      console.error('Error fetching quote for editing:', error);
      res.status(500).send('Error: Unable to fetch quote for editing.');
    }
  });
  
  router.put('/:id/edit', async (req, res) => {
    try {
      const { name, quote } = req.body;
      const quoteId = req.params.id;
      const updatedQuote = await Quote.findByIdAndUpdate(quoteId, { name, quote });
      res.redirect('/quotes');
    } catch (error) {
      console.error('Error updating the quote:', error);
      res.status(500).send('Error: Unable to update the quote.');
    }
  });

// Define routes related to quotes
router.get('/', async (req, res) => {
  // Retrieve quotes from the database and render a view
  try {
    const quotes = await Quote.find({user: req.user._id});
    res.render('quotes/index', { quotes });
  } catch (error) {
    console.error('Error fetching quotes:', error);
    res.status(500).send('Error: Unable to fetch quotes, please Log In.');
  }
});

router.get('/add', (req, res) => {
  // Display a form to add a new quote
  res.render('quotes/add');
});

router.post('/', async (req, res) => {
  // Save a new quote to the database
  try {
    const { name, quote } = req.body;
    const user = req.user._id;
    const newQuote = new Quote({ name, quote, user });
    await newQuote.save();
    res.redirect('/quotes');
  } catch (error) {
    console.error('Error adding a new quote:', error);
    res.status(500).send('Error: Unable to add a new quote, please try logging in :)');
  }
});

// Add more routes for updating and deleting quotes as needed
router.delete('/:id', async (req, res) => {
    try {
      const quoteId = req.params.id;
      await Quote.findByIdAndRemove(quoteId);
      res.redirect('/quotes');
    } catch (error) {
      console.error('Error deleting the quote:', error);
      res.status(500).send('Error: Unable to delete the quote.');
    }
  });

module.exports = router;