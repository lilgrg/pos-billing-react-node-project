const Joi = require('joi');

// Schema for validating Product
const productValidationSchema = Joi.object({
  name: Joi.string().min(3).required(),
  price: Joi.number().positive().required(),
  stock: Joi.number().integer().min(0).required(),
});

// Schema for validating Customer
const customerValidationSchema = Joi.object({
  name: Joi.string().min(3).required(),
  email: Joi.string().email().required(),
  phone: Joi.string().length(10).pattern(/^[0-9]+$/).required(),
});

// Schema for validating Transaction
const transactionValidationSchema = Joi.object({
  customerId: Joi.string().required(),
  productId: Joi.string().required(),
  quantity: Joi.number().integer().min(1).required(),
  totalAmount: Joi.number().positive().required(),
});

// Validate product data
const validateProduct = (productData) => {
  return productValidationSchema.validate(productData);
};

// Validate customer data
const validateCustomer = (customerData) => {
  return customerValidationSchema.validate(customerData);
};

// Validate transaction data
const validateTransaction = (transactionData) => {
  return transactionValidationSchema.validate(transactionData);
};

module.exports = {
  validateProduct,
  validateCustomer,
  validateTransaction
};