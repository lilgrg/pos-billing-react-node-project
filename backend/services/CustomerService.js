const Customer = require('../models/Customer');

class CustomerService {
  // Create a new customer
  static async createCustomer(customerData) {
    try {
      const customer = new Customer(customerData);
      await customer.save();
      return customer;
    } catch (error) {
      throw new Error('Error creating customer: ' + error.message);
    }
  }

  // Get all customers
  static async getAllCustomers() {
    try {
      const customers = await Customer.find();
      return customers;
    } catch (error) {
      throw new Error('Error fetching customers: ' + error.message);
    }
  }

  // Get a customer by ID
  static async getCustomerById(customerId) {
    try {
      const customer = await Customer.findById(customerId);
      if (!customer) {
        throw new Error('Customer not found');
      }
      return customer;
    } catch (error) {
      throw new Error('Error fetching customer: ' + error.message);
    }
  }

  // Update customer information
  static async updateCustomer(customerId, updateData) {
    try {
      const customer = await Customer.findByIdAndUpdate(customerId, updateData, { new: true });
      if (!customer) {
        throw new Error('Customer not found');
      }
      return customer;
    } catch (error) {
      throw new Error('Error updating customer: ' + error.message);
    }
  }

  // Delete a customer
  static async deleteCustomer(customerId) {
    try {
      const customer = await Customer.findByIdAndDelete(customerId);
      if (!customer) {
        throw new Error('Customer not found');
      }
      return { message: 'Customer deleted successfully' };
    } catch (error) {
      throw new Error('Error deleting customer: ' + error.message);
    }
  }
}

module.exports = CustomerService;