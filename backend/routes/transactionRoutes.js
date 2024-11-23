const express = require('express');
const router = express.Router();

// Import controller
const TransactionController = require('../controllers/TransactionController');

// Define routes for transactions
router.post('/', TransactionController.createTransaction);
router.get('/', TransactionController.getAllTransactions);
router.get('/:id', TransactionController.getTransactionById);
router.put('/:id', TransactionController.updateTransaction);
router.delete('/:id', TransactionController.deleteTransaction);

module.exports = router;