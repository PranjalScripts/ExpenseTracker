// controllers/customerController.js
const Customer = require("../models/customerModel"); // Adjust the import as needed

// Create Customer Controller
// controllers/customerController.js

// Create Customer Controller
const createCustomerController = async (req, res) => {
  try {
    const { name, email, phone, address } = req.body;

    // Check if a customer with the same email or phone exists
    const existingCustomer = await Customer.findOne({
      $or: [{ email }, { phone }],
      user: req.user.id,
    });

    if (existingCustomer) {
      return res.status(400).json({
        success: false,
        error: "A customer with this email or phone number already exists.",
      });
    }

    const newCustomer = new Customer({
      name,
      email,
      phone,
      address,
      user: req.user.id,
    });

    await newCustomer.save();

    res.status(201).json({
      success: true,
      customer: newCustomer,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};


// Get All Customers Controller
const getAllCustomersController = async (req, res) => {
  try {
    const customers = await Customer.find({ user: req.user.id });
    res.status(200).json({
      success: true,
      customers,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

// Get Single Customer Controller
const getCustomerController = async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id);
    if (!customer || customer.user.toString() !== req.user.id) {
      return res.status(404).json({
        success: false,
        error: "Customer not found",
      });
    }
    res.status(200).json({
      success: true,
      customer,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

// Update Customer Controller
const updateCustomerController = async (req, res) => {
  try {
    const { name, email, phone, address } = req.body;
    const customer = await Customer.findById(req.params.id);

    if (!customer || customer.user.toString() !== req.user.id) {
      return res.status(404).json({
        success: false,
        error: "Customer not found",
      });
    }

    customer.name = name || customer.name;
    customer.email = email || customer.email;
    customer.phone = phone || customer.phone;
    customer.address = address || customer.address;

    await customer.save();

    res.status(200).json({
      success: true,
      customer,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

// Delete Customer Controller
 // controllers/customerController.js

const deleteCustomerController = async (req, res) => {
  try {
    const customerId = req.params.id; // Assuming you're using req.params to get the ID

    const customer = await Customer.findByIdAndDelete(customerId);
    
    if (!customer) {
      return res.status(404).json({ success: false, error: "Customer not found" });
    }

    res.status(200).json({ success: true, message: "Customer deleted successfully" });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

module.exports = { deleteCustomerController };


// Exporting all controllers
module.exports = {
  createCustomerController,
  getAllCustomersController,
  getCustomerController,
  updateCustomerController,
  deleteCustomerController,
};
