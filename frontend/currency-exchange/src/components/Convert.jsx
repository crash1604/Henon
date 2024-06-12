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

  const handleConvert = async () => {
    if (!amount) {
      setResult(0);
      return;
    }

    try {
      const response = await fetch(`http://localhost:8000/api/convert/${fromCurrency}/to/${toCurrency}/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ amount: parseFloat(amount) }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setResult(data.converted_amount.toFixed(4));
    } catch (error) {
      console.error('Failed to convert currency:', error);
      setResult(0);
    }
  };

  useEffect(() => {
    handleConvert();
  }, [amount]);

  return (
    <div className="bg-white p-4 mt-2 md:h-screen rounded-2xl shadow">
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
