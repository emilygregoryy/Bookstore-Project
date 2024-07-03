// controllers/authController.js
const passport = require('passport');
const bcrypt = require('bcrypt');
const db = require('../config/db');

exports.register = async (req, res) => {
  const { username, password, email } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const query = 'INSERT INTO users (username, password, email) VALUES (?, ?, ?)';
    db.query(query, [username, hashedPassword, email], (err, results) => {
      if (err) return res.status(500).send('Error registering user');
      res.status(201).send('User registered');
    });
  } catch (err) {
    res.status(500).send('Error registering user');
  }
};

exports.login = (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) return next(err);
    if (!user) return res.status(401).send(info.message);
    req.logIn(user, (err) => {
      if (err) return next(err);
      res.status(200).send('User logged in');
    });
  })(req, res, next);
};
