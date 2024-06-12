# Currency Exchange Dashboard

### Objective

This Dashboard application utilizes the Frankfurter API to retrieve historical currency exchange rate data for up to 2 years for CAD, USD, EUR, and reverse rates. This data is rendered in both a chart using Chart.js and a table using ag-Grid with features such as filtering, and the ability to persist filter settings with localstorage.

## General Features

- Utilized the [Frankfurter API](https://www.frankfurter.app/docs/) to fetch historical currency exchange rate data.
- Render the fetched data in a chart using [Chart.js](https://www.npmjs.com/package/react-chartjs-2).
- Render the fetched data in a table using [ag-Grid](https://www.npmjs.com/package/ag-grid-community) with filtering and persist grid settings on refresh.
- The ability to show one currency mapped to exchange rates in the charts.
- Implemented Filters use datepicker and persisted settings with localStorage 

## Extra Features

- Implemented functionality in django backend to save API call data to a database for future use. This would prevent the need to call the Frankfurter API each time.
- Setup a theoretical function to run on the first of each month to add the new exchange rate data for the previous month. [pending]
- Implemented a difference column in Grid which show the delta between current and the previous rate

## Technology Stack

- **Frontend:** React.js, Tailwind CSS
- **Backend:** Python (Django)

## Submission Guidelines

1. **Version Control:** please visit www.github.com/crash1604
2. **Short Video:** [pending]
3. **Deployment:** [https://henon-chanakya.netlify.app/](https://henon-chanakya.netlify.app/)
please note that due to platform restrictions the frontend is directly accessing the data on frankfurter api

## Resources

- [ag-Grid Community](https://www.npmjs.com/package/ag-grid-community)
- [react-chartjs-2](https://www.npmjs.com/package/react-chartjs-2)
- [Frankfurter API Documentation](https://www.frankfurter.app/docs/)

---

@Author: Chanakya Sharma
@Github: www.github.com/crash1604
