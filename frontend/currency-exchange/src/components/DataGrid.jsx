// src/components/DataGrid.jsx
import React, { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { FaArrowUp, FaArrowDown } from 'react-icons/fa';

const DataGrid = () => {
  const [rowData, setRowData] = useState([]);

  const data = {
    "amount": 1,
    "base": "USD",
    "start_date": "2022-01-03",
    "end_date": "2022-12-30",
    "rates": {
      "2022-01-03": { "CAD": 1.2699 },
      "2022-01-04": { "CAD": 1.2751 },
      "2022-01-05": { "CAD": 1.2721 },
      "2022-01-06": { "CAD": 1.2772 },
      "2022-01-07": { "CAD": 1.2723 },
      "2022-01-07": { "CAD": 1.2723 },
      "2022-01-07": { "CAD": 1.2723 },
      "2022-01-07": { "CAD": 1.2723 },
      "2022-01-07": { "CAD": 1.2723 },
      "2022-01-07": { "CAD": 1.2723 },
      "2022-12-30": { "CAD": 1.3538 }
    }
  };

  useEffect(() => {
    // Transform the data into a format suitable for ag-Grid
    const transformedData = Object.keys(data.rates).map((date, index, dates) => {
      const currentRate = data.rates[date].CAD;
      const previousRate = index > 0 ? data.rates[dates[index - 1]].CAD : null;
      const difference = (previousRate !== null ? currentRate - previousRate : null);
      return {
        date,
        CAD: currentRate,
        difference
      };
    });
    setRowData(transformedData);
  }, []);

  const columnDefs = [
    { headerName: "Date", field: "date", sortable: true, filter: true },
    { headerName: "CAD", field: "CAD", sortable: true, filter: true },
    {
      headerName: "Difference",
      field: "difference",
      cellRendererFramework: (params) => {
        if (params.value === null) {
          return '--';
        }
        const formattedDifference = params.value.toFixed(2);
        const isPositive = params.value > 0;
        const isNegative = params.value < 0;
        return (
          <span className={`flex items-center ${isPositive ? 'text-green-500' : isNegative ? 'text-red-500' : ''}`}>
            {formattedDifference}
            {isPositive && <FaArrowUp className="ml-1" />}
            {isNegative && <FaArrowDown className="ml-1" />}
          </span>
        );
      }
    }
  ];

  return (
    <div className="ag-theme-alpine" style={{ height: '500px', width: '100%' }}>
      <AgGridReact
        rowData={rowData}
        columnDefs={columnDefs}
        pagination={true}
        paginationPageSize={20}
      />
    </div>
  );
};

export default DataGrid;
