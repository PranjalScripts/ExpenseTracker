const express = require("express");
const {
  addTransection,
  getAllTransection,
  editTransection,
  deleteTransection,
} = require("../controllers/transactionController");

//router object
const router = express.Router();

//routes
// Add transaction POST method
router.post("/add-transection", addTransection);
// Edit transaction POST method
router.post("/edit-transection", editTransection);
// Delete transaction POST method
router.post("/delete-transection", deleteTransection);
// Get transactions POST method
router.post("/get-transection", getAllTransection);

module.exports = router;
