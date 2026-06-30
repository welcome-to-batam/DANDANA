// ===================================
// BA-NG-JEK - RATING CONTROLLER
// Business Logic for Ratings
// ===================================

const ratingModel = require('../models/Rating');

// ===== CREATE RATING =====
exports.createRating = async (req, res, next) => {
  try {
    const { order_id, rating, comment } = req.body;
    const userId = req.user.id;

    if (rating < 1 || rating > 5) {
      return res.status(400).json({
        success: false,
        message: 'Rating harus antara 1-5'
      });
    }

    const newRating = await ratingModel.create({
      order_id,
      rating,
      comment,
      created_by: userId
    });

    res.status(201).json({
      success: true,
      message: 'Rating berhasil ditambahkan',
      rating: newRating
    });
  } catch (error) {
    next(error);
  }
};

// ===== GET DRIVER RATINGS =====
exports.getDriverRatings = async (req, res, next) => {
  try {
    const { driverId } = req.params;
    const ratings = await ratingModel.getByDriver(driverId);

    res.json({
      success: true,
      ratings
    });
  } catch (error) {
    next(error);
  }
};

// ===== GET CUSTOMER RATINGS =====
exports.getCustomerRatings = async (req, res, next) => {
  try {
    const { customerId } = req.params;
    const ratings = await ratingModel.getByCustomer(customerId);

    res.json({
      success: true,
      ratings
    });
  } catch (error) {
    next(error);
  }
};

// ===== GET AVERAGE RATING =====
exports.getAverageRating = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const average = await ratingModel.getAverage(userId);

    res.json({
      success: true,
      average_rating: average
    });
  } catch (error) {
    next(error);
  }
};
