// @author: Chanakya Sharma
// edited: 12th June 2024
// Location: src/components/DataGrid.jsx
// Function:
// This file component is responsible for rendering
// data grid component which received data from props
// historical data gained from the frankfurter api
// Uses AG grid library to display data which is filtered
// by history component for better UX
// Constraint:
// N.A.

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
    { headerName: "Date", field: "date", sortable: true, filter: false, flex: 1, sort:'desc' },
    { headerName: toCurrency, field: toCurrency, sortable: false, filter: false, flex: 1 },
    {
      headerName: "Difference",
      field: "difference",
      flex: 1,
      sortable:false,
      filter:false,
      cellClass: params => {
        if (params.value > 0) {
          return 'flex items-center text-green-500';
        } else if (params.value < 0) {
          return 'flex items-center text-red-500';
        } else {
          return 'flex items-center text-blue-900';
        }
      },
      cellRendererFramework: (params) => {
        if (params.value === null) {
          return '--';
        }
        const formattedDifference = Number(params.value).toFixed(4);  // Format to 4 decimal places
        return (
          <span>
          {formattedDifference}
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
