const express = require('express');
const router = express.Router();
const db = require('./db');

// Get all books
router.get('/books', (req, res) => {
  db.query('SELECT * FROM books', [], (err, result) => {
    if (err) {
      res.status(500).send('Error fetching books');
    } else {
      res.json(result);
    }
  });
});

// Add a new book
router.post('/books', (req, res) => {
  const { title, author, price } = req.body;
  db.query('INSERT INTO books (title, author, price) VALUES (?, ?, ?)', [title, author, price], (err, result) => {
    if (err) {
      res.status(500).send('Error adding book');
    } else {
      res.status(201).send('Book added successfully');
    }
  });
});

// Update a book
router.put('/books/:id', (req, res) => {
  const { title, author, price } = req.body;
  const bookId = req.params.id;
  db.query('UPDATE books SET title = ?, author = ?, price = ? WHERE id = ?', [title, author, price, bookId], (err, result) => {
    if (err) {
      res.status(500).send('Error updating book');
    } else {
      res.status(200).send('Book updated successfully');
    }
  });
});

// Delete a book
router.delete('/books/:id', (req, res) => {
  const bookId = req.params.id;
  db.query('DELETE FROM books WHERE id = ?', [bookId], (err, result) => {
    if (err) {
      res.status(500).send('Error deleting book');
    } else {
      res.status(200).send('Book deleted successfully');
    }
  });
});

module.exports = router;
