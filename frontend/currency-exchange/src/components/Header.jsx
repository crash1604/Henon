// src/components/Header.jsx
import React from 'react';

function Header() {
  return (
    <header className="bg-blue-500 text-white p-4 flex justify-between items-center">
      <h1 className="text-3xl font-bold">Currency Exchange Tracker</h1>
      <div className="hidden md:flex items-center space-x-2">
        <select className="bg-white text-black p-2 rounded">
          <option>USD</option>
          {/* place holder value */}
        </select>
        <button className="bg-white text-black p-2 rounded">Swap</button>
        <select className="bg-white text-black p-2 rounded">
          <option>CAD</option>
          {/* place holder value */}
        </select>
        <span className="ml-2">1 USD = 1.25 CAD</span>
      </div>
    </header>
  );
}

export default Header;
