const mysql = require('mysql');

const pool = mysql.createPool({
  connectionLimit: 10,
  host: 'localhost',
  user: 'user',
  password: 'pass',
  database: 'bookstore'
});

function query(sql, params, callback) {
  pool.getConnection((err, connection) => {
    if (err) {
      callback(err, null);
      return;
    }

    connection.query(sql, params, (error, result) => {
      connection.release();
      if (error) {
        callback(error, null);
        return;
      }

      callback(null, result);
    });
  });
}

function findUserByUsername(username, callback) {
  const sql = 'SELECT * FROM users WHERE username = ?';
  query(sql, [username], callback);
}

function addUser(username, passwordHash, email, callback) {
  const sql = 'INSERT INTO users (username, password, email) VALUES (?, ?, ?)';
  query(sql, [username, passwordHash, email], callback);
}

module.exports = {
  query,
  findUserByUsername,
  addUser
};
