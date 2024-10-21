const transectionModel = require("../models/transactionModel");
const CustomerModel = require("../models/customerModel");
const moment = require("moment");

// Get all transactions (with customer details)
const getAllTransection = async (req, res) => {
  try {
    const { frequency, selectedDate, type, userid } = req.body;

    // Construct the query based on frequency and date range
    const query = {
      userid,
      ...(frequency !== "custom"
        ? {
            date: {
              $gt: moment().subtract(Number(frequency), "d").toDate(),
            },
          }
        : {
            date: {
              $gte: selectedDate[0],
              $lte: selectedDate[1],
            },
          }),
      ...(type !== "all" && { type }),
    };

    // Fetch transactions and populate customer details
    const transections = await transectionModel
      .find(query)
      .populate("customer") // Populate the customer field with details
      .exec();

    res.status(200).json(transections);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error fetching transactions", error });
  }
};

// Add a new transaction with a customer reference
const addTransection = async (req, res) => {
  try {
    const {
      userid,
      amount,
      type,
      category,
      refrence,
      description,
      date,
      customer,
    } = req.body;

    // Check if the customer exists before proceeding
    const customerExists = await CustomerModel.findById(customer);
    if (!customerExists) {
      return res.status(404).json({ message: "Customer not found" });
    }

    // Create the new transaction with customer reference
    const newTransection = new transectionModel({
      userid,
      amount,
      type,
      category,
      refrence,
      description,
      date,
      customer, // Attach the customer ObjectId
    });

    // Save the transaction
    await newTransection.save();
    res
      .status(201)
      .json({ message: "Transaction Created", transection: newTransection });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error creating transaction", error });
  }
};

// Edit an existing transaction and ensure customer reference validity
const editTransection = async (req, res) => {
  try {
    const { transacationId, payload } = req.body;

    // If customer is updated, ensure it exists
    if (payload.customer) {
      const customerExists = await CustomerModel.findById(payload.customer);
      if (!customerExists) {
        return res.status(404).json({ message: "Customer not found" });
      }
    }

    // Update the transaction with the provided payload
    const updatedTransection = await transectionModel.findOneAndUpdate(
      { _id: transacationId },
      payload,
      { new: true } // Return the updated document
    );

    res
      .status(200)
      .json({
        message: "Transaction Updated",
        transection: updatedTransection,
      });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error updating transaction", error });
  }
};

// Delete a transaction by ID
const deleteTransection = async (req, res) => {
  try {
    await transectionModel.findOneAndDelete({ _id: req.body.transacationId });
    res.status(200).json({ message: "Transaction Deleted!" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error deleting transaction", error });
  }
};

module.exports = {
  getAllTransection,
  addTransection,
  editTransection,
  deleteTransection,
};
