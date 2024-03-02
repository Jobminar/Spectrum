import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import PropTypes from "prop-types";
//these are worked by proptypes
const OrderEditForm = ({ order = {}, onSave, onCancel, className }) => {
  const [editedOrder, setEditedOrder] = useState({});

  useEffect(() => {
    Swal.fire({
      icon: "info",
      title: "Order Edit Form Initialized",
      text: "Order Edit Form initialized with the current order details.",
    });
    setEditedOrder({ ...order });
  }, [order]);

  const handleInputChange = (e) =>
    setEditedOrder({ ...editedOrder, [e.target.name]: e.target.value });

  const handleSave = () => {
    if (
      Object.keys(editedOrder).every((key) => editedOrder[key] === order[key])
    ) {
      Swal.fire({
        icon: "info",
        title: "No Changes",
        text: "No changes made to the order.",
      });
      return;
    }

    const changesMade = Object.keys(editedOrder)
      .map(
        (key) =>
          `<li><strong>${key}:</strong> ${order[key]} → ${editedOrder[key]}</li>`
      )
      .join("");

    Swal.fire({
      title: "Save Changes?",
      html: `<strong>Changes Made:</strong><ul>${changesMade}</ul>`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, save it!",
    }).then((result) => {
      if (result.isConfirmed) {
        onSave(editedOrder);
        Swal.fire({
          icon: "success",
          title: "Order Saved!",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };

  return (
    <div
      className={`order-edit-form ${className}`}
      style={{ overflow: "auto", minHeight: "300px" }}
    >
      <h2>Edit Order</h2>
      {/* {console.log(key)} */}
      <div className="input-container">
        {["username", "editedField", "orderID", "status", "address"].map(
          (key) => (
            <label key={key}>
              {key.charAt(0).toUpperCase() + key.slice(1)}:
              <input
                type="text"
                name={key}
                value={editedOrder[key]}
                onChange={handleInputChange}
                readOnly={key === "orderID"}
              />
            </label>
            
          )
        )}
      </div>
      <div className="button-container">
        <button className="btn btn-success" onClick={handleSave}>
          Save
        </button>
        <button className="btn btn-danger" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </div>
  );
};

OrderEditForm.propTypes = {
  order: PropTypes.shape({
    username: PropTypes.string,
    editedField: PropTypes.string,
    orderID: PropTypes.string,
    status: PropTypes.string,
    address: PropTypes.string,
  }),
  onSave: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  className: PropTypes.string,
};

export default OrderEditForm;
