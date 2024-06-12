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
  const [historicalData, setHistoricalData] = useState([]);

  useEffect(() => {
    const fetchConversionRate = async () => {
      if (fromCurrency === toCurrency) {
        setConversionRate(1);
        return;
      }
      
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

  useEffect(() => {
    const fetchHistoricalData = async () => {
      if (fromCurrency === toCurrency) {
        setHistoricalData([]);
        return;
      }

      const endDate = new Date().toISOString().split('T')[0];
      const startDate = new Date();
      startDate.setFullYear(startDate.getFullYear() - 2);
      const formattedStartDate = startDate.toISOString().split('T')[0];

      try {
        const response = await fetch(`https://api.frankfurter.app/${formattedStartDate}..${endDate}?from=${fromCurrency}&to=${toCurrency}`);
        const data = await response.json();
        setHistoricalData(data.rates);
      } catch (error) {
        console.error('Failed to fetch historical data:', error);
      }
    };

    fetchHistoricalData();
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
          {selectedOption === 'History' && (
            <History fromCurrency={fromCurrency} toCurrency={toCurrency} />
          )}
        </main>
      </div>
    </div>
  );
}

export default Dashboard;
