const express = require('express')

const tourController = require('./../controller.js/tour')


const router = express.Router(); 
router.route('/filterTours')
.get(tourController.filterTour)

router.route('/')
.get(tourController.getApiTours)
.post(tourController.postApiTours)
.delete(tourController.deleteApiTours)


router.route('/tourStats')
.get(tourController.getTourStats)


router.route('/:id')

.get(tourController.getTourDetail)
// .get(tourController.getApiTours)
.patch(tourController.patchApiTours)  
.delete(tourController.deleteApiTours)
 
module.exports =router