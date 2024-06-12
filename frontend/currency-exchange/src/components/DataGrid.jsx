// src/components/DataGrid.jsx
import React, { useState, useEffect, useRef } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { FaArrowUp, FaArrowDown } from 'react-icons/fa';

const DataGrid = ({ historicalData, toCurrency }) => {
  const [rowData, setRowData] = useState([]);
  const gridRef = useRef();

  useEffect(() => {
    // Transform the data into a format suitable for ag-Grid
    const transformedData = Object.keys(historicalData).map((date, index, dates) => {
      const currentRate = historicalData[date][toCurrency];
      const previousRate = index > 0 ? historicalData[dates[index - 1]][toCurrency] : null;
      const difference = previousRate !== null ? parseFloat((currentRate - previousRate).toFixed(4)) : null;
      return {
        date,
        [toCurrency]: currentRate,
        difference
      };
    });
    setRowData(transformedData);
  }, [historicalData, toCurrency]);

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
