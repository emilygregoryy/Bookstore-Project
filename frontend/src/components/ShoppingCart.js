// src/components/ShoppingCart.js
import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import './ShoppingCart.css'; // Import the CSS file

const ShoppingCart = () => {
  const { cart, removeFromCart } = useContext(CartContext);

  return (
    <div className="shopping-cart">
      {cart.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <ul>
          {cart.map((book) => (
            <li key={book.id}>
              <div>
                <h2>{book.title}</h2>
                <p>{book.author}</p>
                <p>${book.price}</p>
              </div>
              <button onClick={() => removeFromCart(book.id)}>Remove</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ShoppingCart;
