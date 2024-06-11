// src/Dashboard.jsx
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Menu from './components/Menu';
import Convert from './components/Convert';
import History from './components/History';
import MiniHeader from './components/MiniHeader';

function Dashboard() {
  const [selectedOption, setSelectedOption] = useState('Convert');
  const [conversionRate, setConversionRate] = useState(null);
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('CAD');

  useEffect(() => {
    const fetchConversionRate = async () => {
      try {
        const response = await fetch(`https://api.frankfurter.app/latest?from=${fromCurrency}&to=${toCurrency}`);
        const data = await response.json();
        setConversionRate(data.rates[toCurrency]);
      } catch (error) {
        setConversionRate(1);
        console.error('Failed to fetch conversion rate:', error);
      }
    };

    fetchConversionRate();
  }, [fromCurrency, toCurrency]);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Header />
      <div className="flex">
        <Menu selectedOption={selectedOption} setSelectedOption={setSelectedOption} />
        <main className="flex-grow p-4">
          <MiniHeader
            fromCurrency={fromCurrency}
            setFromCurrency={setFromCurrency}
            toCurrency={toCurrency}
            setToCurrency={setToCurrency}
            conversionRate={conversionRate}
          />
          {selectedOption === 'Convert' && (
            <Convert
              fromCurrency={fromCurrency}
              toCurrency={toCurrency}
              conversionRate={conversionRate}
            />
          )}
          {selectedOption === 'History' && <History />}
        </main>
      </div>
    </div>
  );
}

export default Dashboard;
