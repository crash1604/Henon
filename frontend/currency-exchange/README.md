# Overview

Frontend for currency exchange tracker app which uses React and Tailwind along with frankfurter api. the code on github is connecting with the backend as per the requirements but the frontend hosted on netlify connects directly to frankfurter api.


* This application connects to a django backend 

## Link

[https://henon-chanakya.netlify.app/](https://henon-chanakya.netlify.app/))

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.


### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Components

src
* App.js
* Dashboard.jsx
-> components
    * Chart.jsx
    * Convert.jsx
    * DataGrid.jsx
    * Header.jsx
    * History.jsx
    * Menu.jsx
    * MiniHeader.jsx

Each component is responsible for a functionality or aids in a functionality
Interface is kept intuitive and avoid repitition


## Dependencies

* AG Grid
* Chart js
* Date Picker
* Frankfurter API
* LocalStorage persistence

- Check package.json

## Features for future

* More currencies and adjustment for high scalibility
* Add a dark theme with toggle button
* add arrow icons with difference page on data grid

---

@Author: Chanakya Sharma
@Github: www.github.com/crash1604
