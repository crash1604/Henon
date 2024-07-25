// @author: Chanakya Sharma
// edited: 12th June 2024
// Location: src/components/Header.jsx
// Function:
// This file component is responsible for rendering the
// header of the web page
// Constraint:
// N.A.
import React from 'react';

function Header() {
  return (
    <header className="bg-blue-900 text-white p-4 flex justify-between items-center">
      <h1 className="text-3xl font-bold">Currency Exchange Tracker</h1>
    </header>
  );
}

export default Header;
