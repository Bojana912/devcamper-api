const CustomErrorResponse = require('../utils/errorResponse');

const errorHandler = (err, req, res, next) => {
    let error = { ...err }
    error.message = err.message;

    // Log to console for dev
    console.log(err);

    // Mongoose bad ObjectId
    if (err.name === 'CastError') {
        const message = `Bootcamp not found with id of ${err.value}`;
        error = new CustomErrorResponse(message, 404);
    }

    // Mongoose duplicate key
    if(err.code === 11000) {
        const message = 'Duplicate field value entered.';
        error = new CustomErrorResponse(message, 400);
    }

    // Mongose validation error
    if(err.name === 'ValidationError') {
        const message = Object.values(err.errors).map(val => val.message);
        error = new CustomErrorResponse(message, 400);
    }

    res.status(error.statusCode || 500).json({
        success: false,
        error: error.message || 'Server Error'
    });
};

module.exports = errorHandler;