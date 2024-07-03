// src/pages/HomePage.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BookList from '../components/BookList';
import './HomePage.css'; // Import the CSS file

const HomePage = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/books');
        setBooks(response.data);
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    };

    fetchBooks();
  }, []);

  return (
    <div className="homepage">
      <h1>Welcome to the Bookstore</h1>
      <BookList books={books} />
    </div>
  );
};

export default HomePage;
