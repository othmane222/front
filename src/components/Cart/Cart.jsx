import React from 'react';
import './Cart.css'; // Import a CSS file for styling, if needed
import LandingNav from '../LandingNav';

const Cart = ({ cartItems, onClose }) => {
  const handleRemoveItem = (itemId) => {
    // Logic to remove an item from the cart
    console.log("Removing item with id:", itemId);
    // You would need to handle state updates in a parent component or use a state management library
  };

  return (
    <div className="cart-container">
      <LandingNav/>
      <div className="cart-header">
        <h2>Your Cart</h2>
        //cart code
      </div>
    </div>
  );
};

export default Cart;
