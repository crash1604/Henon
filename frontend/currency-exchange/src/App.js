// src/App.jsx
import React, { useState } from 'react';
import Header from './components/Header';
import Menu from './components/Menu';
import Convert from './components/Convert';
import History from './components/History';
import { Bars3Icon } from '@heroicons/react/24/outline';

function App() {

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Header />
    </div>
  );
}

export default App;
