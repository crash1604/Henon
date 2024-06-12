// @author: Chanakya Sharma
// edited: 12th June 2024
// Location: src/components/MiniHeader.jsx
// Function:
// This file component serves as a placeholder for Setting base 
// currency and target currency. This component also calls frankfurter
// api to get latest rates between 3 api's. This component also 
// implements swap button functionality
// Constraint:
// Only supports 3 Currencies as specified by document

import React from 'react';

const MiniHeader = ({ fromCurrency, setFromCurrency, toCurrency, setToCurrency, conversionRate }) => {
  const handleSwap = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  return (
    <div className="hidden md:flex items-center m-4 space-x-2">
      <select
        className="bg-white text-black text-xl font-semibold p-2 rounded-3xl"
        value={fromCurrency}
        onChange={(e) => setFromCurrency(e.target.value)}
      >
        <option value="USD">USD</option>
        <option value="CAD">CAD</option>
        <option value="EUR">EUR</option>
      </select>
      <button className="bg-blue-500 text-white p-2 rounded-3xl transition-all duration-400" onClick={handleSwap}>Swap</button>
      <select
        className="bg-white text-black text-xl font-semibold p-2 rounded-3xl"
        value={toCurrency}
        onChange={(e) => setToCurrency(e.target.value)}
      >
        <option value="USD">USD</option>
        <option value="CAD">CAD</option>
        <option value="EUR">EUR</option>
      </select>
      <span className="ml-2 text-lg font-medium">
        {conversionRate ? `1 ${fromCurrency} = ${conversionRate} ${toCurrency}` : 'Loading...'}
      </span>
    </div>
  );
};

export default MiniHeader;
