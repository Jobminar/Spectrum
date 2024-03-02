import React, { useEffect, useState } from "react";
import "./AddCart.css";
import Swal from "sweetalert2";
import CircularProgress from "@mui/material/CircularProgress";
import { useNavigate } from "react-router-dom";

const ShoppingCart = () => {
  const navigate = useNavigate();
  const [showPayment, setShowPayment] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [address, setAddress] = useState("");
  const [grandTotal, setGrandTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  //add to cart is working
  const changeadd = (e) => {
    setAddress(e.target.value);
  };

  const user = JSON.parse(sessionStorage.getItem("userData"));
  if (address.length <= 0) {
    setAddress(user.address);
  }
  // setAddress(user.address)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = JSON.parse(sessionStorage.getItem("userData"));

        if (!userData || !userData._id) {
          console.error(
            "User data or user ID not available in sessionStorage."
          );
          return;
        }

        const userIds = userData._id;

        const response = await fetch(
          `http://localhost:4000/getCartItemById/${userIds}`
        );

        const data = await response.json();

        if (response.ok) {
          setCartItems(data);
          setIsLoading(false);
        } else {
          const errorMessage = await response.text();
          console.error(
            `Failed to fetch cart items. Server response: ${errorMessage}`
          );
          setIsLoading(false);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    // Recalculate grandTotal whenever cartItems change
    const totalCost = cartItems.reduce(
      (total, item) => total + item.price * (item.quantity || 1),
      0
    );
    setGrandTotal(parseFloat(totalCost));
  }, [cartItems]);

  const updateQuantity = (index, newQuantity) => {
    const updatedCart = [...cartItems];
    updatedCart[index] = { ...updatedCart[index], quantity: newQuantity };
    setCartItems(updatedCart);
  };

  const addItem = (index) => {
    const item = cartItems[index];
    if (item) {
      const newQuantity = (item.quantity || 0) + 1;
      updateQuantity(index, newQuantity);
    }
  };

  const decreaseItem = (index) => {
    const item = cartItems[index];
    if (item) {
      const newQuantity = Math.max((item.quantity || 1) - 1, 1);
      updateQuantity(index, newQuantity);
    }
  };

  const deleteItem = async (index, itemId) => {
    try {
      // Make a request to the delete API endpoint
      const response = await fetch(
        `http://localhost:4000/deletecartItems/${index}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
  
      if (response.ok) {
        // If deletion on the server is successful, update the local state
        const updatedCart = [...cartItems];
        updatedCart.splice(index, 1);
        setCartItems(updatedCart);
        console.log("Item deleted successfully");
      } else {
        // Handle the error, show an error message, or take appropriate action
        console.error(
          "Failed to delete item. Server returned:",
          response.status,
          response.statusText
        );
      }
    } catch (error) {
      console.error("Error deleting item:", error);
      // Handle the error, show an error message, or take appropriate action
    }
  };
  
  const handleProceedToCheckout = () => {
    const userdata = JSON.parse(sessionStorage.getItem("userData"));
    const username = userdata.email;
    const number = userdata.whatsapp;
    const userID = userdata._id;
    // const address=addres
    const totalItems = cartItems.reduce(
      (total, item) => total + (item.quantity || 1),
      0
    );
    const totalCost = cartItems.reduce(
      (total, item) => total + item.price * (item.quantity || 1),
      0
    );
    const shipping = 0;
    const grandTotal = parseFloat(totalCost) + parseFloat(totalCost);
    const date = new Date().toLocaleDateString();
    const status = "Initializing";

    const orderDetails = {
      totalItems,
    
      shipping,

      username,
      date,
      address,
      status,
      userID,
      number,
    };

    postUserOrder(orderDetails);
  };

  const postUserOrder = async (orderDetails) => {
    setLoading(true);
    console.log(orderDetails,'this orderDetails sent');
    try {
      const response = await fetch(
      
        "http://localhost:4000/postuserorder",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(orderDetails),
        }
      );

      if (response.ok) {
        const responseData = await response.json();
        console.log("Order placed successfully:", responseData);
        alert("Order successfully");
        await deleteCartData(orderDetails.userID);
        // You can handle success, show a confirmation message, or navigate to a success page
      } else {
        console.error(
          "Failed to place order. Server returned:",
          response.status,
          response.statusText
        );
        // Handle the error, show an error message, or take appropriate action
      }
    } catch (error) {
      console.error("Error posting user order:", error);
      // Handle the error, show an error message, or take appropriate action
    } finally {
      setLoading(false);
    }
  };

 

  const calculateTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * (item.quantity || 1),
      0
    );
  };

  const totalItems = cartItems.reduce(
    (total, item) => total + (item.quantity || 1),
    0
  );

  return (
    <div id="shoppingBag" className="container shopping-cart">
      <div
        style={{
          textAlign: "center",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
        }}
      >
        <h2 className=" text-center">Shopping Cart</h2>
        <h4
          style={{
            textAlign: "end",
            padding: "10px",
            margin: "20px",
            borderRadius: "7px",
            cursor: "pointer",
            backgroundColor: "rgba(244, 130, 31, 1)",
          }}
          onClick={() => navigate("/orderhistory")}
        >
          Order History
        </h4>
      </div>
      {isLoading && (
        <div className="loading-container" style={{ height: "450px" }}>
          <CircularProgress color="warning" />
          <h1>Please Wait...</h1>
        </div>
      )}

      {!isLoading && (
        <>
          {cartItems.length <= 0 ? (
            "No Items in the Cart"
          ) : (
            <div className="cart-items-grid">
              {cartItems.map((item, index) => (
                <div className="cart-item" key={item.id}>
                  <div className="cart-item-image">
                    <img
                      src={`data:image/png;base64,${item.image}`}
                      alt={item.name}
                      style={{ height: "200px", width: "200px" }}
                    />
                  </div>
                  <div className="cart-item-details">
                    <h5 className="cart-item-name">{item.name}</h5>
                    <p className="cart-item-category">
                      Category: {item.subtype}
                    </p>
                    {/* <p className="cart-item-price">${item.price.toFixed(2)}</p> */}
                    <p className="cart-item-price">${item.price}</p>

                    <div className="cart-item-actions">
                      <button
                        onClick={() => addItem(index)}
                        className="btn btn-success"
                      >
                        +
                      </button>
                      <span className="quantity">{item.quantity || 1}</span>
                      <button
                        onClick={() => decreaseItem(index)}
                        className="btn btn-warning"
                      >
                        -
                      </button>
                      <button onClick={() => deleteItem(item._id, index)} className="btn btn-danger">
                        Remove
                     </button>

                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          {cartItems.length <= 0 ? (
            ""
          ) : (
            <div className="cart-summary bg-light p-3 rounded">
              <div className="order-summary">
                <h4 className="text-primary">Order Summary</h4>
                <p className="font-weight-bold">Total Items: {totalItems}</p>
                <p className="font-weight-bold">
                  Total Cost: ${calculateTotal()}
                </p>
                <p>Shipping: Free</p>
                {/* <input type="text" value={address} style={{width:"300px"}} placeholder="Add Address here" onChange={changeadd} /> */}
                {/* <p>Estimated Tax: ${(calculateTotal() * 0.1).toFixed(2)}</p> */}
              </div>

              <div className="invoice-block">
                <hr />
                <p
                  className="font-weight-bold"
                  style={{ textAlign: "end", paddingRight: "35px" }}
                >
                  <p>Address: {address}</p>
                  Grand Total: ${grandTotal.toFixed(2)}
                </p>

                <div style={{ textAlign: "end" }}>
                  <button
                    className="btn"
                    style={{
                      width: "200px",
                      paddingBottom: "30px",
                      backgroundColor: "rgba(244, 130, 31, 1)",
                      color: "white",
                    }}
                    onClick={() => handleProceedToCheckout()}
                  >
                    {loading ? "Please Wait" : "Proceed to Checkout"}
                  </button>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ShoppingCart;
