// src/components/Convert.jsx
import React, { useState } from 'react';

function Convert() {
  const [amount, setAmount] = useState('');

  const handleConvert = () => {
    // Call your API here
    console.log(`Convert ${amount}`);
  };

  return (
    <div className="bg-white p-4 md:h-screen rounded-2xl shadow">
      <h2 className="text-2xl font-bold mb-4">Convert</h2>
      <input
        type="text"
        className="p-2 border rounded w-full"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <button
        className="mt-2 p-2 bg-blue-500 text-white rounded w-full"
        onClick={handleConvert}
      >
        Convert
      </button>
    </div>
  );
}

export default Convert;
