const Transaction = require('../models/Transaction');
const Product = require('../models/Product');
const Customer = require('../models/Customer');

class TransactionService {
  // Create a new transaction
  static async createTransaction(transactionData) {
    try {
      const { products, customerId, totalAmount, paymentMethod, status } = transactionData;
      
      // Create a new transaction
      const transaction = new Transaction({
        products,
        customerId,
        totalAmount,
        paymentMethod,
        status
      });

      // Deduct the stock for each product in the transaction
      for (let productItem of products) {
        const product = await Product.findById(productItem.productId);
        if (!product) {
          throw new Error('Product not found');
        }
        if (product.stock < productItem.quantity) {
          throw new Error(`Insufficient stock for ${product.name}`);
        }

        // Update stock
        product.stock -= productItem.quantity;
        await product.save();
      }

      // Save the transaction
      await transaction.save();

      // Update customer details (e.g., add transaction history)
      if (customerId) {
        const customer = await Customer.findById(customerId);
        if (customer) {
          customer.transactions.push(transaction._id);
          await customer.save();
        }
      }

      return transaction;
    } catch (error) {
      throw new Error('Error creating transaction: ' + error.message);
    }
  }

  // Get all transactions
  static async getAllTransactions() {
    try {
      const transactions = await Transaction.find().populate('customerId products.productId');
      return transactions;
    } catch (error) {
      throw new Error('Error fetching transactions: ' + error.message);
    }
  }

  // Get a transaction by ID
  static async getTransactionById(transactionId) {
    try {
      const transaction = await Transaction.findById(transactionId).populate('customerId products.productId');
      if (!transaction) {
        throw new Error('Transaction not found');
      }
      return transaction;
    } catch (error) {
      throw new Error('Error fetching transaction: ' + error.message);
    }
  }

  // Update a transaction status (e.g., paid, canceled, etc.)
  static async updateTransactionStatus(transactionId, status) {
    try {
      const transaction = await Transaction.findById(transactionId);
      if (!transaction) {
        throw new Error('Transaction not found');
      }

      transaction.status = status;
      await transaction.save();

      return transaction;
    } catch (error) {
      throw new Error('Error updating transaction status: ' + error.message);
    }
  }

  // Delete a transaction
  static async deleteTransaction(transactionId) {
    try {
      const transaction = await Transaction.findByIdAndDelete(transactionId);
      if (!transaction) {
        throw new Error('Transaction not found');
      }

      return { message: 'Transaction deleted successfully' };
    } catch (error) {
      throw new Error('Error deleting transaction: ' + error.message);
    }
  }
}

module.exports = TransactionService;