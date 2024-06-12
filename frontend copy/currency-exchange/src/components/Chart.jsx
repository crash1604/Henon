// @author: Chanakya Sharma
// edited: 12th June 2024
// Location: src/components/Chart.jsx
// Function:
// This file component is responsible for rendering Chart 
// data which is received from History component and filtered
//  by MiniHeader which holds FIltering date option
// Constraint:
// N.A.

import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function Chart({ rates, toCurrency }) {
  const dates = Object.keys(rates);
  const exchangeRates = dates.map(date => rates[date][toCurrency]);

  const data = {
    labels: dates,
    datasets: [
      {
        label: `${toCurrency} Exchange Rate`,
        data: exchangeRates,
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: false,
        tension: 0.1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: `${toCurrency} Exchange Rate Over Time`,
      },
    },
  };

  return (
    <div>
      <Line data={data} options={options} />
    </div>
  );
}

export default Chart;
