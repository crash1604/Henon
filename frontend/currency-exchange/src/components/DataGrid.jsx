// src/components/DataGrid.jsx
import React from 'react';

function DataGrid() {
  // Replace with your data fetching logic
  const data = [
    { date: '2022-01-01', rate: '1.25' },
    { date: '2022-01-02', rate: '1.26' },
    // More data
  ];

  return (
    <table className="w-full border-collapse border">
      <thead>
        <tr>
          <th className="border p-2">Date</th>
          <th className="border p-2">Exchange Rate</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr key={index}>
            <td className="border p-2">{item.date}</td>
            <td className="border p-2">{item.rate}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default DataGrid;
