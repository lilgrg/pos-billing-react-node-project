const { createTransaction, getTransactionById, getAllTransactions } = require('../../controllers/TransactionController');
const Transaction = require('../../models/Transaction');
const Product = require('../../models/Product');
const mongoose = require('mongoose');

// Mocking dependencies
jest.mock('../../models/Transaction');
jest.mock('../../models/Product');

describe('Transaction Controller - Unit Tests', () => {
  let productId;

  beforeAll(() => {
    productId = new mongoose.Types.ObjectId().toString(); // Create a mock product ID
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create a transaction', async () => {
    // Mock product and transaction creation
    const mockProduct = { _id: productId, price: 100, stock: 50 };
    const mockTransaction = {
      _id: mongoose.Types.ObjectId(),
      product: productId,
      quantity: 2,
      totalAmount: 200,
      status: 'completed'
    };

    Product.findById = jest.fn().mockResolvedValue(mockProduct);
    Transaction.create = jest.fn().mockResolvedValue(mockTransaction);

    const req = {
      body: {
        product: productId,
        quantity: 2,
        status: 'completed'
      }
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    await createTransaction(req, res);

    expect(Product.findById).toHaveBeenCalledWith(productId);
    expect(Transaction.create).toHaveBeenCalledWith({
      product: productId,
      quantity: 2,
      totalAmount: 200,
      status: 'completed'
    });
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(mockTransaction);
  });

  it('should return an error when product not found during transaction creation', async () => {
    const mockTransaction = {
      _id: mongoose.Types.ObjectId(),
      product: productId,
      quantity: 2,
      totalAmount: 200,
      status: 'completed'
    };

    Product.findById = jest.fn().mockResolvedValue(null); // Simulate product not found

    const req = {
      body: {
        product: productId,
        quantity: 2,
        status: 'completed'
      }
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    await createTransaction(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      message: 'Product not found'
    });
  });

  it('should get a transaction by ID', async () => {
    const mockTransaction = {
      _id: mongoose.Types.ObjectId(),
      product: productId,
      quantity: 2,
      totalAmount: 200,
      status: 'completed'
    };

    Transaction.findById = jest.fn().mockResolvedValue(mockTransaction);

    const req = {
      params: { id: mockTransaction._id.toString() }
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    await getTransactionById(req, res);

    expect(Transaction.findById).toHaveBeenCalledWith(mockTransaction._id.toString());
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockTransaction);
  });

  it('should return 404 if transaction not found', async () => {
    const mockTransactionId = mongoose.Types.ObjectId();

    Transaction.findById = jest.fn().mockResolvedValue(null); // Simulate transaction not found

    const req = {
      params: { id: mockTransactionId.toString() }
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    await getTransactionById(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ message: 'Transaction not found' });
  });

  it('should return all transactions', async () => {
    const mockTransactions = [
      { _id: mongoose.Types.ObjectId(), product: productId, quantity: 2, totalAmount: 200, status: 'completed' },
      { _id: mongoose.Types.ObjectId(), product: productId, quantity: 3, totalAmount: 300, status: 'pending' }
    ];

    Transaction.find = jest.fn().mockResolvedValue(mockTransactions);

    const req = {};
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    await getAllTransactions(req, res);

    expect(Transaction.find).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockTransactions);
  });
});