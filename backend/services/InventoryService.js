const Product = require('../models/Product');

class InventoryService {
  // Add a new product to the inventory
  static async addProduct(productData) {
    try {
      const product = new Product(productData);
      await product.save();
      return product;
    } catch (error) {
      throw new Error('Error adding product to inventory: ' + error.message);
    }
  }

  // Get all products in the inventory
  static async getAllProducts() {
    try {
      const products = await Product.find();
      return products;
    } catch (error) {
      throw new Error('Error fetching products from inventory: ' + error.message);
    }
  }

  // Get a product by ID
  static async getProductById(productId) {
    try {
      const product = await Product.findById(productId);
      if (!product) {
        throw new Error('Product not found');
      }
      return product;
    } catch (error) {
      throw new Error('Error fetching product: ' + error.message);
    }
  }

  // Update product stock levels
  static async updateProductStock(productId, quantity) {
    try {
      const product = await Product.findById(productId);
      if (!product) {
        throw new Error('Product not found');
      }

      // Update the stock
      product.stock -= quantity;
      if (product.stock < 0) {
        throw new Error('Insufficient stock');
      }

      await product.save();
      return product;
    } catch (error) {
      throw new Error('Error updating product stock: ' + error.message);
    }
  }

  // Update product information
  static async updateProduct(productId, updateData) {
    try {
      const product = await Product.findByIdAndUpdate(productId, updateData, { new: true });
      if (!product) {
        throw new Error('Product not found');
      }
      return product;
    } catch (error) {
      throw new Error('Error updating product: ' + error.message);
    }
  }

  // Delete a product from the inventory
  static async deleteProduct(productId) {
    try {
      const product = await Product.findByIdAndDelete(productId);
      if (!product) {
        throw new Error('Product not found');
      }
      return { message: 'Product deleted successfully' };
    } catch (error) {
      throw new Error('Error deleting product: ' + error.message);
    }
  }
}

module.exports = InventoryService;