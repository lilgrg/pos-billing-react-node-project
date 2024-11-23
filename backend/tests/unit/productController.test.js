const { createProduct, getProductById, getAllProducts } = require('../../controllers/ProductController');
const Product = require('../../models/Product');
const mongoose = require('mongoose');

// Mocking dependencies
jest.mock('../../models/Product');

describe('Product Controller - Unit Tests', () => {
  let productId;

  beforeAll(() => {
    productId = new mongoose.Types.ObjectId().toString(); // Create a mock product ID
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create a product', async () => {
    const mockProduct = {
      _id: productId,
      name: 'Test Product',
      price: 100,
      stock: 50
    };

    Product.create = jest.fn().mockResolvedValue(mockProduct);

    const req = {
      body: {
        name: 'Test Product',
        price: 100,
        stock: 50
      }
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    await createProduct(req, res);

    expect(Product.create).toHaveBeenCalledWith({
      name: 'Test Product',
      price: 100,
      stock: 50
    });
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(mockProduct);
  });

  it('should return an error when creating a product with missing fields', async () => {
    const req = {
      body: {
        name: 'Test Product' // Missing price and stock
      }
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    await createProduct(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      message: 'Price and stock are required'
    });
  });

  it('should get a product by ID', async () => {
    const mockProduct = {
      _id: productId,
      name: 'Test Product',
      price: 100,
      stock: 50
    };

    Product.findById = jest.fn().mockResolvedValue(mockProduct);

    const req = {
      params: { id: productId }
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    await getProductById(req, res);

    expect(Product.findById).toHaveBeenCalledWith(productId);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockProduct);
  });

  it('should return 404 if product not found', async () => {
    Product.findById = jest.fn().mockResolvedValue(null); // Simulate product not found

    const req = {
      params: { id: productId }
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    await getProductById(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({
      message: 'Product not found'
    });
  });

  it('should return all products', async () => {
    const mockProducts = [
      { _id: productId, name: 'Product 1', price: 100, stock: 50 },
      { _id: mongoose.Types.ObjectId(), name: 'Product 2', price: 150, stock: 30 }
    ];

    Product.find = jest.fn().mockResolvedValue(mockProducts);

    const req = {};
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    await getAllProducts(req, res);

    expect(Product.find).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockProducts);
  });
});