import { useState } from "react";
import "./AddCart.css";
import Swal from "sweetalert2";
import cartData from "./Cart.json";

const ShoppingCart = () => {
  const [cartItems, setCartItems] = useState(cartData);

  const addItem = (itemId) => {
    const updatedCart = cartItems.map((item) =>
      item.id === itemId
        ? { ...item, quantity: (item.quantity || 1) + 1 }
        : item
    );
    setCartItems(updatedCart);
    showSuccessMessage("Item added to the cart!");
  };

  const decreaseItem = (itemId) => {
    const updatedCart = cartItems.map((item) =>
      item.id === itemId
        ? { ...item, quantity: Math.max((item.quantity || 1) - 1, 1) }
        : item
    );
    setCartItems(updatedCart);
    showSuccessMessage("Quantity decreased!");
  };

  const deleteItem = (itemId) => {
    const updatedCart = cartItems.filter((item) => item.id !== itemId);
    setCartItems(updatedCart);
    showSuccessMessage("Item removed from the cart!");
  };

  const showSuccessMessage = (message) => {
    Swal.fire({
      icon: "success",
      title: "Success!",
      text: message,
      timer: 1500,
      showConfirmButton: false,
    });
  };

  const calculateTotal = () => {
    return cartItems
      .reduce((total, item) => total + item.price * (item.quantity || 1), 0)
      .toFixed(2);
  };

  const totalItems = cartItems.reduce(
    (total, item) => total + (item.quantity || 1),
    0
  );

  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-center">Shopping Cart</h2>

      <div className="row">
        <div className="col-md-9">
          <div className="row row-cols-1 row-cols-md-3">
            {cartItems.map((item) => (
              <div className="col mb-4" key={item.id}>
                <div className="card">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="card-img-top img-fluid rounded"
                  />
                  <div className="card-body text-center">
                    <h5 className="card-title">{item.name}</h5>
                    <p className="card-text">Category: {item.category}</p>
                    <p className="card-text">Price: ${item.price.toFixed(2)}</p>
                    <p>njafnl</p>
                    <p className="card-text">Quantity: {item.quantity || 1}</p>
                    <div
                      className="btn-group"
                      role="group"
                      aria-label="Item Actions"
                    >
                      <button
                        onClick={() => addItem(item.id)}
                        className="btn btn-success"
                      >
                        +
                      </button>
                      <button
                        onClick={() => decreaseItem(item.id)}
                        className="btn btn-warning"
                      >
                        -
                      </button>
                      <button
                        onClick={() => deleteItem(item.id)}
                        className="btn btn-danger"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="col-md-3">
          <div className="cart-summary bg-light p-3 rounded shadow-lg">
            <h4 className="text-primary">Order Summary</h4>
            <p className="font-weight-bold">Total Items: {totalItems}</p>
            <p className="font-weight-bold">Total Cost: ${calculateTotal()}</p>
            <p>Shipping: Free</p>
            <p>Estimated Tax: ${(calculateTotal() * 0.1).toFixed(2)}</p>
            <hr />
            <p className="font-weight-bold">
              Grand Total: $
              {(
                parseFloat(calculateTotal()) +
                parseFloat(calculateTotal()) * 0.1
              ).toFixed(2)}
            </p>
            <button className="btn btn-primary btn-block mt-3">
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCart;
