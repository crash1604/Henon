// @author: Chanakya Sharma
// edited: 12th June 2024
// Location: src/components/Convert.jsx
// Function:
// This file component is responsible for converting
// a given amount of "fromCurrency" and returns the
// converted amount in "toCurrency" which is passed 
// by the props from Dashboard component
// Constraint:
// Supports conversion upto 4 decimal digits

import React, { useState, useEffect } from 'react';

const Convert = ({ fromCurrency, toCurrency, conversionRate }) => {
  const [amount, setAmount] = useState('');
  const [result, setResult] = useState(0);

  const handleConvert = () => {
    if (!conversionRate || !amount) { 
        setResult(0);
        return ;
    } 
    const convertedAmount = amount * conversionRate;
    setResult(convertedAmount.toFixed(4));

   
  };

  useEffect(() => {
    handleConvert();
  }, [amount, conversionRate]);

  return (
    <div className="bg-white p-4 mt-2 rounded-2xl shadow">
      <h2 className="text-2xl font-bold mb-4">Convert</h2>
      <span>{fromCurrency}</span>
      <input
        type="number"
        className="p-2 border rounded w-full"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <div className="text-2xl p-4">

        {result ? `${toCurrency}: ${result}` : 'Enter amount and select currencies'}
      </div>
    </div>
  );
};

export default Convert;
