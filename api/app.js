'use strict';

// load modules
const cors = require('cors');
const express = require('express');
const morgan = require('morgan');
const db = require('./models/index');
const sequelize = require('./models').sequelize;

const routes = require('./routes');

// variable to enable global error logging
const enableGlobalErrorLogging = process.env.ENABLE_GLOBAL_ERROR_LOGGING === 'true';

// create the Express app
const app = express();

// setup morgan which gives us http request logging
app.use(morgan('dev'));

// setup express.json to parse incoming json requests
app.use(express.json());

// Enable all CORS Requests
app.use(cors());

// async IIFE - Test db connection
(async ()=> {
  await db.sequelize.sync();
  try {
    await db.sequelize.authenticate();
    console.log("Connection to the database successful!");
  } catch (error) {
    console.log("Error connecting to the database: ", error);
  }
}) ();

// setup a friendly greeting for the root route
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to the REST API project!',
  });
});

// Add routes
app.use('/api', routes);

// send 404 if no other route matched
app.use((req, res) => {
  res.status(404).json({
    message: 'Route Not Found',
  });
});

// setup a global error handler
app.use((err, req, res, next) => {
  if (enableGlobalErrorLogging) {
    console.error(`Global error handler: ${JSON.stringify(err.stack)}`);
  }

  res.status(err.status || 500).json({
    message: err.message,
    error: {},
  });
});

// set our port
app.set('port', process.env.PORT || 5000);

// Sequelize model synchronization, then start listening on our port.
sequelize.sync()
  .then( ()=> {
    const server = app.listen(app.get('port'), () => {
      console.log(`Express server is listening on port ${server.address().port}`);
  });
});