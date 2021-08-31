const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: String,
    descriptions: String,
    author: [String],
    isbn: [String],
    price: [Number],
    format: [String]
});

module.exports = mongoose.model('Books',bookSchema);