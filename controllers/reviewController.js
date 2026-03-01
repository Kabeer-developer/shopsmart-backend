const Review = require("../models/Review");
const Product = require("../models/Product");

// Add a review to a product
exports.addReview = async (req, res) => {
  try {
    const { rating, comment } = req.body;
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    const review = new Review({
      user: req.user._id,
      product: product._id,
      rating,
      comment,
    });
    await review.save();

    // Update product average rating
    const reviews = await Review.find({ product: product._id });
    product.numReviews = reviews.length;
    product.rating = reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length;
    await product.save();

    res.status(201).json(review);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all reviews for a product
exports.getReviews = async (req, res) => {
  try {
    const reviews = await Review.find({ product: req.params.id }).populate("user", "name email");
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
