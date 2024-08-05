// src/pages/ShoppingCartPage.js
import React from 'react';
import ShoppingCart from '../components/ShoppingCart';
import '../Styles/HomePage.css';
const ShoppingCartPage = () => {
  return (
    <div className="shopping-cart-page">
      <h1>Shopping Cart</h1>
      <ShoppingCart />
    </div>
  );
};

export default ShoppingCartPage;
