const express = require('express');
const router = express.Router();
// const destinationsCtrl = require('../controllers/destinations');


//display
router.get('/quotes', async (req, res) => {
    try {
      const response = await fetch('https://oqaas.vercel.app/api/a');
      const data = await response.json();
  
      if (Array.isArray(data)) {
        const quotes = data.map((item) => ({
          name: item.name,
          quote: item.quote,
        }));
        
        res.render('munderDifflin/quotes', { quotes });
      } else {
        console.error('Invalid or missing data in the API response.');
        res.status(500).send('Error: Invalid or missing data in the API response.');
      }
    } catch (error) {
      console.error('Error fetching data from the API:', error);
      res.status(500).send('Error: Unable to fetch data from the API.');
    }
  });
  module.exports = router;