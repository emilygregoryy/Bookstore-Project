import React, { useContext, useState } from 'react';
import { CartContext } from '../context/CartContext';

const BookList = ({ books }) => {
  const [visibleDescription, setVisibleDescription] = useState(null);
  const { addToCart } = useContext(CartContext);

  const toggleDescription = (id) => {
    setVisibleDescription(visibleDescription === id ? null : id);
  };

  return (
    <div>
      <h1>Book List</h1>
      {books.length > 0 ? (
        <ul className="book-grid">
          {books.map(book => (
            <li key={book.id} className="book-item">
              <div className="book-item-header">
                <button className="toggle-description" onClick={() => toggleDescription(book.id)}>
                  {visibleDescription === book.id ? '-' : '+'}
                </button>
              </div>
              <h2>{book.title}</h2>
              <p>{book.author}</p>
              <p>${book.price}</p>
              {visibleDescription === book.id && <p className="description">{book.description}</p>}
              <button className="add-to-cart" onClick={() => addToCart(book)}>Add to Cart</button>
            </li>
          ))}
        </ul>
      ) : (
        <p className="no-books">No books available.</p>
      )}
    </div>
  );
};

export default BookList;
