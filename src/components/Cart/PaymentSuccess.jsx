import PropTypes from "prop-types";

const PaymentSuccess = ({ totalAmount }) => {
  const estimatedDeliveryTime = "2 hours"; // Replace with your logic to calculate delivery time

  return (
    <div className="payment-success-container">
      <h2>Payment Successful!</h2>
      <p>Total Amount: ${totalAmount}</p>
      <p>Estimated Time of Delivery: {estimatedDeliveryTime}</p>
      {/* Add any other relevant information */}
    </div>
  );
};

PaymentSuccess.propTypes = {
  totalAmount: PropTypes.string.isRequired,
};

export default PaymentSuccess;
