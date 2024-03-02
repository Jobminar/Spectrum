import { useState } from "react";
import PropTypes from "prop-types";
import Swal from "sweetalert2";

const EditOrderPopup = ({ editedItem, onCancelEdit, onSaveEdit }) => {
  const initialFormData = {
    username: editedItem.username,
    editedField: editedItem.editedField,
    orderID: editedItem.orderID,
    status: editedItem.status,
    address: editedItem.address,
  };

  const [formData, setFormData] = useState(initialFormData);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmitEdit = (event) => {
    event.preventDefault();
    Swal.fire({
      title: "Are you sure you want to save these changes?",
      text: "Once saved, the changes cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Save Changes",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        onSaveEdit(formData);
      }
    });
  };

  const handleCancelEdit = () => {
    Swal.fire({
      title: "Are you sure you want to cancel editing?",
      text: "Your changes will be lost.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Cancel Editing",
      cancelButtonText: "No, Continue Editing",
    }).then((result) => {
      if (result.isConfirmed) {
        onCancelEdit();
        setFormData(initialFormData); // Reset form data to initial state
      }
    });
  };

  return (
    <div className="edit-order-popup">
      <h2>Edit Order</h2>
      <form onSubmit={handleSubmitEdit}>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="editedField">Edited Field:</label>
          <input
            type="text"
            id="editedField"
            name="editedField"
            value={formData.editedField}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="orderID">Order ID:</label>
          <input
            type="text"
            id="orderID"
            name="orderID"
            value={formData.orderID}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="status">Status:</label>
          <input
            type="text"
            id="status"
            name="status"
            value={formData.status}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="address">Address:</label>
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-group">
          <button type="submit" className="btn btn-success">
            Save
          </button>

          <button
            type="button"
            className="btn btn-danger"
            onClick={handleCancelEdit}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

EditOrderPopup.propTypes = {
  editedItem: PropTypes.object.isRequired,
  onCancelEdit: PropTypes.func.isRequired,
  onSaveEdit: PropTypes.func.isRequired,
};

export default EditOrderPopup;
