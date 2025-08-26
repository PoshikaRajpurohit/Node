// book.model.js
const mongoose = require("mongoose");

const bookSchema = mongoose.Schema({
   image: {
    type: String,
    required: true
},
    description: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    language: {
        type: String,
        required: true
    },
    edition: {
        type: String,
        required: true
    },
    genre: {
        type: String,
        required: true
    },
    pages: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },

    publishedYear: {
        type: Number,
        required: true
    },

});

let Book = mongoose.model('Book', bookSchema);
module.exports = Book;
