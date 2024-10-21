import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify"; // Import ToastContainer and toast
import "react-toastify/dist/ReactToastify.css"; // Import Toastify CSS

import "./AddCustomer.css"; // Import custom CSS file

const AddCustomer = () => {
  // Define state variables for customer details
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    // Prepare the customer data
    const customerData = {
      name,
      email,
      phone,
      address,
    };

    try {
      const response = await fetch(
        "http://localhost:5500/api/v1/customers/create-customer",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Replace with your token retrieval method
          },
          body: JSON.stringify(customerData),
        }
      );

      const data = await response.json();

      if (response.ok) {
        // Successful customer creation
        toast.success("Customer created successfully!"); // Use Toastify for success
        // Optionally, reset the form
        setName("");
        setEmail("");
        setPhone("");
        setAddress("");
      } else {
        // Handle errors
        toast.error(data.error || "Failed to create customer"); // Use Toastify for error
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Something went wrong. Please try again."); // Use Toastify for error
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-center">Add Customer</h2>
      <form
        onSubmit={handleSubmit}
        className="border p-4 shadow rounded custom-form"
      >
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name:
          </label>
          <input
            type="text"
            id="name"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email:
          </label>
          <input
            type="email"
            id="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="phone" className="form-label">
            Phone:
          </label>
          <input
            type="tel"
            id="phone"
            className="form-control"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="address" className="form-label">
            Address:
          </label>
          <input
            type="text"
            id="address"
            className="form-control"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary w-100">
          Create Customer
        </button>
      </form>
      <ToastContainer /> {/* Add ToastContainer here to enable toasts */}
    </div>
  );
};

export default AddCustomer;
