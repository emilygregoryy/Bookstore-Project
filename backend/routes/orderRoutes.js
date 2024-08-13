const express = require('express');
const router = express.Router();
const db = require('../db');

router.post('/place', (req, res) => {
  const { userId, books } = req.body;
  const query = 'INSERT INTO orders (user_id) VALUES (?)';
  db.query(query, [userId], (err, result) => {
    if (err) return res.status(500).send('Error placing order');
    const orderId = result.insertId;
    const orderItems = books.map(book => [orderId, book.id, book.quantity]);
    const orderItemsQuery = 'INSERT INTO order_items (order_id, book_id, quantity) VALUES ?';
    db.query(orderItemsQuery, [orderItems], (err, result) => {
      if (err) return res.status(500).send('Error placing order items');
      res.status(201).send('Order placed successfully');
    });
  });
});

module.exports = router;
