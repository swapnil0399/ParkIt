'use strict';

const cors = require('cors');
const express = require('express');
const smartcar = require('smartcar');

const app = express()
  .use(cors());
const port = 8000;

// TODO: Authorization Step 1a: Launch Smartcar authentication dialog
	
const client = new smartcar.AuthClient({
  clientId: '8e1ff366-5bdb-4e69-88a3-ac856a047da6',
  clientSecret: 'c13413f6-18d9-4d7b-bf8b-af52323061c8',
  redirectUri: 'http://localhost:8000/exchange',
  scope: ['read_vehicle_info'],
  testMode: true,
});

app.get('/login', function(req, res) {
  // TODO: Authorization Step 1b: Launch Smartcar authentication dialog
  const link = client.getAuthUrl();
  res.redirect(link);
});
	
// global variable to save our accessToken
let access;

app.get('/exchange', function(req, res) {
  // TODO: Authorization Step 3: Handle Smartcar response
  const code = req.query.code;

  // TODO: Request Step 1: Obtain an access token
  return client.exchangeCode(code)
    .then(function(_access) {    
      // in a production app you'll want to store this in some kind of persistent storage
      access = _access;

      res.sendStatus(200);
    })
});

app.get('/vehicle', function(req, res) {
  return smartcar.getVehicleIds(access.accessToken)
    .then(function(data) {
      // TODO: Request Step 2: Get vehicle ids
      // the list of vehicle ids
      return data.vehicles;
    }).then(function(vehicleIds) {
      // TODO: Request Step 3: Create a vehicle
      // instantiate the first vehicle in the vehicle id list
      const vehicle = new smartcar.Vehicle(vehicleIds[0], access.accessToken);
      return vehicle.info();
    }).then(function(info) {
      console.log(info);
      // {
      //   "id": "36ab27d0-fd9d-4455-823a-ce30af709ffc",
      //   "make": "TESLA",
      //   "model": "Model S",
      //   "year": 2014
      // }

      res.json(info);
    });
});

app.listen(port, () => console.log(`Listening on port ${port}`));
