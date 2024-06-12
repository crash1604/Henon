// @author: Chanakya Sharma
// edited: 12th June 2024
// Location: src/components/Menu.jsx
// Function:
// This file component serves as a handler for the menu options
// and is also responsible for rendering the content conditionally
// in the main section. The conditional rendering is handled by
//  the props passed down from the upper Dashboard component
// Constraint:
// Only supports 2 Menu Options as per the scope

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
