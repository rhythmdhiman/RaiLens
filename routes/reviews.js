const express = require('express');
const router = express.Router({ mergeParams: true });

const Train = require('../models/train');
const Review = require('../models/review');
const { isLoggedIn, validateReview, isReviewAuthor } = require('../middleware');
const catchAsync = require('../utils/catchAsync');
const reviews = require('../controllers/reviews');

// Create Review
router.post('/', isLoggedIn, validateReview, catchAsync(reviews.createReview));

// Delete Review
router.delete('/:reviewId', isLoggedIn, isReviewAuthor, catchAsync(reviews.deleteReview));

module.exports = router;
