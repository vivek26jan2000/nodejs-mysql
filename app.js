const express = require('express');

const beersRouter = require('./routes/beersRouter');
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controller/errorController');

const app = express();

// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// parse application/json
app.use(express.json());

// ROUTES
app.use('/api/v1/beers', beersRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
