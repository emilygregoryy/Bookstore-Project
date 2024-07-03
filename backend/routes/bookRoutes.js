// routes/bookRoutes.js
const express = require('express');
const router = express.Router();

// Temporary book data
const books = [
  { id: 1, title: 'Book One', author: 'Author One', price: 29.99 },
  { id: 2, title: 'Book Two', author: 'Author Two', price: 19.99 },
  { id: 3, title: 'Book Three', author: 'Author Three', price: 39.99 },
];

router.get('/', (req, res) => {
  res.json(books);
});

module.exports = router;
