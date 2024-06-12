// src/components/MiniHeader.jsx
import React from 'react';

const MiniHeader = ({ fromCurrency, setFromCurrency, toCurrency, setToCurrency, conversionRate }) => {
  const handleSwap = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  return (
    <div className="hidden md:flex items-center m-4 space-x-2">
      <select
        className="bg-white text-black p-2 rounded-3xl"
        value={fromCurrency}
        onChange={(e) => setFromCurrency(e.target.value)}
      >
        <option value="USD">USD</option>
        <option value="CAD">CAD</option>
        <option value="EUR">EUR</option>
      </select>
      <button className="bg-white text-black p-2 rounded-3xl" onClick={handleSwap}>Swap</button>
      <select
        className="bg-white text-black p-2 rounded-3xl"
        value={toCurrency}
        onChange={(e) => setToCurrency(e.target.value)}
      >
        <option value="USD">USD</option>
        <option value="CAD">CAD</option>
        <option value="EUR">EUR</option>
      </select>
      <span className="ml-2">
        {conversionRate ? `1 ${fromCurrency} = ${conversionRate} ${toCurrency}` : 'Loading...'}
      </span>
    </div>
  );
};

export default MiniHeader;
