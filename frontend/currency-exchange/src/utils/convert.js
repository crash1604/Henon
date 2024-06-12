export  const convertToKeyValuePairs = (array) => {
    return array.reduce((acc, item) => {
      acc[item.date] = { [item.target_currency]: item.rate };
      return acc;
    }, {});
  };
  