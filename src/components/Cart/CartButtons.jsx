
import { useEffect, useState } from "react";
import "./CartButton.css";
import PropTypes from "prop-types";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
 
const AddCart = ({ onAddToCart, onQuantityChange }) => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const storedUserData = sessionStorage.getItem("userData");
    if (storedUserData) {
      setUserData(JSON.parse(storedUserData));
    }
  }, []);
 
  const addToWishlist = async () => {
    if (userData) {
      const selectedItem = JSON.parse(sessionStorage.getItem("selectedItem"));
      const selecteduserid = JSON.parse(sessionStorage.getItem("userData"));
      const seletedeid = selecteduserid._id;
 
      if (selectedItem) {
        setLoading(true);
        const requestData = {
          userIds: seletedeid || "user123", // Replace "user123" with a default value if needed
          quantity: cartQuantity,
          image: selectedItem.image1,
          name: selectedItem.name,
          weight: selectedItem.weight,
          colour: selectedItem.colour,
          units: selectedItem.units,
          shape: selectedItem.shape,
          dimensions: selectedItem.dimensions,
          transparency: selectedItem.transparency || "No Data",
          hardness: selectedItem.hardness || "No Data",
          size: selectedItem.size || 0,
          clarity: selectedItem.clarity || "No Data",
          subtype: selectedItem.subtype || "No Data",
        };
 
        try {
          const response = await fetch(
            "http://localhost:4000/createwishlist", // Corrected URL
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(requestData),
            }
          );
 
          if (response.ok) {
            onAddToCart(cartQuantity);
            Swal.fire({
              icon: "success",
              title: "Added to Wishlist!",
              showConfirmButton: false,
              timer: 1500,
            });
            navigate("/wishlist");
            window.location.reload();
          } else {
            Swal.fire({
              icon: "error",
              title: "Error Adding to Wishlist",
              text: "There was an issue adding the item to the wishlist. Please try again later.",
            });
          }
        } catch (error) {
          console.error("Error adding to wishlist:", error);
          Swal.fire({
            icon: "error",
            title: "Error Adding to Wishlist",
            text: "There was an unexpected error. Please try again later.",
          });
        } finally {
          setLoading(false);
        }
      } else {
        Swal.fire({
          icon: "error",
          title: "Item Not Found",
          text: "Unable to add item to wishlist. Please select an item first.",
        });
      }
    } else {
      Swal.fire({
        icon: "error",
        title: "Login First",
        text: "Unable to add item to wishlist. Please login first.",
      });
      window.location.href = "/login";
    }
  };
 
  const [cartQuantity, setCartQuantity] = useState(1);
 
  const incrementCart = () => {
    setCartQuantity(cartQuantity + 1);
    animateButton();
    onQuantityChange(cartQuantity + 1);
  };
 
  const decrementCart = () => {
    if (cartQuantity > 0) {
      setCartQuantity(cartQuantity - 1);
      animateButton();
      onQuantityChange(cartQuantity - 1);
    }
  };
 
  const handleAddToCart = async () => {
    if (userData) {
      const selectedItem = JSON.parse(sessionStorage.getItem("selectedItem"));
      const selectedUserId = JSON.parse(sessionStorage.getItem("userData"));
      const selectedId = selectedUserId._id; // corrected the variable name
  
      if (selectedItem) {
        setLoading(true);
        const requestData = {
          userIds: selectedId, // corrected the variable name
          quantity: cartQuantity,
          image: selectedItem.image1,
          name: selectedItem.name,
          weight: selectedItem.weight,
          colour: selectedItem.colour,
          units: selectedItem.units,
          shape: selectedItem.shape,
          dimensions: selectedItem.dimensions,
          transparency: selectedItem.transparency || "No Data",
          hardness: selectedItem.hardness || 0,
          size: selectedItem.size || 0,
          clarity: selectedItem.clarity || "No Data",
          subtype: selectedItem.subtype || "No Data",
        };
  
        try {
          console.log("Sending request data:", requestData);
          const response = await fetch("http://localhost:4000/create", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(requestData),
          });
  
          console.log("Response from server:", response);
  
          if (response.ok) {
            onAddToCart(cartQuantity);
            Swal.fire({
              icon: "success",
              title: "Added to Cart!",
              showConfirmButton: false,
              timer: 1500,
            });
            navigate("/cart");
            window.location.reload();
          } else {
            Swal.fire({
              icon: "error",
              title: "Error Adding to Cart",
              text: "There was an issue adding the item to the cart. Please try again later.",
            });
          }
        } catch (error) {
          console.error("Error adding to cart:", error);
          Swal.fire({
            icon: "error",
            title: "Error Adding to Cart",
            text: "There was an unexpected error. Please try again later.",
          });
        } finally {
          setLoading(false);
        }
      } else {
        Swal.fire({
          icon: "error",
          title: "Item Not Found",
          text: "Unable to add item to cart. Please select an item first.",
        });
      }
    } else {
      Swal.fire({
        icon: "error",
        title: "Login First",
        text: "Unable to add item to cart. Please login first.",
      });
      window.location.href = "/login";
    }
  };
  
 
  const animateButton = () => {
    const buttonElement = document.getElementById("add-to-cart-button");
 
    if (buttonElement) {
      buttonElement.style.backgroundColor = "#FF6347";
      setTimeout(() => {
        buttonElement.style.backgroundColor = "#FFA500";
      }, 300);
    }
  };
 
  const buttonStyle = {
    backgroundColor: "#FFA500",
    color: "#FFFFFF",
    padding: "0.5rem 1rem",
    borderRadius: "0.25rem",
    border: "none",
    marginRight: "0.5rem",
    cursor: "pointer",
    fontSize: "1rem",
    display: "inline-flex",
    alignItems: "center",
  };
 
  const wishlistButtonStyle = {
    backgroundColor: "#FFD700",
    color: "#FFFFFF",
    padding: "0.5rem 1rem",
    borderRadius: "0.25rem",
    border: "none",
    marginRight: "0.5rem",
    cursor: "pointer",
    fontSize: "1rem",
    transition: "background-color 0.3s, transform 0.3s",
    display: "inline-flex",
    alignItems: "center",
  };
 
  wishlistButtonStyle[":hover"] = {
    backgroundColor: "#FFEC8B",
    transform: "scale(1.05)",
  };
 
  buttonStyle[":hover"] = {
    backgroundColor: "#FF8000",
    transform: "scale(1.05)",
  };
 
  return (
    <div className="container mt-3">
      <div
        className="p-3 add-cart-container"
        style={{
          backgroundColor: "#FFC777",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "1rem",
        }}
      >
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="text-wrapper-40 m-1 d-flex justify-content-between align-items-center">
            <button
              style={{
                ...wishlistButtonStyle,
                margin: "0.2rem 0",
                padding: "0.3rem 0.5rem",
                fontSize: "0.9rem",
              }}
              onClick={addToWishlist}
            >
              <i className="fas fa-heart"></i>
            </button>
 
            <button
              style={{
                ...buttonStyle,
                margin: "0.2rem 0",
                padding: "0.3rem 0.5rem",
                fontSize: "0.9rem",
              }}
              onClick={handleAddToCart}
            >
              <i className="fas fa-cart-plus"></i> Add{" "}
              <span
                className="badge bg-secondary mx-1"
                style={{ fontSize: "0.8rem" }}
              >
                {cartQuantity}
              </span>
            </button>
            <button
              style={{
                ...buttonStyle,
                margin: "0.2rem 0",
                padding: "0.3rem 0.5rem",
                fontSize: "0.9rem",
              }}
              onClick={incrementCart}
            >
              <i className="fas fa-plus"></i>
            </button>
            <button
              style={{
                ...buttonStyle,
                margin: "0.2rem 0",
                padding: "0.3rem 0.5rem",
                fontSize: "0.9rem",
              }}
              onClick={decrementCart}
            >
              <i className="fas fa-minus"></i>
            </button>
          </div>
        )}
      </div>
      <hr />
    </div>
  );
};
 
AddCart.propTypes = {
  onAddToCart: PropTypes.func.isRequired,
  onQuantityChange: PropTypes.func.isRequired,
};
 
export default AddCart;
 