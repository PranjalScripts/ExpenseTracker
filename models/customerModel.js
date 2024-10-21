const mongoose = require("mongoose");

// Customer Schema Design
const customerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Customer name is required"],
    },
    email: {
      type: String,
      required: [true, "Customer email is required"],
      unique: true,
    },
    phone: {
      type: String,
      required: [true, "Customer phone number is required"],
      unique: true,
    },
    address: {
      type: String,
      required: [true, "Customer address is required"],
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users", // Reference to the User model
      required: true,
    },
  },
  { timestamps: true }
);

// Export
const customerModel = mongoose.model("customers", customerSchema);
module.exports = customerModel;
