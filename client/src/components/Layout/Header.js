import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { message, Modal } from "antd";
import AddCustomer from "../../pages/AddCustomer";
import CustomerList from "../../pages/CustomerList";
import { FaExpand } from "react-icons/fa";
const Header = () => {
  const [loginUser, setLoginUser] = useState("");
  const [isAddCustomerVisible, setIsAddCustomerVisible] = useState(false);
  const [isCustomerListVisible, setIsCustomerListVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setLoginUser(user);
    }
  }, []);
  const handleExpandClick = () => {
    navigate("/customerlist"); // Redirect to /companylist
  };

  const logoutHandler = () => {
    localStorage.removeItem("user");
    message.success("Logout Successfully");
    navigate("/login");
  };

  const handleAddCustomerOpen = () => {
    setIsAddCustomerVisible(true);
    setIsCustomerListVisible(false); // Close Customer List modal if open
  };

  const handleCustomerListOpen = () => {
    setIsCustomerListVisible(true);
    setIsAddCustomerVisible(false); // Close Add Customer modal if open
  };

  const handleClose = () => {
    setIsAddCustomerVisible(false);
    setIsCustomerListVisible(false);
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-light">
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarTogglerDemo01"
            aria-controls="navbarTogglerDemo01"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
            <Link className="navbar-brand" to="/">
              Pizeonfly KhataBook
            </Link>
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <p className="nav-link" onClick={handleCustomerListOpen}>
                  Customer List
                </p>
              </li>
              <li className="nav-item">
                <p className="nav-link" onClick={handleAddCustomerOpen}>
                  Add Customer
                </p>
              </li>
              <li className="nav-item">
                <p className="nav-link">{loginUser && loginUser.name}</p>
              </li>
              <li className="nav-item">
                <button className="btn btn-primary" onClick={logoutHandler}>
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Modal for Adding Customer */}
      <Modal
        title="Add Customer"
        visible={isAddCustomerVisible}
        onCancel={handleClose}
        footer={null}
      >
        <AddCustomer /> {/* Render AddCustomer component here */}
      </Modal>

      {/* Modal for Customer List */}
      <Modal
        title={
          <div className="d-flex justify-content-between align-items-center">
            <span>Customer List</span>
            <FaExpand
              onClick={handleExpandClick}
              style={{
                cursor: "pointer",
                fontSize: "1.2rem",
                marginRight: "4%",
                marginBottom: "5px",
              }}
              title="Expand to full page"
            />
          </div>
        }
        visible={isCustomerListVisible}
        onCancel={handleClose}
        footer={null}
      >
        <CustomerList /> {/* Render CustomerList component here */}
      </Modal>
    </>
  );
};

export default Header;
