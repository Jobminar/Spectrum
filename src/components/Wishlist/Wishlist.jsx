import React, { useState, useEffect } from 'react';
import "../Perals/PearlsHome.css"
import CircularProgress from "@mui/material/CircularProgress";
import Swal from "sweetalert2";
import { useNavigate } from 'react-router-dom';

const Wishlist = () => {
  const navigate=useNavigate()
  const [isLoading, setIsLoading] = useState(true);
  const [loadingwish,setLoadingwish]=useState(false)
  const [loading,setLoading]=useState(false)
  const [wishlistItems, setWishlistItems] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const user= JSON.parse(sessionStorage.getItem("userData"))
        console.log(user)
        const response = await fetch('https://sgl-be.onrender.com/getwhishlist');
        const data = await response.json();
        const userCartItems = data.whishlist.filter(item => item.userIds === user._id);
        setWishlistItems(userCartItems);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const addtocart = async (index) => {
    setLoading(true)
    const item = wishlistItems[index];
    console.log(item,"Item need to send the api")
    try {
      // Ensure that _id is not provided to prevent duplicate key errors
      const { _id, ...itemWithoutId } = item;
  
      const response = await fetch('https://sgl-be.onrender.com/createcart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(itemWithoutId),
      });

      if (response.ok) {
        setLoading(false)
        // Assuming you have a function to show success message
        // showSuccessMessage("Item added to cart!");
        console.log("data send succesfully")
        await Swal.fire({
          icon: "success",
          title: "added item successfully!",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/cart")
            window.location.reload()
      } else {
        console.error('Failed to add item to cart:', response.statusText);
      }
    } catch (error) {
      setLoading(false)
      console.error('Error adding item to cart:', error);
    }
  };

  const updateQuantity = (index, newQuantity) => {
    const updatedWishlist = wishlistItems.map((item, i) =>
      i === index ? { ...item, quantity: newQuantity } : item
    );
    setWishlistItems(updatedWishlist);
    // Assuming you have a function to show success message
    // showSuccessMessage("Quantity updated!");
  };

  const addItem = (index) => {
    const item = wishlistItems[index];
    if (item) {
      const newQuantity = (item.quantity || 0) + 1;
      updateQuantity(index, newQuantity);
    }
  };

  const decreaseItem = (index) => {
    const item = wishlistItems[index];
    if (item) {
      const newQuantity = Math.max((item.quantity || 1) - 1, 1);
      updateQuantity(index, newQuantity);
    }
  };

  // const deleteItem = (index) => {
  //   const updatedWishlist = wishlistItems.filter((item, i) => i !== index);
  //   setWishlistItems(updatedWishlist);
  //   // showSuccessMessage("Item removed from the wishlist!");
  // };
  const deleteItem = async (index, itemId) => {
    setLoadingwish(true)
    try {
      // Make a request to the delete API endpoint
      const response = await fetch(`https://sgl-be.onrender.com/deletewhishlist/${itemId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      if (response.ok) {
        // If deletion on the server is successful, update the local state
        const updatedCart = [...wishlistItems];
        updatedCart.splice(index, 1);
        setLoadingwish(false)
        setWishlistItems(updatedCart);
        Swal.fire({
          icon: "success",
          title: "Removed item successfully!",
          text: "Item Removed from the Wishlist!",
        });
            window.location.reload()
  
        console.log("Item deleted successfully");
      } else {
        setLoading(false)
        console.error("Failed to delete item. Server returned:", response.status, response.statusText);
        // If deletion on the server fails, you may want to revert the local state or handle it accordingly
      }
    } catch (error) {
      setLoadingwish(false)
      console.error("Error deleting item:", error);
      // Handle the error, show an error message, or take appropriate action
    }
  };

  return (
    <div className="perals-map-area">
      {isLoading && (
        <div className="loading-container">
          <CircularProgress color="warning"/>
        </div>
      )}
      {!isLoading && 
      (<div className="gemsmain-con " style={{ margin: "20px" }}>
        {wishlistItems.length<=0 ?"No Items in wishlist":(
        <>
        {wishlistItems.map((item, index) => (
          <div key={index} >
            <div className='beads-box' style={{borderRadius:"7px",width:"250px",textAlign:"center"}}>
              <img
                src={`data:image/png;base64,${item.image}`}
                alt="jewelry"
                width="45%"
                height="45%"
                className="beads-image"
                style={{ paddingTop:"5px",borderRadius:"10px" }}
              />
              <p className="pearlsname">{item.name}</p>

              <h4 className="">₹ {item.price}</h4>
              <p className="pearlsname">{item.subtype}</p>
              <div style={{ display: 'flex', marginBottom: "10px" }}>
                <button onClick={() => addItem(index)} className="btn btn-success">
                  +
                </button>
                <span className="quantity">{item.quantity || 1}</span>
                <button onClick={() => decreaseItem(index)} className="btn btn-warning">
                  -
                </button>
              </div>
              <div style={{marginRight:"0px",display:"flex",marginBottom:"0px"}}>
              <button style={{backgroundColor:"red",paddingBottom:"30px",marginBottom:"20px"}} onClick={() => deleteItem(index,item._id)} className="btn btn-danger">
                Remove
              </button>
              <button style={{backgroundColor:"green",paddingBottom:"30px",marginBottom:"20px"}} onClick={() => addtocart(index)} className="btn btn-danger">
               Add to Cart
              </button>
              </div>
            </div>
          </div>
        ))}</>)}
      </div>)}
    </div>
  );
};

export default Wishlist;
