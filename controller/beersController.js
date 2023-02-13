const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const connectDatabase = require('../config/database');

// Get all beers
exports.getAllBeers = catchAsync(async (req, res, next) => {
  connectDatabase.query('SELECT * from beers', (err, data) => {
    if (err) return next(new AppError(err.message, 400));

    res.status(200).json({
      status: 'success',
      results: data.length,
      data: {
        data
      }
    });
  });
});

// get one beer
exports.getBeers = catchAsync(async (req, res, next) => {
  connectDatabase.query(
    'SELECT * FROM beers WHERE id = ?',
    [req.params.id],
    (err, data) => {
      if (err) return next(new AppError(err.message, 400));
      res.status(200).json({
        status: 'success',
        data: {
          data
        }
      });
    }
  );
});

// Delete a beer
exports.deleteBeer = catchAsync(async (req, res, next) => {
  connectDatabase.query(
    'DELETE FROM beers WHERE id = ?',
    [req.params.id],
    (err, data) => {
      if (err) return next(new AppError(err.message, 400));
      res.status(204).json({
        status: 'success',
        message: 'deleted successfully',
        data: {
          data
        }
      });
      res.send(`Beer with the record ID ${[req.params.id]} has been removed.`);
    }
  );
});

// create beer
exports.createBeer = catchAsync(async (req, res, next) => {
  const params = req.body;
  connectDatabase.query('INSERT INTO beers SET ?', params, (err, data) => {
    if (err) return next(new AppError(err.message, 400));

    res.status(201).json({
      status: 'success',
      message: 'Beer with the record ID  has been created.',
      data: {
        data
      }
    });
  });
});

// update beer
exports.updateBeer = catchAsync(async (req, res, next) => {
  const { id, name, tagline, description, image } = req.body;

  connectDatabase.query(
    'UPDATE beers SET name = ?, tagline = ?, description = ?, image = ? WHERE id = ?',
    [name, tagline, description, image, id],
    (err, data) => {
      if (err) return next(new AppError(err.message, 400));

      res.status(201).json({
        status: 'success',
        message: 'updated successfully',
        data: {
          data
        }
      });
    }
  );
});
