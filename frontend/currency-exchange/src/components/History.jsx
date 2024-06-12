// src/components/History.jsx
import React, { useState } from 'react';
import DataGrid from './DataGrid';
import Chart from './Chart';

function History({ fromCurrency, toCurrency }) {
  const [activeTab, setActiveTab] = useState('Data');

  return (
    <div className="bg-white p-4 md:h-screen rounded-2xl shadow">
      <h2 className="text-2xl font-bold mb-4">History</h2>
      <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4 mb-4">
        <button
          className={`p-4 rounded-3xl ${activeTab === 'Data' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          onClick={() => setActiveTab('Data')}
        >
          Data
        </button>
        <button
          className={`p-4 rounded-3xl ${activeTab === 'Chart' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          onClick={() => setActiveTab('Chart')}
        >
          Chart
        </button>
      </div>
      <div className="overflow-x-auto">
        {activeTab === 'Data' && <DataGrid fromCurrency={fromCurrency} toCurrency={toCurrency} />}
        {activeTab === 'Chart' && <Chart />}
      </div>
    </div>
  );
}

export default History;
