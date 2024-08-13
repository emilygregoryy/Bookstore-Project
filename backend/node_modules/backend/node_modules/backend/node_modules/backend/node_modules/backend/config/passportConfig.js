const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const db = require('../db');

passport.use(new LocalStrategy(
  function(username, password, done) {
    db.findUserByUsername(username, (err, results) => {
      if (err) { return done(err); }
      if (results.length === 0) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      const user = results[0];
      bcrypt.compare(password, user.password, (err, isMatch) => {
        if (err) { return done(err); }
        if (!isMatch) {
          return done(null, false, { message: 'Incorrect password.' });
        }
        return done(null, user);
      });
    });
  }
));

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  db.query('SELECT * FROM users WHERE id = ?', [id], function(err, results) {
    if (err) { return done(err); }
    done(null, results[0]);
  });
});

module.exports = passport;
