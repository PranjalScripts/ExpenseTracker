const express = require("express");
const {
  createCustomerController,
  getAllCustomersController,
  getCustomerController,
  updateCustomerController,
  deleteCustomerController,
} = require("../controllers/customerController");

const router = express.Router();
const { authenticate } = require("../middleware/auth");

// Customer routes
router.post("/create-customer", authenticate, createCustomerController);
router.get("/getAll-customers", authenticate, getAllCustomersController);
router.get("/get-customer/:id", authenticate, getCustomerController);
router.put("/update-customer/:id", authenticate, updateCustomerController);
router.delete("/delete-customer/:id", authenticate, deleteCustomerController);

module.exports = router;
