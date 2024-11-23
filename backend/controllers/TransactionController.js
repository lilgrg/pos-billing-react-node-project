// controllers/TransactionController.js

const Transaction = require('../models/Transaction');
const TransactionService = require('../services/TransactionService');

// Create a new transaction
exports.createTransaction = async (req, res) => {
  try {
    const transactionData = req.body;
    const transaction = await TransactionService.createTransaction(transactionData);
    res.status(201).json(transaction);
  } catch (error) {
    res.status(500).json({ message: 'Error creating transaction', error: error.message });
  }
};

// Get all transactions
exports.getAllTransactions = async (req, res) => {
  try {
    const transactions = await TransactionService.getAllTransactions();
    res.status(200).json(transactions);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching transactions', error: error.message });
  }
};

// Get transaction by ID
exports.getTransactionById = async (req, res) => {
  try {
    const transactionId = req.params.id;
    const transaction = await TransactionService.getTransactionById(transactionId);
    if (!transaction) {
      return res.status(404).json({ message: 'Transaction not found' });
    }
    res.status(200).json(transaction);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching transaction', error: error.message });
  }
};

// Update transaction details
exports.updateTransaction = async (req, res) => {
  try {
    const transactionId = req.params.id;
    const transactionData = req.body;
    const updatedTransaction = await TransactionService.updateTransaction(transactionId, transactionData);
    if (!updatedTransaction) {
      return res.status(404).json({ message: 'Transaction not found' });
    }
    res.status(200).json(updatedTransaction);
  } catch (error) {
    res.status(500).json({ message: 'Error updating transaction', error: error.message });
  }
};

// Delete transaction
exports.deleteTransaction = async (req, res) => {
  try {
    const transactionId = req.params.id;
    const deletedTransaction = await TransactionService.deleteTransaction(transactionId);
    if (!deletedTransaction) {
      return res.status(404).json({ message: 'Transaction not found' });
    }
    res.status(200).json({ message: 'Transaction deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting transaction', error: error.message });
  }
};