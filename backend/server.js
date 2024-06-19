const express = require('express');
const mysql = require('mysql');
const routes = require('./routes');

const app = express();

// Create a MySQL connection pool
const pool = mysql.createPool({
  connectionLimit: 10,
  host: 'localhost',
  user: 'user',
  password: 'pass',
  database: 'bookstore'
});

// Middleware to parse JSON bodies
app.use(express.json());

// Routes
app.use('/api', routes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
