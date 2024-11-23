const express = require('express');
const router = express.Router();

// Import individual route files
const customerRoutes = require('./customerRoutes');
const productRoutes = require('./productRoutes');
const transactionRoutes = require('./transactionRoutes');

// Use the imported routes
router.use('/customers', customerRoutes);
router.use('/products', productRoutes);
router.use('/transactions', transactionRoutes);

module.exports = router;