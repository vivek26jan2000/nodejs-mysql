const express = require('express');
const beersController = require('./../controller/beersController');

const router = express.Router();

router
  .route('/')
  .get(beersController.getAllBeers)
  .post(beersController.createBeer);
router
  .route('/:id')
  .get(beersController.getBeers)
  .put(beersController.updateBeer)
  .delete(beersController.deleteBeer);

module.exports = router;
