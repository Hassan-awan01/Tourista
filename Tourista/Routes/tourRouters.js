const express = require('express');
const tourController = require('./../controllers/tourController');

const router = express.Router();
// router.('id', touparamrController.checkId);
router.route('/monthly-plan/:year').get(tourController.getMonthlyPlan);
router.route('/get-stats').get(tourController.getToursStats);
router
  .route('/top-5-cheaps')
  .get(tourController.topFiveTours, tourController.getAllTours);
router.route('/').get(tourController.getAllTours).post(tourController.addTour);
router
  .route('/:id')
  .get(tourController.getTour)
  .patch(tourController.updateTour)
  .delete(tourController.deleteTour);
module.exports = router;
