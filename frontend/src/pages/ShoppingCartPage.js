import React, { useContext, useState, useEffect } from 'react';
import { CartContext } from '../context/CartContext';
import '../Styles/ShoppingCart.css'; 

const ShoppingCartPage = () => {
  const { cart, removeFromCart, clearCart } = useContext(CartContext);
  const [orderNumber, setOrderNumber] = useState(null);
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    address: '',
    email: '',
  });

  useEffect(() => {
    console.log("Order Number State Updated:", orderNumber);
  }, [orderNumber]);

  const handleCheckout = () => {
    const newOrderNumber = Math.floor(Math.random() * 1000000);
    console.log("Generated Order Number:", newOrderNumber);
    setOrderNumber(newOrderNumber);
    setTimeout(() => {
      clearCart();
    }, 100); 
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCustomerInfo({
      ...customerInfo,
      [name]: value,
    });
  };

  return (
    <div className="cart">
      <h2>Shopping Cart</h2>
      {cart.length > 0 || orderNumber ? (
        <div>
          {orderNumber ? (
            <div>
              <p className="order-number">Order Number: {orderNumber}</p>
              <p>Your cart is now empty. Thank you for your purchase!</p>
            </div>
          ) : (
            <>
              <ul>
                {cart.map(book => (
                  <li key={book.id}>
                    <div>
                      <h3>{book.title}</h3>
                      <p>{book.author}</p>
                      <p>${book.price}</p>
                    </div>
                    <button onClick={() => removeFromCart(book.id)}>Remove</button>
                  </li>
                ))}
              </ul>
              <div className="total">Total: ${cart.reduce((total, book) => total + book.price, 0).toFixed(2)}</div>
              <h3>Customer Information</h3>
              <form>
                <div>
                  <label>Name:</label>
                  <input type="text" name="name" value={customerInfo.name} onChange={handleChange} />
                </div>
                <div>
                  <label>Address:</label>
                  <input type="text" name="address" value={customerInfo.address} onChange={handleChange} />
                </div>
                <div>
                  <label>Email:</label>
                  <input type="email" name="email" value={customerInfo.email} onChange={handleChange} />
                </div>
                <button type="button" onClick={handleCheckout}>Checkout</button>
              </form>
            </>
          )}
        </div>
      ) : (
        <p>Your cart is empty.</p>
      )}
    </div>
  );
};

export default ShoppingCartPage;
