// src/components/DataGrid.jsx
import React, { useState, useEffect, useRef } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { FaArrowUp, FaArrowDown } from 'react-icons/fa';

const DataGrid = ({ fromCurrency, toCurrency }) => {
  const [rowData, setRowData] = useState([]);
  const gridRef = useRef();

  useEffect(() => {
    const fetchHistoricalData = async () => {
      if (fromCurrency === toCurrency) {
        setRowData([]);
        return;
      }

      const endDate = new Date().toISOString().split('T')[0];
      const startDate = new Date();
      startDate.setFullYear(startDate.getFullYear() - 2);
      const formattedStartDate = startDate.toISOString().split('T')[0];

      try {
        const response = await fetch(`https://api.frankfurter.app/${formattedStartDate}..${endDate}?from=${fromCurrency}&to=${toCurrency}`);
        const data = await response.json();
        // Transform the data into a format suitable for ag-Grid
        const transformedData = Object.keys(data.rates).map((date, index, dates) => {
          const currentRate = data.rates[date][toCurrency];
          const previousRate = index > 0 ? data.rates[dates[index - 1]][toCurrency] : null;
          const difference = previousRate !== null ? currentRate - previousRate : null;
          return {
            date,
            [toCurrency]: currentRate,
            difference
          };
        });
        setRowData(transformedData);
      } catch (error) {
        console.error('Failed to fetch historical data:', error);
      }
    };

    fetchHistoricalData();
  }, [fromCurrency, toCurrency]);

  const columnDefs = [
    { headerName: "Date", field: "date", sortable: true, filter: true, flex: 1 },
    { headerName: toCurrency, field: toCurrency, sortable: true, filter: true, flex: 1 },
    {
      headerName: "Difference",
      field: "difference",
      flex: 1,
      cellRendererFramework: (params) => {
        if (params.value === null) {
          return '--';
        }
        const formattedDifference = Number(params.value).toFixed(4);  // Format to 4 decimal places
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

  // Automatically resize columns when data is loaded
  useEffect(() => {
    if (gridRef.current && gridRef.current.api) {
      gridRef.current.api.sizeColumnsToFit();
    }
  }, [rowData]);

  return (
    <div className="ag-theme-alpine" style={{ height: '500px', width: '100%' }}>
      <AgGridReact
        ref={gridRef}
        rowData={rowData}
        columnDefs={columnDefs}
        domLayout="autoHeight"
        defaultColDef={{ resizable: true }}
        pagination={true}
        paginationPageSize={20}
        onGridReady={() => {
          if (gridRef.current && gridRef.current.api) {
            gridRef.current.api.sizeColumnsToFit();
          }
        }}
      />
    </div>
  );
};

export default DataGrid;
