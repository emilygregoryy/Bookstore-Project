const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/', (req, res) => {
  const sql = 'SELECT * FROM books';
  db.query(sql, [], (err, books) => {
    if (err) {
      console.error('Error fetching books:', err);
      res.status(500).send('Internal Server Error');
      return;
    }
    res.json(books);
  });
});

module.exports = router;
