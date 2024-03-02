import PropTypes from "prop-types";
import Swal from "sweetalert2";
import { useState } from "react";
import { FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";

const CartSidebar = ({
  isOpen,
  onClose,
  selectedItem,
  quantity: initialQuantity,
  itemData,
  onProceedToCheckout,
}) => {
  const [quantity, setQuantity] = useState(initialQuantity);
  const handleProceedToCheckout = () => {
    // Retrieve the item data from sessionStorage
    const storedItemData = sessionStorage.getItem("cartItemData");
    const parsedItemData = storedItemData ? JSON.parse(storedItemData) : null;

    if (parsedItemData && quantity > 0) {
      // Call the callback function with retrieved itemData
      onProceedToCheckout(parsedItemData);

      Swal.fire({
        icon: "success",
        title: "Proceeding to Checkout!",
        showConfirmButton: false,
        timer: 1500,
      });
    } else {
      Swal.fire({
        icon: "warning",
        title: "Cart is Empty!",
        text: "Please add items to your cart before proceeding to checkout.",
      });
    }
  };

  const handleQuantityChange = (change) => {
    // Ensure quantity does not go below 0
    const newQuantity = Math.max(quantity + change, 0);
    setQuantity(newQuantity);

    // Display a success notification using SweetAlert2
    Swal.fire({
      icon: "success",
      title: "Quantity Updated!",
      showConfirmButton: false,
      timer: 1500,
    });
  };

  const handleDeleteItem = () => {
    // Display a confirmation modal using SweetAlert2
    Swal.fire({
      icon: "warning",
      title: "Are you sure?",
      text: "You are about to delete this item from your cart.",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        // Logic to handle item deletion
        console.log("Item deleted");

        // Display a success notification using SweetAlert2
        Swal.fire({
          icon: "success",
          title: "Item Deleted!",
          showConfirmButton: false,
          timer: 1500,
        });

        // Close the cart sidebar or trigger some other action
        onClose();
      }
    });
  };

  const calculateTotal = () => {
    const itemPrice = itemData.price; 
    Swal.fire({
      icon: "info",
      title: "Calculating Total...",
      showConfirmButton: false,
      timer: 1500,
    });

    return (itemPrice * quantity).toFixed(2);
  };

  const overlayStyle = {
    position: "fixed",
    top: "0",
    left: "0",
    width: "100%",
    height: "100%",
    backdropFilter: "blur(3px)",
    zIndex: "999", 
    display: isOpen ? "block" : "none", 
  };

  const sidebarStyle = {
    width: "300px",
    height: "100%",
    position: "fixed",
    top: "0",
    right: isOpen ? "0" : "-300px", 
    backgroundColor: "#FFFFFF",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
    transition: "right 0.3s ease-in-out",
    zIndex: "1000",
    overflowY: "auto",
  };

  const closeButtonStyle = {
    color: "#FFA500", 
    padding: "0.5rem",
    marginBottom: "10px",
    width: "2em",
    borderRadius: "0",
    border: "none",
    cursor: "pointer",
    fontSize: "1.5rem",
    position: "fixed", // Position fixed for the entire window
    top: "1px",
    right: "5px",
    backgroundColor: "transparent", // Transparent background
    display: "flex",
    alignItems: "center",
    justifyContent: "end",
    transition: "color 0.3s ease-in-out", // Add a smooth transition
  };

  const contentStyle = {
    padding: "1rem",
  };

  const headingStyle = {
    fontSize: "1.8rem",
    marginBottom: "1.5rem",
    paddingBottom: "0.8rem",
    color: "#333", // Darken the text color a bit
  };

  const totalStyle = {
    marginTop: "1.5rem",
    fontSize: "1.4rem",
    fontWeight: "bold",
    color: "#555", // Darken the text color a bit
  };

  const topHalfStyle = {
    height: "50%",
    backgroundColor: "rgba(255, 255, 255, 0.8)", // Slightly more opaque yellowish-white background
    display: "flex",
    flexDirection: "column",
    justifyContent: "center", // Vertically center content
    alignItems: "center",
    padding: "1.5rem", // Increased padding
    borderRadius: "0.5rem", // Softer border
    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)", // Softer shadow
  };

  const cardStyle = {
    display: "flex", // Display as flex container
    alignItems: "center", // Align items in the center vertically
    backgroundColor: "#F8F8F8", // Light gray background
    padding: "1.5rem",
    borderRadius: "0.5rem",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
    width: "100%",
  };

  const itemInfoStyle = {
    flex: "1", // Allow itemInfo to grow and take remaining space
    marginLeft: "1rem", // Add a bit of space between the image and text
  };

  const diamondImageStyle = {
    width: "60px", // Adjusted size for a more horizontal look
    height: "60px", // Adjusted size for a more horizontal look
    marginRight: "1rem", // Add margin to separate from text
    borderRadius: "0.25rem", // Rounded corners for the image
  };

  const buttonContainerStyle = {
    display: "flex",
    alignItems: "center",
    marginTop: "1rem",
  };

  const buttonStyle = {
    backgroundColor: "#FFFFFF", // White background
    color: "#FFA500", // Orange color text
    padding: "0.1rem 1.2rem",
    borderRadius: "0.35rem",
    border: "1px solid #FFA500", // Orange border
    marginLeft: "0.8rem",
    cursor: "pointer",
    fontSize: "1.2rem",
    transition: "background-color 0.3s ease-in-out", // Add a smooth transition
  };

  return (
    <div style={overlayStyle}>
      <div style={sidebarStyle}>
        <h3 style={headingStyle}>Shopping Cart</h3>
        <div style={topHalfStyle}>
          <button style={closeButtonStyle} onClick={onClose}>
            <FaTimes />
          </button>
          {quantity > 0 ? (
            <>
              <div style={cardStyle}>
                <div style={itemInfoStyle}>
                  <img
                    src={
                      itemData.image.startsWith("/")
                        ? `data:image/png;base64,${itemData.image}`
                        : itemData.image
                    }
                    alt={itemData.name}
                    style={diamondImageStyle}
                  />

                  <span>{selectedItem}</span>
                  <div style={buttonContainerStyle}>
                    <button
                      style={buttonStyle}
                      onClick={() => handleQuantityChange(-1)}
                    >
                      -
                    </button>
                    <span>{quantity}</span>
                    <button
                      style={buttonStyle}
                      onClick={() => handleQuantityChange(1)}
                    >
                      +
                    </button>
                  </div>
                  <button style={buttonStyle} onClick={handleDeleteItem}>
                    Delete
                  </button>
                </div>
              </div>
            </>
          ) : (
            <p>Your cart is empty.</p>
          )}
        </div>
        <div style={contentStyle}>
          <hr style={{ margin: "0.5rem", border: "0.5px solid #FFA500" }} />

          {quantity > 0 && (
            <div style={totalStyle}>Total: ${calculateTotal()}</div>
          )}

          <button
            onClick={() => handleProceedToCheckout()}
            style={{
              backgroundColor: "#FF8C00", // Dark orange
              color: "#FFFFFF",
              padding: "0.5rem 1rem",
              borderRadius: "0.25rem",
              border: "1px solid #FF6347", // Orange reddish outline
              marginTop: "1rem",
              cursor: "pointer",
              transition:
                "background-color 0.3s ease-in-out, border 0.3s ease-in-out", // Add smooth transitions
            }}
          >
            <Link
              to="/cart"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              Proceed to Checkout
            </Link>
          </button>
        </div>
      </div>
    </div>
  );
};

CartSidebar.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  selectedItem: PropTypes.string.isRequired,
  quantity: PropTypes.number.isRequired,
  itemData: PropTypes.object.isRequired,
  onProceedToCheckout: PropTypes.func.isRequired,
};

export default CartSidebar;
