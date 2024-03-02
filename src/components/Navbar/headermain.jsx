import { useEffect, useState } from "react";
import { FaSearch, FaHeart, FaShoppingBag } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import "./headermain.css";
import logo from "./Nav-images/logo.png";
import profile from "./Nav-images/Frame 75.png";
import SearchBarPopup from "./SearchBarPopup";
import Profile from "../Home/Profile";

import Badge from "@mui/material/Badge";
import Stack from "@mui/material/Stack";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Swal from "sweetalert2";

const Mainheader = ({ selectedProductType, userData }) => {
  // State for managing the search bar and profile popup
  const [isSearchBarOpen, setIsSearchBarOpen] = useState(false);
  const [cartda, setCartda] = useState("");
  const [wishda, setWishda] = useState("");
  const [isProfilePopupOpen, setIsProfilePopupOpen] = useState(false);
  const [isProfileBlinking, setIsProfileBlinking] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  // Hook for programmatic navigation
  const navigate = useNavigate();

  const userData1 = sessionStorage.getItem("userData");

  const handleCartClick = () => {
    if (!userData1) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please login to unlock the website features.!",
      });
      // alert("Please login to unlock the website features.");
      navigate("/login");
    } else {
      navigate("/cart");
      // .then(() => {
      //   console.log("Unlocking website features...");
      //   startBlinking(); // or any other function you want to call
      // });
    }
  };

  let sumOfQuantities;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = JSON.parse(sessionStorage.getItem("userData"));
        console.log(user);
        const response = await fetch("https://sgl-be.onrender.com/getallcart");
        const data = await response.json();
        const userCartItems = data.cartItems.filter(
          (item) => item.userIds === user._id
        );
        const updatedData = userCartItems.map((item) => ({ ...item }));
        setCartItems(updatedData);
        if (response.ok) {
          const d = updatedData.reduce(
            (total, item) => total + item.quantity,
            0
          );
          setCartda(d);
        } else {
          const errorMessage = await response.text();
          console.error(
            `Failed to fetch beads. Server response: ${errorMessage}`
          );
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
    //   const intervalId = setInterval(fetchData, 1000);

    // // Clear interval on component unmount
    // return () => clearInterval(intervalId);
  }, [cartda]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = JSON.parse(sessionStorage.getItem("userData"));
        console.log(user);
        const response = await fetch(
          "https://sgl-be.onrender.com/getwhishlist"
        );
        const data = await response.json();
        const userCartIte = data.whishlist.filter(
          (item) => item.userIds === user._id
        );
        // setWishlistItems(userCartItems);

        // setIsLoading(false);
        if (response.ok) {
          const j = userCartIte.reduce(
            (total, item) => total + item.quantity,
            0
          );
          setWishda(j);
        } else {
          const errorMessage = await response.text();
          console.error(
            `Failed to fetch beads. Server response: ${errorMessage}`
          );
        }
      } catch (error) {
        // setIsLoading(false);
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  console.log(wishda, "wishda");
  const wish = () => {
    if (!userData1) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please login to unlock the website features.!",
      });
      // alert("Please login to unlock the website features.");
      navigate("/login");
    } else {
      navigate("/wishlist");
      // .then(() => {
      //   console.log("Unlocking website features...");
      //   startBlinking(); // or any other function you want to call
      // });
    }
  };

  const startBlinking = () => {
    setIsProfileBlinking(true);

    setTimeout(() => {
      setIsProfileBlinking(false);
    }, 3000);
  };

  const openSearchBar = () => {
    setIsSearchBarOpen(true);
  };

  const closeSearchBar = () => {
    setIsSearchBarOpen(false);
  };

  return (
    <div className="main-nav-section">
      <div className="main-sub-nav">
        <div
          className={`main-sub-nav ${isProfileBlinking ? "blinking" : ""}`}
          onClick={() => navigate("/login")}
        >
          <img src={profile} alt="profile" className="profile" />
        </div>
      </div>

      <div className="main-sub-nav" onClick={() => navigate("/")}>
        Home
      </div>
      <div className="main-sub-nav" onClick={() => navigate("/aboutus")}>
        About us
      </div>
      <div className="main-sub-nav" onClick={() => navigate("/contact")}>
        Contact us
      </div>
      <div className="main-sub-nav" onClick={() => navigate("/")}>
        <img src={logo} alt="logo" />
      </div>

      <div className="main-sub-nav" id="head-extra-class">
        <p>
          Search{" "}
          <span onClick={openSearchBar}>
            <FaSearch className="icons" />
          </span>
        </p>
      </div>
      <div className="main-sub-nav" id="head-extra-class">
        <p>
          Blogs{" "}
          <span onClick={() => navigate("/blog")}>
            {/* <FaHeart className="icons" /> */}
          </span>
        </p>
      </div>
      <div className="main-sub-nav" id="head-extra-class" onClick={wish}>
        {/* () => navigate("/wishlist") */}
        {/* <p>
          Wishlist{" "}

          <span onClick={() => navigate("/wishlist")}>
            <FaHeart className="icons" />
          </span>
        </p> */}
        <Stack style={{ paddingBottom: "15px" }}>
          <Badge badgeContent={wishda} color="warning">
            <FaHeart style={{ height: "20px", width: "20px" }} color="action" />
          </Badge>
        </Stack>
      </div>
      <div
        style={{ paddingTop: "10px" }}
        className="main-sub-nav"
        id="head-extra-class"
        onClick={handleCartClick}
      >
        {/* <p>
          My cart{" "}
          <span>
            <FaShoppingBag className="icons" />
          </span>
        </p> */}

        <p>
          <Stack>
            <Badge badgeContent={cartda} color="warning">
              <ShoppingCartIcon color="action" />
            </Badge>
          </Stack>
        </p>
      </div>

      {isSearchBarOpen && (
        <SearchBarPopup
          selectedProductType={selectedProductType}
          onClose={closeSearchBar}
        />
      )}
    </div>
  );
};

Mainheader.propTypes = {
  selectedProductType: PropTypes.string.isRequired,
  userData: PropTypes.object, // Adjust the prop type based on your user data structure
};

export default Mainheader;
