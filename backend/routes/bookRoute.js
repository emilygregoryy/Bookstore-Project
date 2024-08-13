const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/', (req, res) => {
  db.query('SELECT * FROM books', [], (err, results) => {
    if (err) return res.status(500).send('Error fetching books');
    res.json(results);
  });
});

router.post('/', (req, res) => {
  const { title, author, price } = req.body;
  db.query('INSERT INTO books (title, author, price) VALUES (?, ?, ?)', [title, author, price], (err) => {
    if (err) return res.status(500).send('Error adding book');
    res.status(201).send('Book added successfully');
  });
});

router.put('/:id', (req, res) => {
  const { title, author, price } = req.body;
  const bookId = req.params.id;
  db.query('UPDATE books SET title = ?, author = ?, price = ? WHERE id = ?', [title, author, price, bookId], (err) => {
    if (err) return res.status(500).send('Error updating book');
    res.status(200).send('Book updated successfully');
  });
});

router.delete('/:id', (req, res) => {
  const bookId = req.params.id;
  db.query('DELETE FROM books WHERE id = ?', [bookId], (err) => {
    if (err) return res.status(500).send('Error deleting book');
    res.status(200).send('Book deleted successfully');
  });
});

router.put('/books/update/:id', (req, res) => {
  const { title, author, price, description } = req.body;
  const bookId = req.params.id;
  db.query('UPDATE books SET title = ?, author = ?, price = ?, description = ? WHERE id = ?', [title, author, price, description, bookId], (err) => {
    if (err) return res.status(500).send('Error updating book');
    res.status(200).send('Book updated successfully');
  });
});


module.exports = router;
