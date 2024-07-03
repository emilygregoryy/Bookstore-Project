// src/components/BookList.js
import React from 'react';
import { Link } from 'react-router-dom';

const BookList = ({ books }) => {
  return (
    <div className="book-list">
      {books.length === 0 ? (
        <p>No books available</p>
      ) : (
        books.map((book) => (
          <div key={book.id} className="book-item">
            <h2><Link to={`/books/${book.id}`}>{book.title}</Link></h2>
            <p>{book.author}</p>
            <p>${book.price}</p>
            <button>Add to Cart</button>
          </div>
        ))
      )}
    </div>
  );
};

export default BookList;
