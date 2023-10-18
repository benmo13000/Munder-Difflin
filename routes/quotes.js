const express = require('express');
const router = express.Router();
const Quote = require('../models/quote');

// Define routes related to quotes
router.get('/', async (req, res) => {
  // Retrieve quotes from the database and render a view
  try {
    const quotes = await Quote.find({});
    res.render('quotes/index', { quotes });
  } catch (error) {
    console.error('Error fetching quotes:', error);
    res.status(500).send('Error: Unable to fetch quotes.');
  }
});

router.get('/add', (req, res) => {
  // Display a form to add a new quote
  res.render('quotes/add');
});

router.post('/add', async (req, res) => {
  // Save a new quote to the database
  try {
    const { name, quote } = req.body;
    const newQuote = new Quote({ name, quote });
    await newQuote.save();
    res.redirect('/quotes');
  } catch (error) {
    console.error('Error adding a new quote:', error);
    res.status(500).send('Error: Unable to add a new quote.');
  }
});

// Add more routes for updating and deleting quotes as needed

module.exports = router;