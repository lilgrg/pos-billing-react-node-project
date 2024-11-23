// middleware/errorHandler.js

// Custom error handling middleware
const errorHandler = (err, req, res, next) => {
    console.error(err.stack); // Log error stack trace (for debugging)
  
    // Check for specific error types (e.g., validation errors, database errors, etc.)
    if (err.name === 'ValidationError') {
      return res.status(400).json({
        message: 'Validation Error',
        details: err.errors, // MongoDB validation errors (if any)
      });
    }
  
    if (err.name === 'CastError' && err.kind === 'ObjectId') {
      return res.status(400).json({
        message: 'Invalid Object ID format',
        details: err.message,
      });
    }
  
    // Handle other types of errors (generic)
    if (err.message) {
      return res.status(err.statusCode || 500).json({
        message: err.message,
        details: err.details || 'An unexpected error occurred.',
      });
    }
  
    // Fallback for unhandled errors (should not be reached if errors are handled above)
    return res.status(500).json({
      message: 'Internal Server Error',
      details: 'An unexpected error occurred on the server.',
    });
  };
  
  module.exports = errorHandler;