import React from 'react';
import Billing from './components/Billing';
import BillList from './components/BillList';
import './App.css';

function App() {
  return (
    <div className="App">
      <h1>🍽️ Restaurant Billing System</h1>
      <Billing />
      <hr />
      <BillList />
    </div>
  );
}

export default App;
