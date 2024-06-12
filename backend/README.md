# Currency Exchange Dashboard

### Objective

This Dashboard application utilizes the Frankfurter API to retrieve historical currency exchange rate data for up to 2 years for CAD, USD, EUR, and reverse rates. API calls are made to frankfurter.app to get exchange rate data upto 2 years. Scalable backend architecture is implemented to reduce lesser load on api server, custom api request easy to read, and have django run the application reliably

## General Features

- Utilized the [Frankfurter API](https://www.frankfurter.app/docs/) to fetch historical currency exchange rate data.
- Respond to the fetched data from React frontend using recommended libraries [Chart.js](https://www.npmjs.com/package/react-chartjs-2).
- The ability to get latest and historic data from frnakfurter and store in database if not existing
- Set up cron jobs for monthly cleanup

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

convert
|-> settings.py
|-> urls.py
api
|-> admin.py
|-> models.py
|-> serializers.py
|-> services.py
|-> urls.py
|-> views.py

#### convert/setting.py
contains settings for django project

#### convert/urls.py
original urls handler file which has paths for API endpoints

#### api/admin.py
registers models/database tables to django application

#### api/models.py
contains the tables for data store which includes current and historic data for exchange rates and a table of all currencies tracked by frankfurter api

#### api/serializers.py
creates a uniformity when sending or receiving data from json to python objects or vice versa

#### api/services.py
handles the logic for frankfurterapi calls which stores or fetches data accordingly

#### api/urls.py
handles the routing of endpoints of all api calls and deicdes which views to use at an endpoint

#### api/views.py
Has functions which are responsible for receiving and sending data to the frontend api requests

## Dependencies

mentioned in requirements.txt

## Features for future

* Cron Jobs setup
* pretransformed data for frontend for lesser calculations on frontend (increases server load) 

---

@Author: Chanakya Sharma
@Github: www.github.com/crash1604