import React, { useState, useEffect } from "react";
import { FaEdit, FaTrashAlt, FaSignOutAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import OrderEditForm from "./OrderEditForm";
import AdminSideNav from "./AdminSide";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [isEditFormVisible, setEditFormVisible] = useState(false);
  const [editingOrder, setEditingOrder] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await fetch("https://sgl-be.onrender.com/getorders");
      const data = await response.json();
      setOrders(data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  const handleEditOrder = (orderId) => {
    const orderToEdit = orders.find((order) => order._id === orderId);

    if (!orderToEdit) {
      console.error(`Order with OrderID ${orderId} not found.`);
      return;
    }

    setEditingOrder(orderToEdit);
    setEditFormVisible(true);
  };

  const handleSaveEditForm = (editedOrder) => {
    const updatedOrders = orders.map((order) =>
      order._id === editingOrder._id ? { ...order, ...editedOrder } : order
    );
    setOrders(updatedOrders);

    // Close the edit form
    setEditFormVisible(false);
    setEditingOrder(null);
    showSuccessAlert("Order Saved!", "success");
  };

  const handleCancelEditForm = () => {
    // Close the edit form without saving
    setEditFormVisible(false);
    setEditingOrder(null);
    showInfoAlert("Cancelled!", "Changes have been discarded.");
  };

  const handleUpdateStatus = (orderId) => {
    showConfirmationAlert(
      "Are you sure?",
      "You want to update the status to Delivered?",
      () => {
        const updatedOrders = orders.map((order) =>
          order._id === orderId ? { ...order, status: "Delivered" } : order
        );
        setOrders(updatedOrders);
        showSuccessAlert("Updated!", "Order status has been updated.");
      }
    );
  };

  const handleCancelOrder = (orderId) => {
    showConfirmationAlert(
      "Are you sure?",
      "You want to cancel the order?",
      () => {
        const updatedOrders = orders.map((order) =>
          order._id === orderId ? { ...order, status: "Cancelled" } : order
        );
        setOrders(updatedOrders);
        showSuccessAlert("Cancelled!", "Order has been cancelled.");
      }
    );
  };

  const handleRefundOrder = (orderId) => {
    showConfirmationAlert(
      "Are you sure?",
      "You want to refund the order?",
      () => {
        const updatedOrders = orders.map((order) =>
          order._id === orderId ? { ...order, status: "Refunded" } : order
        );
        setOrders(updatedOrders);
        showSuccessAlert("Refunded!", "Order has been refunded.");
      }
    );
  };

  const handleDelete = async (orderId) => {
    try {
      const response = await fetch(
        `https://sgl-be.onrender.com/delete/${orderId}`,
        {
          method: "DELETE",
        }
      );

      console.log(response);

      if (response.ok) {
        // Refresh the orders list after a successful delete
        fetchOrders();
        showSuccessAlert("Deleted!", "Order has been deleted.");
      } else {
        console.error("Failed to delete order");
      }
    } catch (error) {
      console.error("Error deleting order:", error);
    }
  };

  const showConfirmationAlert = (title, text, callback) => {
    Swal.fire({
      title,
      text,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, proceed!",
    }).then((result) => {
      if (result.isConfirmed) {
        callback();
      }
    });
  };

  const showSuccessAlert = (title, text) => {
    Swal.fire({
      icon: "success",
      title,
      text,
      showConfirmButton: false,
      timer: 1500,
    });
  };

  const showInfoAlert = (title, text) => {
    Swal.fire({
      icon: "info",
      title,
      text,
    });
  };

  return (
    <div className="orders-page">
      {isEditFormVisible && (
        <OrderEditForm
          order={editingOrder}
          onSave={handleSaveEditForm}
          onCancel={handleCancelEditForm}
          className="popup-form"
        />
      )}

      <nav
        className="navbar navbar-expand-lg navbar-light bg-light"
        style={{ marginTop: 0 }}
      >
        <div
          className="container d-flex justify-content-center align-items-center text-center"
          style={{ marginLeft: "auto", marginRight: "auto" }}
        >
          <h1
            className="admin-dashboard ms-4 ms-sm-3 mx-auto"
            style={{ maxWidth: "fit-content" }}
          >
            Admin Dashboard
          </h1>
          <div
            onClick={() => {
              navigate("/admin-login");
            }}
            className="logout-button ms-auto"
          >
            <span className="d-none d-sm-inline">Logout </span>
            <FaSignOutAlt style={{ marginLeft: "8px", fontSize: "1rem" }} />
          </div>
        </div>
      </nav>

      <div className="container mt-3">
        <div className="row">
          <div className="col-lg-3">
            <AdminSideNav />
          </div>
          <div className="col-lg-9">
            <div className="table-responsive">
              <table
                className="table table-bordered table-hover"
                style={{ boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)" }}
              >
                <thead>
                  <tr>
                    <th>User Name</th>
                    <th>Items</th>
                    <th>Order ID</th>
                    <th>Date</th>
                    <th>Status</th>
                    <th>Address</th>
                    <th>Total Price</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order._id}>
                      <td>{order.userName}</td>
                      <td>{order.items}</td>
                      <td>{order.orderId}</td>
                      <td>{new Date(order.date).toLocaleDateString()}</td>
                      <td>{order.status}</td>
                      <td>{order.address}</td>
                      <td>${order.totalPrice}</td>
                      <td>
                        <button
                          onClick={() => handleDelete(order._id)}
                          className="btn btn-danger"
                        >
                          Delete
                        </button>
                        <button
                          onClick={() => handleEditOrder(order._id)}
                          className="btn btn-warning"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleUpdateStatus(order._id)}
                          className="btn btn-success"
                        >
                          Update
                        </button>
                        <button
                          onClick={() => handleCancelOrder(order._id)}
                          className="btn btn-secondary"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={() => handleRefundOrder(order._id)}
                          className="btn btn-info"
                        >
                          Refund
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Orders;
