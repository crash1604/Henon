// src/components/Menu.jsx
import React from 'react';

function Menu({ selectedOption, setSelectedOption }) {
  return (
    <aside className="w-full md:w-1/6 p-4 bg-white rounded-b-2xl shadow md:h-screen">
      <ul className="space-y-2">
        <li>
          <button
            className={`w-full text-left p-4 rounded-3xl transition-all duration-400 ${selectedOption === 'Convert' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            onClick={() => setSelectedOption('Convert')}
          >
            Convert
          </button>
        </li>
        <li>
          <button
            className={`w-full text-left p-4 rounded-3xl transition-all duration-400 ${selectedOption === 'History' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            onClick={() => setSelectedOption('History')}
          >
            History
          </button>
        </li>
      </ul>
    </aside>
  );
}

export default Menu;
