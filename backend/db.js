// db.js
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

module.exports = { query };
