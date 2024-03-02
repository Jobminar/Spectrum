import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { loadStripe } from "@stripe/stripe-js";
import Razorpay from "razorpay";
import Swal from "sweetalert2";

const Payment = ({ cartItems, totalAmount, onPaymentSuccess }) => {
  const [stripe, setStripe] = useState(null);
  const [razorpay, setRazorpay] = useState(null);

  useEffect(() => {
    const initializeStripe = async () => {
      try {
        setStripe(await loadStripe(process.env.REACT_APP_STRIPE_KEY));
      } catch (error) {
        console.error("Error initializing Stripe:", error);
        showErrorMessage(
          "Failed to initialize Stripe. Please try again later."
        );
      }
    };

    initializeStripe();

    // Initialize Razorpay
    const options = {
      key: process.env.REACT_APP_RAZORPAY_KEY,
      // ... other Razorpay options
    };

    setRazorpay(new Razorpay(options));
  }, []);

  const handleCardPayment = async () => {
    try {
      const session = await stripe.redirectToPayment({
        lineItems: cartItems.map((item) => ({
          price: item.price * 100,
          quantity: item.quantity || 1,
        })),
        mode: "payment",
        successUrl: "YOUR_SUCCESS_URL",
        cancelUrl: "YOUR_CANCEL_URL",
      });

      if (session.error) {
        showErrorMessage(session.error.message);
      } else {
        onPaymentSuccess(totalAmount);
      }
    } catch (error) {
      console.error("Error:", error);
      showErrorMessage("An error occurred during payment. Please try again.");
    }
  };

  const handleRazorpayPayment = () => {
    razorpay.open();
  };

  const handleRazorpaySuccess = (response) => {
    fetch("/process-razorpay-payment", {
      method: "POST",
      body: JSON.stringify(response),
    })
      .then((response) => {
        if (response.ok) {
          onPaymentSuccess(totalAmount);
        } else {
          showErrorMessage("Payment failed. Please try again.");
        }
      })
      .catch((error) => {
        console.error("Error processing Razorpay payment:", error);
        showErrorMessage("An error occurred during payment.");
      });
  };

  const handleRazorpayError = (error) => {
    console.error("Razorpay payment error:", error);
    showErrorMessage("Payment failed. Please try again.");
  };

  const showErrorMessage = (message) => {
    Swal.fire({
      icon: "error",
      title: "Error!",
      text: message,
    });
  };

  return (
    <div className="checkout-container">
      <h2 className="mb-4 text-center">Payment</h2>
      <div className="order-summary">
        <h3>Order Summary</h3>
        <ul>
          {cartItems.map((item) => (
            <li key={item.id}>
              {item.name} - ${item.price.toFixed(2)} x {item.quantity || 1}
            </li>
          ))}
        </ul>
        <p className="total-amount">Total Amount: ${totalAmount}</p>
      </div>

      <div className="payment-options">
        <button className="btn btn-primary" onClick={handleCardPayment}>
          Pay with Card
        </button>
        <button
          className="btn btn-primary"
          onClick={() =>
            razorpay.open({
              onSuccess: handleRazorpaySuccess,
              onError: handleRazorpayError,
            })
          }
        >
          Pay with Razorpay (UPI, etc.)
        </button>
      </div>
    </div>
  );
};

Payment.propTypes = {
  cartItems: PropTypes.array.isRequired,
  totalAmount: PropTypes.string.isRequired,
  onPaymentSuccess: PropTypes.func.isRequired,
};

export default Payment;
