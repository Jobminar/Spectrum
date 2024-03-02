import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Carousel, Row, Col, Card } from "react-bootstrap";
import AddCart from "../../CartButtons";
import CartSidebar from "../../CartSideNav";
import Swal from "sweetalert2";
import "./ProductFullView.css";

const ProductFullView = ({ selectedItem }) => {
  const [isCartOpen, setCartOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [quantity, setQuantity] = useState(1);

  const handleQuantityChange = (newQuantity) => {
    setQuantity(newQuantity);
  };
  useEffect(() => {
    // Check if there is a selected item and it has an image
    if (selectedItem && selectedItem.image) {
      setSelectedImage(selectedItem.image);
    } else {
      // Display a warning message if no selected item is available
      Swal.fire({
        icon: "warning",
        title: "No Item Selected",
        text: "No item is selected. Please go back and select an item.",
        showConfirmButton: false,
        timer: 3000,
      });
    }
  }, [selectedItem]);

  const handleImageClick = (imageUrl) => {
    setSelectedImage(imageUrl);
  };

  const handleAddToCart = () => {
    if (!selectedItem) {
      // Display an error message if there is no selected item
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Unable to add item to cart. Please select a valid item.",
        showConfirmButton: false,
        timer: 3000,
      });
      return;
    }

    const itemPrice = parseFloat(selectedItem.price.replace("$", ""));
    const totalPrice = (quantity * itemPrice).toFixed(2);

    // Display a success message if the item is added to the cart
    Swal.fire({
      icon: "success",
      title: "Added to Cart!",
      text: `${quantity} ${selectedItem.name}(s) added to your cart. Total Price: $${totalPrice}`,
      showConfirmButton: false,
      timer: 2000,
    });

    // Open the cart sidebar
    setCartOpen(true);
  };

  return (
    <div className="card" id="ProductViewContainer">
      <Row className="mb-4">
        <Col md={5} xs={12}>
          <Carousel interval={null} className="product-carousel">
            <Carousel.Item>
              <img
                className="d-block w-100"
                src={selectedItem.image}
                alt={`Thumbnail`}
                onClick={() => handleImageClick(selectedItem.image)}
              />
            </Carousel.Item>
          </Carousel>
        </Col>

        <Col md={6} xs={12}>
          {selectedItem && (
            <Card className="product-details-card">
              <Card.Body
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  overflow: "auto",
                }}
              >
                <div style={{ marginBottom: "0.5rem" }}>
                  <div style={{ fontWeight: "bold", textAlign: "left" }}>
                    Name:
                  </div>
                  <Card.Title
                    style={{ marginBottom: "0.5rem", textAlign: "left" }}
                  >
                    {selectedItem.name}
                  </Card.Title>
                </div>

                <div style={{ marginBottom: "0.5rem" }}>
                  <div style={{ fontWeight: "bold", textAlign: "left" }}>
                    Price:
                  </div>
                  <Card.Subtitle
                    className="mb-2 text-muted"
                    style={{ textAlign: "left" }}
                  >
                    {/* {selectedItem.price} */}
                    {/* {selectedItem.dimensions} */}
                  </Card.Subtitle>
                  <Card.Subtitle
                    className="mb-2 text-muted"
                    style={{ textAlign: "left" }}
                  >
                    {/* {selectedItem.} */}
                    {selectedItem.dimensions}
                  </Card.Subtitle>
                </div>

                {/* Add your description here */}

                <AddCart
                  onAddToCart={handleAddToCart}
                  onQuantityChange={handleQuantityChange}
                  buttonStyle={{
                    backgroundColor: "#FFA500",
                    color: "#FFFFFF",
                    padding: "0.5rem 1rem",
                    borderRadius: "0.25rem",
                    border: "none",
                    cursor: "pointer",
                    transition: "background-color 0.3s ease",
                    width: "100%",
                  }}
                  badgeStyle={{
                    backgroundColor: "#4CAF50",
                    fontSize: "0.8rem",
                  }}
                />
              </Card.Body>
            </Card>
          )}
        </Col>
      </Row>
      {isCartOpen && (
        <CartSidebar
          isOpen={isCartOpen}
          onClose={() => setCartOpen(false)}
          selectedItem={selectedItem.name}
          quantity={1}
          itemData={selectedItem}
        />
      )}
    </div>
  );
};

ProductFullView.propTypes = {
  selectedItem: PropTypes.shape({
    name: PropTypes.string,
    image: PropTypes.string,
    price: PropTypes.string,
    // Add more properties as needed
  }),
};

export default ProductFullView;
