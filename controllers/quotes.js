const Quote = require('../models/quote');

module.exports = {
    edit,
    create,
    update,
    display,
    destroy,
  };

  async function edit(req, res) {
    try {
        const quote = await Quote.findById(req.params.id);
      res.render('quotes/edit', { quote });
    } catch (error) {
      console.error('Error fetching quote for editing:', error);
      res.status(500).send('Error: Unable to fetch quote for editing.');
    }
  };

  async function create(req, res) {
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
  };

  async function update(req, res) {
    try {
      const { name, quote } = req.body;
      const quoteId = req.params.id;
      const updatedQuote = await Quote.findByIdAndUpdate(quoteId, { name, quote });
      res.redirect('/quotes');
    } catch (error) {
      console.error('Error updating the quote:', error);
      res.status(500).send('Error: Unable to update the quote.');
    }
  };

  async function display(req, res) {
    try {
      const quotes = await Quote.find({user: req.user._id});
      res.render('quotes/index', { quotes });
    } catch (error) {
      console.error('Error fetching quotes:', error);
      res.status(500).send('Error: Unable to fetch quotes, please Log In.');
      
    }
  };

  async function destroy(req, res) {
    try {
      const quoteId = req.params.id;
      await Quote.findByIdAndRemove(quoteId);
      res.redirect('/quotes');
    } catch (error) {
      console.error('Error deleting the quote:', error);
      res.status(500).send('Error: Unable to delete the quote.');
    }
  };