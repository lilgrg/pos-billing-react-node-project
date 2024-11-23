const request = require('supertest');
const app = require('../../app');  // Assuming the Express app is exported from app.js
const Product = require('../../models/Product');
const mongoose = require('mongoose');

describe('Product Routes', () => {
  let productId;

  // Before each test, create a product
  beforeEach(async () => {
    const newProduct = new Product({
      name: 'Sample Product',
      description: 'This is a sample product',
      price: 100,
      stock: 50
    });
    const savedProduct = await newProduct.save();
    productId = savedProduct._id.toString();
  });

  // Clean up the database after each test
  afterEach(async () => {
    await Product.deleteMany({});
  });

  // Test GET all products
  it('should get all products', async () => {
    const res = await request(app).get('/api/products');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);  // Assuming there's at least one product
  });

  // Test GET a single product by ID
  it('should get a product by id', async () => {
    const res = await request(app).get(`/api/products/${productId}`);
    expect(res.status).toBe(200);
    expect(res.body.name).toBe('Sample Product');
    expect(res.body.price).toBe(100);
  });

  // Test POST a new product
  it('should create a new product', async () => {
    const newProduct = {
      name: 'New Product',
      description: 'This is a new product',
      price: 200,
      stock: 30
    };

    const res = await request(app).post('/api/products').send(newProduct);
    expect(res.status).toBe(201);
    expect(res.body.name).toBe(newProduct.name);
    expect(res.body.price).toBe(newProduct.price);
    expect(res.body.stock).toBe(newProduct.stock);

    // Clean up: Delete the newly created product
    await Product.findByIdAndDelete(res.body._id);
  });

  // Test PUT (update) a product
  it('should update a product by id', async () => {
    const updatedProduct = {
      name: 'Updated Product',
      description: 'This product has been updated',
      price: 150,
      stock: 40
    };

    const res = await request(app).put(`/api/products/${productId}`).send(updatedProduct);
    expect(res.status).toBe(200);
    expect(res.body.name).toBe(updatedProduct.name);
    expect(res.body.price).toBe(updatedProduct.price);
    expect(res.body.stock).toBe(updatedProduct.stock);
  });

  // Test DELETE a product
  it('should delete a product by id', async () => {
    const res = await request(app).delete(`/api/products/${productId}`);
    expect(res.status).toBe(200);
    expect(res.body.message).toBe('Product deleted successfully');
  });

  // Test creating a product with invalid data (missing fields)
  it('should return an error if required fields are missing', async () => {
    const invalidProduct = {
      name: 'Invalid Product',
      price: 100
      // Missing stock and description
    };

    const res = await request(app).post('/api/products').send(invalidProduct);
    expect(res.status).toBe(400);
    expect(res.body.error).toBeDefined();
  });

  // Test the price field validation (negative price)
  it('should return an error if price is negative', async () => {
    const invalidProduct = {
      name: 'Invalid Product',
      description: 'This product has a negative price',
      price: -100,  // Invalid price
      stock: 30
    };

    const res = await request(app).post('/api/products').send(invalidProduct);
    expect(res.status).toBe(400);
    expect(res.body.error).toBeDefined();
  });
});