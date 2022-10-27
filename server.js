const express = require('express');
const dotenv = require('dotenv');
const colors = require('colors');
const errorHandler = require('./middlewares/error');
const connectDB = require('./config/db');
const bodyParser = require('body-parser');

//Load env vars
dotenv.config({ path: './config/config.env' });

// Connect to database

connectDB();

//Route files
const bootcamps = require('./routes/bootcamps');

const app = express();

// const logger = (req, res, next) => {
//   req.hello = 'Hello';
//   console.log('Middleware ran');
//   next();
// };
// app.use(logger);

// Body parser
app.use(express.json());

//Mount routers
app.use('/api/v1/bootcamps', bootcamps);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold)
);

//Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error:${err.message}`.red);
  // Close server & exit process
  server.close(() => process.exit(1));
});
