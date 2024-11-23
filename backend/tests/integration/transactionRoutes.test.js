const request = require('supertest');
const app = require('../../app');  // Assuming the Express app is exported from app.js
const Transaction = require('../../models/Transaction');
const Product = require('../../models/Product');
const mongoose = require('mongoose');

describe('Transaction Routes', () => {
  let productId;
  let transactionId;

  // Before each test, create a product and a transaction
  beforeEach(async () => {
    const newProduct = new Product({
      name: 'Sample Product',
      description: 'This is a sample product',
      price: 100,
      stock: 50
    });
    const savedProduct = await newProduct.save();
    productId = savedProduct._id.toString();

    const newTransaction = new Transaction({
      product: productId,
      quantity: 2,
      total: 200,  // 2 * 100
      date: new Date(),
      status: 'completed'
    });
    const savedTransaction = await newTransaction.save();
    transactionId = savedTransaction._id.toString();
  });

  // Clean up the database after each test
  afterEach(async () => {
    await Transaction.deleteMany({});
    await Product.deleteMany({});
  });

  // Test GET all transactions
  it('should get all transactions', async () => {
    const res = await request(app).get('/api/transactions');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);  // Assuming there's at least one transaction
  });

  // Test GET a single transaction by ID
  it('should get a transaction by id', async () => {
    const res = await request(app).get(`/api/transactions/${transactionId}`);
    expect(res.status).toBe(200);
    expect(res.body.total).toBe(200);
    expect(res.body.status).toBe('completed');
  });

  // Test POST a new transaction
  it('should create a new transaction', async () => {
    const newTransaction = {
      product: productId,
      quantity: 3,
      total: 300,  // 3 * 100
      status: 'completed'
    };

    const res = await request(app).post('/api/transactions').send(newTransaction);
    expect(res.status).toBe(201);
    expect(res.body.total).toBe(newTransaction.total);
    expect(res.body.status).toBe(newTransaction.status);

    // Clean up: Delete the newly created transaction
    await Transaction.findByIdAndDelete(res.body._id);
  });

  // Test PUT (update) a transaction
  it('should update a transaction by id', async () => {
    const updatedTransaction = {
      quantity: 5,
      total: 500,  // 5 * 100
      status: 'completed'
    };

    const res = await request(app).put(`/api/transactions/${transactionId}`).send(updatedTransaction);
    expect(res.status).toBe(200);
    expect(res.body.total).toBe(updatedTransaction.total);
    expect(res.body.status).toBe(updatedTransaction.status);
  });

  // Test DELETE a transaction
  it('should delete a transaction by id', async () => {
    const res = await request(app).delete(`/api/transactions/${transactionId}`);
    expect(res.status).toBe(200);
    expect(res.body.message).toBe('Transaction deleted successfully');
  });

  // Test creating a transaction with invalid data (missing fields)
  it('should return an error if required fields are missing', async () => {
    const invalidTransaction = {
      product: productId,
      quantity: 2
    };

    const res = await request(app).post('/api/transactions').send(invalidTransaction);
    expect(res.status).toBe(400);
    expect(res.body.error).toBeDefined();
  });

  // Test the total field validation (incorrect total calculation)
  it('should return an error if total is not correct', async () => {
    const invalidTransaction = {
      product: productId,
      quantity: 3,
      total: 250,  // Incorrect total, should be 300 (3 * 100)
      status: 'completed'
    };

    const res = await request(app).post('/api/transactions').send(invalidTransaction);
    expect(res.status).toBe(400);
    expect(res.body.error).toBeDefined();
  });
});