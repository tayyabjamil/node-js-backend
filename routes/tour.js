const express = require('express')

const tourController = require('./../controller.js/tour')
const reviewsController = require('./../controller.js/reviewsController')


const authController = require('./../controller.js/authController')
const router = express.Router(); 
router.route('/filterTours')
.get(tourController.filterTour)

router.route('/')
.get(tourController.getApiTours)
.post(tourController.postApiTours)
.delete(authController.ristrictsTo('admin'),
tourController.deleteApiTours)
 

router.route('/tourStats')
.get(tourController.getTourStats)



router.route('/tours-within/:distance/center/:latlng/unit/:unit').post(tourController.toursWithin)

.get(tourController.getTourStats) 


router.route('/:id')

.get(tourController.getTourDetail)
// .get(tourController.getApiTours)
.patch(tourController.patchApiTours)  
.delete(authController.ristrictsTo('admin'),
 tourController.deleteApiTours)
 
 router.route('/:tourId/:userId/reviews')
 .post(reviewsController.postReviews)
module.exports =router