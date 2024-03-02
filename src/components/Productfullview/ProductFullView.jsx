import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Carousel, Row, Col, Card } from "react-bootstrap";
import AddCart from '../Cart/CartButtons'
import Swal from "sweetalert2";
import "./ProductFullView.css";
import zodiacStonesData from "./zodiacStonesData";
import { useNavigate } from "react-router-dom";
import axios from "axios"
import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import LooseDiamonds from "./gemscertificate.png"
import CallIcon from '@mui/icons-material/Call';
import DescriptionIcon from '@mui/icons-material/Description';


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  height:300,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  // p: 4,
};


const ProductFullView = ({ selectedItem }) => {
  const navigate = useNavigate();
  const [isCartOpen, setCartOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [calculatedPrice, setCalculatedPrice] = useState(0);
  const [matchingStone, setMatchingStone] = useState(null);
  const [showScrollAnimation, setShowScrollAnimation] = useState(true);
  const [imge,setImge]=useState(null)

  const handleQuantityChange = (newQuantity) => {
    setQuantity(newQuantity);
    updateCalculatedPrice(newQuantity);
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;

      // Check if the scroll position is greater than a certain threshold
      const shouldShowScrollAnimation = scrollPosition < 100;

      // Update the state to control the scroll animation
      setShowScrollAnimation(shouldShowScrollAnimation);
    };

    // Attach the scroll event listener when the component mounts
    window.addEventListener("scroll", handleScroll);

    // Detach the scroll event listener when the component unmounts
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const updateCalculatedPrice = (newQuantity) => {
    if (selectedItem) {
      const itemPrice = parseFloat(selectedItem.price);

      // Calculate total price based on quantity
      let totalPrice;
      if (newQuantity > 0) {
        totalPrice = (newQuantity * itemPrice).toFixed(2);
      } else if (newQuantity < 0) {
        // Divide the price by the absolute quantity if it's less than 0
        totalPrice = (itemPrice / Math.abs(newQuantity)).toFixed(2);
      } else {
        // Quantity is 0
        totalPrice = 0;
      }

      setCalculatedPrice(totalPrice);
    }
  };
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    if (selectedItem) {
      console.log(selectedItem,"Selected Item")
      if (selectedItem.image1) {
        setSelectedImage(selectedItem.image1);
      } else {
        // Find the zodiac stone in the imported data (case-insensitive)
        const stone = zodiacStonesData.find(
          (stone) =>
            stone.name.toLowerCase() === selectedItem.name.toLowerCase()
        );

        if (stone) {
          setMatchingStone(stone); // Set matchingStone if found
          setSelectedImage(stone.image1);
        } else {
          // Display a warning message if the item is not a zodiac stone and has no image
          Swal.fire({
            icon: "warning",
            title: "No Image",
            text: "The selected item is not a zodiac stone and has no image.",
            showConfirmButton: false,
            timer: 3000,
          });
        }
      }

      const parsedPrice = parseFloat(selectedItem.price);
      if (!isNaN(parsedPrice)) {
        selectedItem.price = parsedPrice;
      }

      updateCalculatedPrice(quantity);
    }
  }, [selectedItem, quantity]);

  const handleImageClick = (imageUrl) => {
    setSelectedImage(imageUrl);
  };

  // const handleAddToCart = () => {
  //   const userData = sessionStorage.getItem('userData');
  
  //   if (!userData) {
  //     Swal.fire({
  //       icon: "error",
  //       title: "Error",
  //       text: "Unable to add item to cart. Please login first ",
  //     });
      
  //     // Redirect to the login page
  //     window.location.href = '/login';
  //     return;
  //   } else if (!selectedItem) {
  //     // Display an error message if there is no selected item
  //     Swal.fire({
  //       icon: "error",
  //       title: "Error",
  //       text: "Unable to add item to cart. Please select a valid item.",
  //       showConfirmButton: false,
  //       timer: 3000,
  //     });
  //     return;
  //   }
  
  //   Swal.fire({
  //     icon: "success",
  //     title: "Added to Cart!",
  //     text: `${quantity} ${selectedItem.name}(s) added to your cart. Total Price: $${calculatedPrice}`,
  //     showConfirmButton: false,
  //     timer: 2000,
  //   });
  
  //   // Open the cart sidebar
  //   setCartOpen(true);
  // };
  // const handleAddToCart = async () => {
  //   const userData = sessionStorage.getItem('userData');
  
  //   if (!userData) {
  //     // Redirect to the login page and wait for the user to log in
  //     await Swal.fire({
  //       icon: "error",
  //       title: "Error",
  //       text: "Unable to add item to cart. Please login first ",
  //     });
  
  //     // Redirect to the login page
  //     window.location.href = '/login';
  //     return;
  //   }
  
  //   // User is logged in, proceed with adding item to the cart
  //   try {
  //     console.log("jla",selectedItem,selectedItem._id)
  //     const response = await axios.post(`https://sgl-be.onrender.com/addToCart/${selectedItem._id}`, {
  //       items: [{
  //         itemId: selectedItem._id,
  //         quantity,
  //         calculatedPrice,
  //       }],
  //     }, {
  //       headers: {
  //         'Content-Type': 'application/json',
  //         // 'Authorization': `Bearer ${userData}`, // Include any necessary authentication headers
  //       },
  //     });
  //     console.log(response)
  
  //     if (response.status === 200) {
  //       console.log("response ok")
  //       Swal.fire({
  //         icon: "success",
  //         title: "Added to Cart!",
  //         text: `${quantity} ${selectedItem.name}(s) added to your cart. Total Price: $${calculatedPrice}`,
  //         showConfirmButton: false,
  //         timer: 2000,
  //       });
  
  //       // Open the cart sidebar
  //       setCartOpen(true);
  //     } else {
  //       // Handle unsuccessful API response
  //       console.error("Error adding item to cart. API response:", response);
  //       Swal.fire({
  //         icon: "error",
  //         title: "Error",
  //         text: "Failed to add item to cart. Please try again later.",
  //       });
  //     }
  //   } catch (error) {
  //     console.error("Error adding item to cart:", error);
  //     // Handle error scenario
  //     Swal.fire({
  //       icon: "error",
  //       title: "Error",
  //       text: "An unexpected error occurred. Please try again later.",
  //     });
  //   }
  // };

  // const handleAddToCart = async () => {
  //   const userData = sessionStorage.getItem('userData');
  
  //   if (!userData) {
  //     // Redirect to the login page and wait for the user to log in
  //     await Swal.fire({
  //       icon: "error",
  //       title: "Error",
  //       text: "Unable to add item to cart. Please login first ",
  //     });
  
  //     // Redirect to the login page
  //     window.location.href = '/login';
  //     return;
  //   }
  
  //   if (!selectedItem) {
  //     // Display an error message if there is no selected item
  //     Swal.fire({
  //       icon: "error",
  //       title: "Error",
  //       text: "Unable to add item to cart. Please select a valid item.",
  //       showConfirmButton: false,
  //       timer: 3000,
  //     });
  //     return;
  //   }
  
  //   // User is logged in and selectedItem is defined, proceed with adding item to the cart
  //   try {
  //     console.log("jla", selectedItem, selectedItem._id);
  //     const response = await axios.post(`https://sgl-be.onrender.com/addToCart/${selectedItem._id}`, {
  //       items: [{
  //         selectedItem,
  //         quantity,
  //         calculatedPrice,
  //       }],
  //     }, {
  //       headers: {
  //         'Content-Type': 'application/json',
  //         // 'Authorization': `Bearer ${userData}`, // Include any necessary authentication headers
  //       },
  //     });
  //     console.log(response);
  
  //     // rest of the code...
  //   } catch (error) {
  //     console.error("Error adding item to cart:", error);
  //     // Handle error scenario
  //     Swal.fire({
  //       icon: "error",
  //       title: "Error",
  //       text: "An unexpected error occurred. Please try again later.",
  //     });
  //   }
  // };
  const handleAddToCart = async () => {
    const userData = sessionStorage.getItem('userData');
    const category=sessionStorage.getItem("Category")

    if (category==="Loosediamonds"){
      setImge(LooseDiamonds)
    }
  
    if (!userData) {
      // Redirect to the login page and wait for the user to log in
      await Swal.fire({
        icon: "error",
        title: "Error",
        text: "Unable to add item to cart. Please login first ",
      });
  
      // Redirect to the login page
      // window.location.href = '/login';
      return;
    }
  
    // if (!selectedItem) {
    //   // Display an error message if there is no selected item
    //   Swal.fire({
    //     icon: "error",
    //     title: "Error",
    //     text: "Unable to add item to cart. Please select a valid item.",
    //     showConfirmButton: false,
    //     timer: 3000,
    //   });
    //   return;
    // }
  
    // // User is logged in and selectedItem is defined, proceed with adding item to the cart
    // try {
    //   const response = await axios.post(
    //     `https://sgl-be.onrender.com/addToCart/`,
    //     {
    //       selectedItem,
    //       quantity,
    //       calculatedPrice,
    //     },
    //     {
    //       headers: {
    //         'Content-Type': 'application/json',
    //         // 'Authorization': `Bearer ${userData}`, // Include any necessary authentication headers
    //       },
    //     }
    //   );
  
    //   if (response.status === 200) {
    //     Swal.fire({
    //       icon: "success",
    //       title: "Added to Cart!",
    //       text: `${quantity} ${selectedItem.name}(s) added to your cart. Total Price: $${calculatedPrice}`,
    //       showConfirmButton: false,
    //       timer: 2000,
    //     });
  
    //     // Open the cart sidebar
    //     setCartOpen(true);
    //   } else {
    //     console.error("Error adding item to cart. API response:", response);
    //     Swal.fire({
    //       icon: "error",
    //       title: "Error",
    //       text: "Failed to add item to cart. Please try again later.",
    //     });
    //   }
    // } catch (error) {
    //   console.error("Error adding item to cart:", error);
    //   Swal.fire({
    //     icon: "error",
    //     title: "Error",
    //     text: "An unexpected error occurred. Please try again later.",
    //   });
    // }
  };
  

  return (
    <div className="card" id="ProductViewContainer">
      <Row className="mb-4">
        <Col md={5} xs={12}>
          <Carousel interval={null} className="product-carousel">
            <Carousel.Item>
              {selectedItem ? (
                <>
                  {selectedItem.image1 ? (
                    <img
                      className="d-block w-100"
                      src={
                        selectedItem.image1.startsWith("/")
                          ? `data:image/png;base64,${selectedItem.image1}`
                          : selectedItem.image1
                      }
                      alt={`Thumbnail`}
                      onClick={() => handleImageClick(selectedItem.image1)}
                    />
                  ) : (
                    <>
                      {matchingStone ? (
                        <img
                          className="d-block w-100"
                          src={matchingStone.image1}
                          alt={`Thumbnail`}
                          onClick={() => handleImageClick(matchingStone.image1)}
                        />
                      ) : (
                        <p>No image available</p>
                      )}
                    </>
                  )}
                </>
              ) : (
                <p>No item selected</p>
              )}
            </Carousel.Item>
          </Carousel>
        </Col>
        <Col md={6} xs={12}>
          {selectedItem && (
            <Card className="product-details-card">
              <Card.Body>
                <div>
                  <div className="product-detail">
                    <span className="detail-label">Name</span>
                    <span className="detail-value" style={{paddingLeft:"146.5px"}}>: {selectedItem.name}</span>
                  </div>
                  <div className="product-detail">
                    <span className="detail-label">Price</span>
                    <span className="detail-value" style={{paddingLeft:"152.5px"}}>:<a href="tel:+123456789"> <CallIcon style={{color:"orange",cursor:"pointer"}}/> </a>Contact Agent</span>
                  </div>
                  <div className="product-detail">
                    <span className="detail-label">Dimensions</span>
                    <span className="detail-value" style={{paddingLeft:"105px"}}>: {selectedItem.dimensions}</span>
                  </div>
                  <div className="product-detail">
                    <span className="detail-label">Weight</span>
                    <span className="detail-value" style={{paddingLeft:"139.5px"}}>: {selectedItem.weight}</span>
                  </div>
                  <div className="product-detail">
                    <span className="detail-label">Units</span>
                    <span className="detail-value" style={{paddingLeft:"152.5px"}}>: {selectedItem.units}</span>
                  </div>
                  <div className="product-detail">
                    <span className="detail-label">Colour</span>
                    <span className="detail-value" style={{paddingLeft:"142px"}}>: {selectedItem.colour}</span>
                  </div>
                  <div className="product-detail">
                    <span className="detail-label">Subtype</span>
                    <span className="detail-value" style={{paddingLeft:"130.5px"}}>: {selectedItem.subtype}</span>
                  </div>
                  <div className="product-detail">
                    <span className="detail-label">Shape</span>
                    <span className="detail-value" style={{paddingLeft:"143px"}}>: {selectedItem.shape}</span>
                  </div>
                  <div className="product-detail">
                    <span className="detail-label">description</span>
                    <span className="detail-value" style={{paddingLeft:"111.5px"}}>: {selectedItem.description}</span>
                  </div>
                  {/* <div className="product-detail">
                    <span className="detail-label">Units</span>
                    <span className="detail-value" style={{paddingLeft:"153px"}}>: {selectedItem.units}</span>
                  </div> */}
                  {/* <div className="product-detail">
                    <span className="detail-label">Value</span>
                    <span className="detail-value" style={{paddingLeft:"149.5px"}}>: {selectedItem.value}</span>
                  </div> */}
                  {/* <div className="product-detail">
                    <span className="detail-label">Shape</span>
                    <span className="detail-value" style={{paddingLeft:"143px"}}>: {selectedItem.shape}</span>
                  </div> */}
                  {/* <div className="product-detail">
                    <span className="detail-label">Trnasperency</span>
                    <span className="detail-value" style={{paddingLeft:"92px"}}>: {selectedItem.transparency}</span>
                  </div> */}
                  {/* <div className="product-detail">
                    <span className="detail-label">Hardness</span>
                    <span className="detail-value" style={{paddingLeft:"121px"}}>: {selectedItem.hardness}</span>
                  </div> */}
                  <div className="product-detail">
                    <span className="detail-label">Microscopic Examination</span>
                    <span className="detail-value" onClick={handleOpen} style={{paddingLeft:"12px"}}>: <DescriptionIcon style={{color:"orange",cursor:"pointer"}}/></span>
                  </div>
                  {/* <div className="product-detail">
                    <span className="detail-label">Units:</span>
                    <span className="detail-value">${selectedItem.units}</span>
                  </div> */}
                </div>

                <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            <img style={{height:"25%",width:"100%"}} src={ `data:image/png;base64,${selectedItem.image2}`
                      } alt="Certificate" />
          </Typography>
        </Box>
      </Modal>

                {/* Add your description here */}
                <div
                  className={`add-cart-wrapper ${
                    showScrollAnimation ? "scroll-animation" : ""
                  }`}
                  style={{ overflowX: "auto", minWidth: "150px" }}
                >
                  <AddCart
                    onAddToCart={handleAddToCart}
                    onQuantityChange={handleQuantityChange}
                    isCartOpen
                    buttonStyle={{
                      backgroundColor: "#FFA500",
                      color: "#FFFFFF",
                      padding: "0",
                      borderRadius: "0.25rem",
                      border: "none",
                      cursor: "pointer",
                      transition: "background-color 0.3s ease",
                      width: "50%",
                    }}
                    badgeStyle={{
                      backgroundColor: "#4CAF50",
                      fontSize: "0.8rem",
                    }}
                  />
                </div>
              </Card.Body>
            </Card>
          )}
        </Col>
      </Row>
      {/* {isCartOpen && (
        <CartSidebar
          isOpen={isCartOpen}
          onClose={() => setCartOpen(false)}
          selectedItem={selectedItem.name}
          quantity={quantity}
          itemData={selectedItem}
        />
      )} */}
    </div>
  );
};

ProductFullView.propTypes = {
  selectedItem: PropTypes.shape({
    name: PropTypes.string,
    image1: PropTypes.string,
    price: PropTypes.number,
    // Add more properties as needed
  }),
};

export default ProductFullView;
