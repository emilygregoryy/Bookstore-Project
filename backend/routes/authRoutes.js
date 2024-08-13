const express = require('express');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const db = require('../db');

const router = express.Router();

router.post('/register', async (req, res) => {
  const { username, password, email } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    db.addUser(username, hashedPassword, email, (err) => {
      if (err) {
        return res.status(500).json({ message: 'Error registering user' });
      }
      res.status(201).json({ message: 'Successfully registered, please log in' });
    });
  } catch (err) {
    res.status(500).json({ message: 'Error registering user' });
  }
});

router.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) return next(err);
    if (!user) return res.status(401).json({ message: 'Incorrect username or password' });
    req.logIn(user, (err) => {
      if (err) return next(err);
      res.status(200).json({ message: 'Successfully logged in' });
    });
  })(req, res, next);
});

router.post('/logout', (req, res) => {
  req.logout((err) => {
    if (err) return res.status(500).json({ message: 'Error logging out' });
    res.status(200).json({ message: 'Successfully logged out' });
  });
});

module.exports = router;
