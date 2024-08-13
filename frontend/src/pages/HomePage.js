import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BookList from '../components/BooksList';
import BookSearch from '../components/BookSearch'; 
import '../Styles/HomePage.css';

const HomePage = () => {
  const [books, setBooks] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortCriteria, setSortCriteria] = useState('title'); 

  useEffect(() => {
    fetchBooks();
  }, [sortCriteria]); 

  const fetchBooks = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/books');
      let sortedBooks = [...response.data];
      sortedBooks.sort((a, b) => {
        if (sortCriteria === 'title') {
          return a.title.localeCompare(b.title);
        } else {
          return a.price - b.price;
        }
      });
      setBooks(sortedBooks);
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleSortChange = (e) => {
    setSortCriteria(e.target.value);
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
      <div className="sort-controls">
        <label>Sort by: </label>
        <select value={sortCriteria} onChange={handleSortChange}>
          <option value="title">Title</option>
          <option value="price">Price</option>
        </select>
      </div>
      <BookList books={filteredBooks} />
    </div>
  );
};

export default HomePage;
