const mongoose = require('mongoose');
const bookSchema = new mongoose.Schema({
  ISBN: {
    type: Number,
    unique: true,
    required: true,
    dropDups: true,
    max: 9999999999999,
  },
  title: {
    type: String,
    required: true,
  },
  publicationYear: {
    type: String,
  },
});
const Book = mongoose.model('Book', bookSchema);
module.exports = Book;
