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

import React, { useState, useEffect } from 'react';
import { IoMdSwap } from "react-icons/io";

const MiniHeader = ({ fromCurrency, setFromCurrency, toCurrency, setToCurrency, conversionRate }) => {
  const [currencies, setCurrencies] = useState({});

  useEffect(() => {
    const fetchCurrencies = async () => {
      try {
        const response = await fetch('https://api.frankfurter.app/currencies');
        const data = await response.json();
        setCurrencies(data);
      } catch (error) {
        console.error('Error fetching currencies:', error);
      }
    };

    fetchCurrencies();
  }, []);

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
        {Object.entries(currencies).map(([code, name]) => (
          <option key={code} value={code}>
            {code} - {name}
          </option>
        ))}
      </select>
      <button className="bg-blue-900 text-white p-2 rounded-3xl transition-all duration-400" onClick={handleSwap}>
        <IoMdSwap />
      </button>
      <select
        className="bg-white text-black text-xl font-semibold p-2 rounded-3xl"
        value={toCurrency}
        onChange={(e) => setToCurrency(e.target.value)}
      >
        {Object.entries(currencies).map(([code, name]) => (
          <option key={code} value={code}>
            {code} - {name}
          </option>
        ))}
      </select>
      <span className="ml-2 text-lg font-medium">
        {conversionRate ? `1 ${fromCurrency} = ${conversionRate} ${toCurrency}` : 'Loading...'}
      </span>
    </div>
  );
};

export default MiniHeader;
