import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BookList from '../components/BooksList';
import BookSearch from '../components/BookSearch'; 
import '../Styles/HomePage.css';

const HomePage = () => {
  const [books, setBooks] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

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

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const addToCart = (id) => {
    console.log(`Book with ID ${id} added to cart`);
  };

  const filteredBooks = books.filter(book =>
    book.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="homepage">
      <h1>Welcome to the Bookstore</h1>
      <div className="search-container">
        <BookSearch onSearch={handleSearch} />
      </div>
      <BookList books={filteredBooks} addToCart={addToCart} />
    </div>
  );
};

export default HomePage;
