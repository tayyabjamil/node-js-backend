
const express = require('express')

const reviewsController = require('./../controller.js/reviewsController')


const router = express.Router();
router.route('/')
.get(reviewsController.getReviews)
.post(reviewsController.postReviews)
// .delete(reviewsController.deleteReviews)
// .patch(reviewsController.patchReviews)

// router.route('/:id')
// .post(reviewsController.getReviewDetail)

module.exports = router