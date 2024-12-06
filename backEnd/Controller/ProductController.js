// controllers/productController.js
const Product = require('../models/product');
const Review = require('../models/reviews');

// Get all products with filters
const getProducts = async (req, res) => {
  try {
    const { category, minPrice, maxPrice, minRating, maxRating } = req.query;

    // Create a filter object
    let filter = {};

    // Add category filter if provided
    if (category) {
      filter.category = category;
    }

    // Add price range filter if provided
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) {
        filter.price.$gte = minPrice; // Price greater than or equal to minPrice
      }
      if (maxPrice) {
        filter.price.$lte = maxPrice; // Price less than or equal to maxPrice
      }
    }

    // Add rating range filter if provided
    if (minRating || maxRating) {
      filter.rating = {};
      if (minRating) {
        filter.rating.$gte = minRating; // Rating greater than or equal to minRating
      }
      if (maxRating) {
        filter.rating.$lte = maxRating; // Rating less than or equal to maxRating
      }
    }

    // Fetch products based on the filters
    const products = await Product.find(filter);

    // Respond with the filtered products
    res.status(200).json({ success: true, count: products.length, products });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

//     Get a product by ID
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    res.status(200).json({ success: true, product });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

//     Add a new product
const addProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json({ success: true, product });
  } catch (error) {
    res.status(400).json({ success: false, message: `Error creating product ${error}` });
  }
};

//    Update a product by ID
const updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    res.status(200).json({ success: true, product });
  } catch (error) {
    res.status(400).json({ success: false, message: 'Error updating product' });
  }
};

//    Delete a product by ID
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    res.status(200).json({ success: true, message: 'Product deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

//    Get products by category
const getProductsByCategory = async (req, res) => {
  try {
    const products = await Product.find({ category: req.params.category });
    res.status(200).json({ success: true, count: products.length, products });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

//    Add a review to a product
const addReview = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    const review = await Review.create({
      product: req.params.id,
      user: req.user._id,
      rating: req.body.rating,
      comment: req.body.comment,
    });

    res.status(201).json({ success: true, review });
  } catch (error) {
    res.status(400).json({ success: false, message: 'Error adding review' });
  }
};

//    Get reviews for a product
const getProductReviews = async (req, res) => {
  try {
    const reviews = await Review.find({ product: req.params.id });
    res.status(200).json({ success: true, count: reviews.length, reviews });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

//    Update a review by ID
const updateReview = async (req, res) => {
  try {
    const review = await Review.findByIdAndUpdate(req.params.reviewId, req.body, {
      new: true,
      runValidators: true,
    });

    if (!review) {
      return res.status(404).json({ success: false, message: 'Review not found' });
    }

    res.status(200).json({ success: true, review });
  } catch (error) {
    res.status(400).json({ success: false, message: 'Error updating review' });
  }
};

//    Delete a review by ID
const  deleteReview = async (req, res) => {
  try {
    const review = await Review.findByIdAndDelete(req.params.reviewId);

    if (!review) {
      return res.status(404).json({ success: false, message: 'Review not found' });
    }

    res.status(200).json({ success: true, message: 'Review deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

module.exports = {
getProducts,
  getProductById,
  addProduct,
  updateProduct,
  deleteProduct,
  getProductsByCategory,
  addReview,
  getProductReviews,
  updateReview,
  deleteReview,
}
