import React, {  useState } from "react";
 
import {  toast } from "react-toastify"; // Import Toastify
import "react-toastify/dist/ReactToastify.css"; // Import Toastify CSS

const EditCustomer = ({ customer, onClose, onUpdate }) => {
  const [name, setName] = useState(customer.name);
  const [email, setEmail] = useState(customer.email);
  const [phone, setPhone] = useState(customer.phone);
  const [address, setAddress] = useState(customer.address);
  const [loading, setLoading] = useState(false);
 

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const customerData = { name, email, phone, address };

    try {
      setLoading(true);
      const response = await fetch(
        `http://localhost:5500/api/v1/customers/update-customer/${customer._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(customerData),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update customer");
      }

      toast.success("Customer updated successfully!");
      onUpdate(); // Fetch updated customers
      onClose(); // Close the modal
    } catch (error) {
      console.error("Error updating customer:", error);
      toast.error("Failed to update customer.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4">
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
        {loading ? "Updating..." : "Update Customer"}
      </button>
    </form>
  );
};


export default EditCustomer;
