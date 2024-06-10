// src/App.jsx
import React, { useState } from 'react';
import Header from './components/Header';
import Menu from './components/Menu';
import Convert from './components/Convert';
import History from './components/History';

function App() {
  const [selectedOption, setSelectedOption] = useState('Convert');

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Header />
      <div className="flex">
        <Menu selectedOption={selectedOption} setSelectedOption={setSelectedOption} />
        <main className="flex-grow p-4">
          {selectedOption === 'Convert' && <Convert />}
          {selectedOption === 'History' && <History />}
        </main>
      </div>

    </div>
  );
}

export default App;
