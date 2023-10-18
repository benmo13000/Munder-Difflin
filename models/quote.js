const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const quoteSchema = new Schema({
    quote: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
});

const Quote = mongoose.model('Quote', quoteSchema);
module.exports = Quote;


//content in schema and the person who said it