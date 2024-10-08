import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../Styles/AdminPage.css';

const AdminPage = () => {
  const [books, setBooks] = useState([]);
  const [newBook, setNewBook] = useState({ id: null, title: '', author: '', price: '', description: '' });
  const [sortCriteria, setSortCriteria] = useState('title');
  const navigate = useNavigate();

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

  const handleAddOrUpdateBook = async (e) => {
    e.preventDefault();
    try {
      if (newBook.id) {
        // Update existing book
        await axios.put(`http://localhost:5000/api/books/${newBook.id}`, newBook);
      } else {
        // Add new book
        await axios.post('http://localhost:5000/api/books', newBook);
      }
      fetchBooks(); // Refresh the list of books
      setNewBook({ id: null, title: '', author: '', price: '', description: '' });
    } catch (error) {
      console.error('Error adding or updating book:', error);
    }
  };

  const handleDeleteBook = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/books/${id}`);
      fetchBooks(); // Refresh the list of books
    } catch (error) {
      console.error('Error deleting book:', error);
    }
  };

  const handleEditBook = (book) => {
    setNewBook({ id: book.id, title: book.title, author: book.author, price: book.price, description: book.description });
  };

  const handleLogout = async () => {
    try {
      await axios.post('http://localhost:5000/api/auth/logout');
      navigate('/');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const handleSortChange = (e) => {
    setSortCriteria(e.target.value);
  };

  return (
    <div className="admin-page">
      <div className="admin-header">
        <h1>Admin Dashboard</h1>
        <button className="logout-button" onClick={handleLogout}>Logout</button>
      </div>
      <form onSubmit={handleAddOrUpdateBook}>
        <input
          type="text"
          placeholder="Title"
          value={newBook.title}
          onChange={(e) => setNewBook({ ...newBook, title: e.target.value })}
        />
        <input
          type="text"
          placeholder="Author"
          value={newBook.author}
          onChange={(e) => setNewBook({ ...newBook, author: e.target.value })}
        />
        <input
          type="number"
          placeholder="Price"
          value={newBook.price}
          onChange={(e) => setNewBook({ ...newBook, price: e.target.value })}
        />
        <textarea
          placeholder="Description"
          value={newBook.description}
          onChange={(e) => setNewBook({ ...newBook, description: e.target.value })}
        ></textarea>
        <button type="submit">{newBook.id ? 'Update Book' : 'Add Book'}</button>
      </form>
      <div className="sort-controls">
        <label>Sort by: </label>
        <select value={sortCriteria} onChange={handleSortChange}>
          <option value="title">Title</option>
          <option value="price">Price</option>
        </select>
      </div>
      <h2>Books Inventory</h2>
      <ul>
        {books.map((book) => (
          <li key={book.id}>
            <p>{book.title} by {book.author}</p>
            <p>Price: ${book.price}</p>
            <p>{book.description}</p>
            <button onClick={() => handleEditBook(book)}>Edit</button>
            <button onClick={() => handleDeleteBook(book.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminPage;
