// middleware/validationMiddleware.js
const { body, param, validationResult } = require('express-validator');

// Validation for creating/updating a product
const validateProduct = [
  body('name')
    .isString().withMessage('Product name must be a string.')
    .notEmpty().withMessage('Product name is required.'),
  body('price')
    .isFloat({ gt: 0 }).withMessage('Price must be a positive number.')
    .notEmpty().withMessage('Price is required.'),
  body('quantity')
    .isInt({ gt: 0 }).withMessage('Quantity must be a positive integer.')
    .notEmpty().withMessage('Quantity is required.'),
  body('description')
    .optional()
    .isString().withMessage('Description must be a string.'),

  // Custom validation for validating the request and passing errors to the next middleware
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: 'Validation Error',
        details: errors.array(),
      });
    }
    next();
  },
];

// Validation for creating a transaction
const validateTransaction = [
  body('customerId')
    .isMongoId().withMessage('Invalid Customer ID.')
    .notEmpty().withMessage('Customer ID is required.'),
  body('items')
    .isArray({ min: 1 }).withMessage('Transaction must have at least one item.')
    .notEmpty().withMessage('Items are required.'),
  body('items.*.productId')
    .isMongoId().withMessage('Each item must have a valid Product ID.'),
  body('items.*.quantity')
    .isInt({ gt: 0 }).withMessage('Item quantity must be a positive integer.')
    .notEmpty().withMessage('Item quantity is required.'),
  body('totalAmount')
    .isFloat({ gt: 0 }).withMessage('Total amount must be a positive number.')
    .notEmpty().withMessage('Total amount is required.'),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: 'Validation Error',
        details: errors.array(),
      });
    }
    next();
  },
];

// Validation for getting a product by ID (validates if the ID is a valid MongoDB ObjectId)
const validateProductId = [
  param('id')
    .isMongoId().withMessage('Invalid Product ID.')
    .notEmpty().withMessage('Product ID is required.'),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: 'Validation Error',
        details: errors.array(),
      });
    }
    next();
  },
];

module.exports = {
  validateProduct,
  validateTransaction,
  validateProductId,
};