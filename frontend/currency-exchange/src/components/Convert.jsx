// src/components/Convert.jsx
import React, { useState, useEffect } from 'react';

const Convert = ({ fromCurrency, toCurrency, conversionRate }) => {
  const [amount, setAmount] = useState('');
  const [result, setResult] = useState(0);

  const handleConvert = () => {
    if (!conversionRate || !amount) return;
    const convertedAmount = amount * conversionRate;
    setResult(convertedAmount);
  };

  useEffect(() => {
    handleConvert();
  }, [amount, conversionRate]);

  return (
    <div className="bg-white p-4 mt-2 md:h-screen rounded-2xl shadow">
      <h2 className="text-2xl font-bold mb-4">Convert</h2>
      <span>{fromCurrency}</span>
      <input
        type="text"
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
