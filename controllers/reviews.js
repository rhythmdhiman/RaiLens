const Train = require('../models/train');
const Review = require('../models/review');

module.exports.createReview = async (req, res) => {
    const train = await Train.findById(req.params.id);
    const review = new Review(req.body.review);
    review.author = req.user._id;
    train.reviews.push(review);
    await review.save();
    await train.save();
    req.flash('success', 'Created new review!');
    res.redirect(`/trains/${train._id}`);
}

module.exports.deleteReview = async (req, res) => {
    const { id, reviewId } = req.params;
    await Train.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId);
    req.flash('success', 'Successfully deleted review')
    res.redirect(`/trains/${id}`);
}
