// src/pages/LoginPage.js
import React, { useState } from 'react';
import axios from 'axios';
import '../Styles/LoginPage.css';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', { username, password });
      console.log(response.data);
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  return (
    <div className="login-page">
      <h1>Bookstore Admin: Log In Here to Access Inventory</h1>
      <form onSubmit={handleLogin}>
        <label>
          Username:
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </label>
        <label>
          Password:
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginPage;
