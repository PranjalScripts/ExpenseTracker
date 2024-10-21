const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema(
  {
    userid: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: [true, "Amount is required"],
    },
    type: {
      type: String,
      required: [true, "Type is required"],
    },
    category: {
      type: String,
      required: [true, "Category is required"], // Fixed the typo here (requires -> required)
    },
    reference: {
      type: String, // Fixed the spelling from refrence to reference
    },
    description: {
      type: String,
      required: [true, "Description is required"],
    },
    date: {
      type: Date,
      required: [true, "Date is required"], // Fixed "data" to "date"
    },
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "customers", // Assuming there is a 'customers' collection/model
      required: true,
    },
  },
  { timestamps: true }
);

const transactionModel = mongoose.model("TransactionRecord", transactionSchema);
module.exports = transactionModel;
