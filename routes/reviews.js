const express = require('express');
const reviewsRouter = express.Router({ mergeParams: true });
const reviews = require('../controllers/reviews');
const Campground = require('../models/campground');
const Review = require('../models/review');
const { validateReview, isLoggedIn, isReviewAuthor } = require('../middleware');

const catchAsync = require('../utils/catchAsync');

reviewsRouter.post('/', isLoggedIn, validateReview, catchAsync(reviews.createReview))

reviewsRouter.delete('/:reviewId', isLoggedIn, isReviewAuthor, catchAsync(reviews.deleteReview))

module.exports = reviewsRouter