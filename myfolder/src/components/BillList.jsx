import React, { useEffect, useState } from 'react';

function BillList() {
  const [bills, setBills] = useState([]);

  useEffect(() => {
    const savedBills = JSON.parse(localStorage.getItem('bills') || '[]');
    setBills(savedBills);
  }, []);

  // ✅ Add helper functions HERE (inside the component, but before return)

  const formatBillMessage = (bill) => {
    let message = `🧾 *Bill Details*\n`;
    message += `👤 Customer: ${bill.customerName}\n`;
    message += `🍽️ Table: ${bill.tableNumber}\n`;
    message += `📅 Date: ${bill.date}\n\n`;

    message += `🍕 Items:\n`;
    bill.items.forEach(item => {
      message += `- ${item.name} x ${item.qty} = ₹${item.qty * item.price}\n`;
    });

    message += `\n💰 *Total:* ₹${bill.total}`;
    return message;
  };

  const sendToWhatsApp = (bill) => {
    const message = encodeURIComponent(formatBillMessage(bill));
    window.open(`https://wa.me/?text=${message}`, '_blank');
  };

  const sendToTelegram = (bill) => {
    const message = encodeURIComponent(formatBillMessage(bill));
    window.open(`https://t.me/share/url?url=&text=${message}`, '_blank');
  };

  // ✅ Now inside return, use them in JSX
  return (
    <div>
      <h2>📜 All Saved Bills</h2>
      {bills.length === 0 ? (
        <p>No bills saved yet.</p>
      ) : (
        bills.map(bill => (
          <div key={bill.id} style={{ border: '1px solid gray', marginBottom: '20px', padding: '10px' }}>
            <p><strong>Customer:</strong> {bill.customerName}</p>
            <p><strong>Table:</strong> {bill.tableNumber}</p>
            <p><strong>Date:</strong> {bill.date}</p>
            <ul>
              {bill.items.map((item, index) => (
                <li key={index}>{item.name} x {item.qty} = ₹{item.qty * item.price}</li>
              ))}
            </ul>
            <p><strong>Total:</strong> ₹{bill.total}</p>

            {/* ✅ Buttons to send bill */}
            <button onClick={() => sendToWhatsApp(bill)}>📤 Send to WhatsApp</button>
            {/* <button onClick={() => sendToTelegram(bill)} style={{ marginLeft: '10px' }}>📤 Send to Telegram</button> */}
          </div>
        ))
      )}
    </div>
  );
}

export default BillList;
