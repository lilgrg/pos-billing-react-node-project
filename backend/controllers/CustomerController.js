// Import dependencies
const Customer = require('../models/Customer'); // Customer schema/model
const { validationResult } = require('express-validator');

// Controller methods
const CustomerController = {
  // Create a new customer
  createCustomer: async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, phone, address } = req.body;

    try {
      const newCustomer = new Customer({ name, email, phone, address });
      const savedCustomer = await newCustomer.save();
      res.status(201).json(savedCustomer);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  },

  // Get all customers
  getAllCustomers: async (req, res) => {
    try {
      const customers = await Customer.find();
      res.status(200).json(customers);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  },

  // Get a single customer by ID
  getCustomerById: async (req, res) => {
    try {
      const customer = await Customer.findById(req.params.id);

      if (!customer) {
        return res.status(404).json({ msg: 'Customer not found' });
      }

      res.status(200).json(customer);
    } catch (err) {
      console.error(err.message);
      if (err.kind === 'ObjectId') {
        return res.status(404).json({ msg: 'Customer not found' });
      }
      res.status(500).send('Server Error');
    }
  },

  // Update a customer's details
  updateCustomer: async (req, res) => {
    const { name, email, phone, address } = req.body;

    // Build a customer object with updated fields
    const customerFields = {};
    if (name) customerFields.name = name;
    if (email) customerFields.email = email;
    if (phone) customerFields.phone = phone;
    if (address) customerFields.address = address;

    try {
      let customer = await Customer.findById(req.params.id);

      if (!customer) {
        return res.status(404).json({ msg: 'Customer not found' });
      }

      // Update
      customer = await Customer.findByIdAndUpdate(
        req.params.id,
        { $set: customerFields },
        { new: true }
      );

      res.status(200).json(customer);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  },

  // Delete a customer
  deleteCustomer: async (req, res) => {
    try {
      const customer = await Customer.findById(req.params.id);

      if (!customer) {
        return res.status(404).json({ msg: 'Customer not found' });
      }

      await Customer.findByIdAndRemove(req.params.id);

      res.status(200).json({ msg: 'Customer removed' });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  },
};

module.exports = CustomerController;