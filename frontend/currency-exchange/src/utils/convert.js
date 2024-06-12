// @author: Chanakya Sharma
// edited: 12th June 2024
// Location: utils/convert.js
// Function:
// This file component gets the array of data from django backend
// processes the data to match the requirements for AG grid
// in datagrid component and makes the transition smooth without
// putting extra load on the server
// Limitation:
// May not be the best Design approach, will revisit in future

export  const convertToKeyValuePairs = (array) => {
    return array.reduce((acc, item) => {
      acc[item.date] = { [item.target_currency]: item.rate };
      return acc;
    }, {});
  };
  