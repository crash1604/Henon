// @author: Chanakya Sharma
// edited: 12th June 2024
// Location: src/Dashboard.jsx
// Function:
// This file component serves as a placeholder for Holding state of  
// the entire app which aids in props drilling. Also holds all components
// that are rendered in the application
// Constraint:
// Only gets upto 2 years of historic data

import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Menu from './components/Menu';
import Convert from './components/Convert';
import History from './components/History';
import MiniHeader from './components/MiniHeader';
import News from './components/News';
import AskAI from './components/AskAI';

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
      <div className="flex flex-grow overflow-hidden">
        <Menu selectedOption={selectedOption} setSelectedOption={setSelectedOption} />
        <main className="flex-grow p-4 overflow-y-auto">
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
            <History fromCurrency={fromCurrency} toCurrency={toCurrency} historicalData={historicalData} />
          )}
          {selectedOption === 'News' && (
            <News />
          )}
          {selectedOption === 'AskAI' && (
            <AskAI />
          )}
        </main>
      </div>
    </div>
  );
}

export default Dashboard;
