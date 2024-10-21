import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify"; // Import Toastify
import "react-toastify/dist/ReactToastify.css"; // Import Toastify CSS
import { FaEdit, FaTrash } from "react-icons/fa"; // Import icons for edit and delete
import { Modal } from "antd"; // Import Ant Design Modal
import EditCustomer from "./EditCustomer"; // Import EditCustomer component
import './CustomerList.css';
const CustomerList = () => {
  const [customers, setCustomers] = useState([]); // State to hold customers
  const [loading, setLoading] = useState(true); // State to track loading status
  const [error, setError] = useState(""); // State to track errors
  const [isModalVisible, setIsModalVisible] = useState(false); // State to control modal visibility
  const [currentCustomer, setCurrentCustomer] = useState(null); // State to hold the customer being edited
  const [searchQuery, setSearchQuery] = useState(""); // State to hold search query

  // Function to fetch all customers
  const fetchCustomers = async () => {
    try {
      const response = await fetch(
        "http://localhost:5500/api/v1/customers/getAll-customers",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Token for authentication
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch customers");
      }

      const data = await response.json();
      setCustomers(data.customers); // Assuming the response has a 'customers' property
    } catch (error) {
      console.error("Error fetching customers:", error);
      setError(error.message);
      toast.error("Failed to fetch customers."); // Notify user of the error
    } finally {
      setLoading(false); // Set loading to false after fetching
    }
  };

  // Function to handle delete customer
  const handleDelete = async (customerId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this customer?"
    );
    if (!confirmDelete) return; // Exit if user cancels

    try {
      const response = await fetch(
        `http://localhost:5500/api/v1/customers/delete-customer/${customerId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Token for authentication
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete customer");
      }

      setCustomers(customers.filter((customer) => customer._id !== customerId)); // Remove the deleted customer from the state
      toast.success("Customer deleted successfully!"); // Notify user of successful deletion
    } catch (error) {
      console.error("Error deleting customer:", error);
      toast.error("Failed to delete customer."); // Notify user of the error
    }
  };

  // Function to handle edit customer
  const handleEdit = (customer) => {
    setCurrentCustomer(customer); // Set the current customer to be edited
    setIsModalVisible(true); // Show the modal
  };

  // Function to close the modal
  const handleModalClose = () => {
    setIsModalVisible(false); // Hide the modal
    setCurrentCustomer(null); // Reset the current customer
  };

  // Filter customers based on the search query
  const filteredCustomers = customers.filter((customer) => {
    const searchLower = searchQuery.toLowerCase();
    return (
      customer.name.toLowerCase().includes(searchLower) ||
      customer.email.toLowerCase().includes(searchLower)
    );
  });

  useEffect(() => {
    fetchCustomers(); // Fetch customers on component mount
  }, []);

  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-center">Customer List</h2>
      {/* Search Input */}
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search by name or email"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)} // Update search query state
        />
      </div>
      {loading ? (
        <div>Loading...</div> // Display loading state
      ) : error ? (
        <div className="alert alert-danger">{error}</div> // Display error state
      ) : (
        <div className="responsive-table">
          {" "}
          {/* Responsive wrapper */}
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Address</th>
                <th>Actions</th> {/* New column for actions */}
              </tr>
            </thead>
            <tbody>
              {filteredCustomers.map((customer) => (
                <tr key={customer._id}>
                  <td>{customer.name}</td>
                  <td>{customer.email}</td>
                  <td>{customer.phone}</td>
                  <td>{customer.address}</td>
                  <td>
                    <button
                      onClick={() => handleEdit(customer)} // Pass the entire customer object
                      className="btn btn-link"
                    >
                      <FaEdit color="blue" /> {/* Edit icon */}
                    </button>
                    <button
                      onClick={() => handleDelete(customer._id)}
                      className="btn btn-link"
                    >
                      <FaTrash color="red" /> {/* Delete icon */}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <ToastContainer /> {/* Add ToastContainer here to enable toasts */}
      {/* Modal for editing customer */}
      <Modal
        title="Edit Customer"
        visible={isModalVisible}
        onCancel={handleModalClose}
        footer={null}
      >
        {/* Here you can add the EditCustomer component or form directly */}
        {currentCustomer && (
          <EditCustomer
            customer={currentCustomer}
            onClose={handleModalClose}
            onUpdate={fetchCustomers} // Re-fetch customers after update
          />
        )}
      </Modal>
    </div>
  );
};

export default CustomerList;
