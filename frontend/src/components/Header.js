import React from 'react';
import { Link } from 'react-router-dom';
import '../Styles/Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="logo">Bookstore</div>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/cart">Cart</Link>
        <Link to="/login">Staff Login</Link>
        <Link to="/register">Staff Register</Link>
      </nav>
    </header>
  );
};

export default Header;
