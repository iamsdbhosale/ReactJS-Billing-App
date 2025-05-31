import React, { useState } from 'react';
import menuData from '../data/menu.json';

function Billing() {
  const [cart, setCart] = useState([]);
  const [customerName, setCustomerName] = useState('');
  const [tableNumber, setTableNumber] = useState('');
  const [bills, setBills] = useState([]);

  const addItem = (item) => {
    const existing = cart.find(i => i.id === item.id);
    if (existing) {
      setCart(cart.map(i => i.id === item.id ? { ...i, qty: i.qty + 1 } : i));
    } else {
      setCart([...cart, { ...item, qty: 1 }]);
    }
  };

  const removeItem = (id) => {
    setCart(cart.filter(i => i.id !== id));
  };

  const total = cart.reduce((acc, item) => acc + item.price * item.qty, 0);

  const saveBill = () => {
    if (!customerName || !tableNumber) {
      alert("Please enter customer name and table number.");
      return;
    }

    const newBill = {
      id: Date.now(),
      customerName,
      tableNumber,
      items: cart,
      total,
      date: new Date().toLocaleString()
    };

    const stored = JSON.parse(localStorage.getItem('bills') || '[]');
    localStorage.setItem('bills', JSON.stringify([...stored, newBill]));
    setCart([]);
    setCustomerName('');
    setTableNumber('');
    setBills([...bills, newBill]);
  };

  return (
    <div>
      <h2>🧑‍🍳 New Order</h2>
      <input
        type="text"
        placeholder="Customer Name"
        value={customerName}
        onChange={(e) => setCustomerName(e.target.value)}
        style={{ marginRight: '10px' }}
      />
      <input
        type="text"
        placeholder="Table Number"
        value={tableNumber}
        onChange={(e) => setTableNumber(e.target.value)}
      />

      <h3>Menu</h3>
      {menuData.map(item => (
        <div key={item.id}>
          {item.name} - ₹{item.price}
          <button onClick={() => addItem(item)}>Add</button>
        </div>
      ))}

      <h3>Cart</h3>
      {cart.map(item => (
        <div key={item.id}>
          {item.name} x {item.qty} = ₹{item.price * item.qty}
          <button onClick={() => removeItem(item.id)}>Remove</button>
        </div>
      ))}

      <h4>Total: ₹{total}</h4>
      <button onClick={saveBill} disabled={cart.length === 0}>Save Bill</button>
    </div>
  );
}

export default Billing;
