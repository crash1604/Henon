// @author: Chanakya Sharma
// edited: 12th June 2024
// Location: src/components/History.jsx
// Function:
// This file component is responsible for conditional
// render of data grid and chart plotted against the 
// historical data gained from the frankfurter api
// Implements Datepicker to implement date filters
// Additionally it is also responsible for passing
// props to DataGrid and Chart component with filtered
// data. 
// Constraint:
// N.A.

import React, { useState, useEffect } from 'react';
import DataGrid from './DataGrid';
import Chart from './Chart';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function History({ fromCurrency, toCurrency, historicalData }) {
  const [activeTab, setActiveTab] = useState('Data');
  
  // Retrieve the saved dates from localStorage or set defaults
  const getInitialDate = (key, defaultDate) => {
    const savedDate = localStorage.getItem(key);
    return savedDate ? new Date(savedDate) : defaultDate;
  };

  const [startDate, setStartDate] = useState(getInitialDate('startDate', new Date(new Date().setFullYear(new Date().getFullYear() - 1))));
  const [endDate, setEndDate] = useState(getInitialDate('endDate', new Date()));

  // Save dates to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('startDate', startDate.toISOString());
  }, [startDate]);

  useEffect(() => {
    localStorage.setItem('endDate', endDate.toISOString());
  }, [endDate]);

  const filteredData = Object.keys(historicalData)
    .filter(date => {
      const dateObj = new Date(date);
      return dateObj >= startDate && dateObj <= endDate;
    })
    .reduce((obj, key) => {
      obj[key] = historicalData[key];
      return obj;
    }, {});

  return (
    <div className="bg-white p-4 md:h-screen rounded-2xl shadow">
      <h2 className="text-2xl font-bold mb-4">History</h2>
      <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4 mb-4">
        <button
          className={`p-4 rounded-3xl transition-colors duration-400 ${activeTab === 'Data' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          onClick={() => setActiveTab('Data')}
        >
          Data
        </button>
        <button
          className={`p-4 rounded-3xl transition-colors duration-400 ${activeTab === 'Chart' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          onClick={() => setActiveTab('Chart')}
        >
          Chart
        </button>
        <div className="flex-grow" />
        <div className="flex items-center space-x-4">
          <div>
            <label className='p-2'>Start Date</label>
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              selectsStart
              startDate={startDate}
              endDate={endDate}
              dateFormat="yyyy-MM-dd"
              className="border p-2 rounded"
            />
          </div>
          <div>
            <label className='p-2'>End Date</label>
            <DatePicker
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              selectsEnd
              startDate={startDate}
              endDate={endDate}
              dateFormat="yyyy-MM-dd"
              className="border p-2 rounded"
            />
          </div>
        </div>
      </div>
      <div className="overflow-x-auto">
        {activeTab === 'Data' && <DataGrid fromCurrency={fromCurrency} toCurrency={toCurrency} historicalData={filteredData} />}
        {activeTab === 'Chart' && <Chart rates={filteredData} toCurrency={toCurrency} />}
      </div>
    </div>
  );
}

export default History;
