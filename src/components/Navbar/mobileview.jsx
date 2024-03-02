import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faBars,
  faHeart,
  faShoppingBag,
} from "@fortawesome/free-solid-svg-icons";
import "./mobileview.css";
import logo from "./Nav-images/logo.png";
import SearchBarPopup from "./SearchBarPopup"; // Import the SearchBarPopup component

const Navmobile = () => {
  const navigate = useNavigate();
  const [isMobileSubVisible, setMobileSubVisible] = useState(false);
  const [isHeartRed, setHeartRed] = useState(false);
  const [isSearchPopupVisible, setSearchPopupVisible] = useState(false); // New state for search popup

  const toggleMobileSubVisibility = () => {
    setMobileSubVisible(!isMobileSubVisible);
    setSearchPopupVisible(false); // Close search popup when mobile sub is toggled
  };

  const handleHeartClick = () => {
    setHeartRed(!isHeartRed);
    navigate("/fav");
  };

  const handleBagClick = () => {
    navigate("/cart");
  };

  const handleSearchIconClick = () => {
    // Toggle search popup visibility
    setSearchPopupVisible(!isSearchPopupVisible);
    setMobileSubVisible(false); // Close mobile sub menu when search popup is opened
  };

  const handleNavigation = (path) => {
    navigate(path);
    setMobileSubVisible(false); // Close the mobile-sub container after navigation
  };

  return (
    <>
      <div className="navmobile-maincon">
        <div className="gridview-con" onClick={toggleMobileSubVisibility}>
          {/* Use FontAwesome icon for the hamburger menu */}
          <FontAwesomeIcon icon={faBars} />
        </div>
        <div className="mobile-logo">
          <img src={logo} alt="logo" />
        </div>
        <div className="mobile-sub-con">
          {/* Use FontAwesome icons for search, wishlist, and bag */}
          <FontAwesomeIcon icon={faSearch} onClick={handleSearchIconClick} />
          <FontAwesomeIcon
            icon={faHeart}
            style={{ color: isHeartRed ? "red" : "inherit" }}
            onClick={handleHeartClick}
          />
          <FontAwesomeIcon icon={faShoppingBag} onClick={handleBagClick} />
        </div>
      </div>
      <div
        className="mobile-sub"
        style={{ display: isMobileSubVisible ? "block" : "none" }}
      >
        <ol>
          <li onClick={() => handleNavigation("/")}>Home</li>
          {/* <li onClick={() => handleNavigation("/astrology")}>Astrology Gems</li> */}
          {/* <li onClick={() => handleNavigation("/beads")}>Beads</li> */}
          {/* <li onClick={() => handleNavigation("/corals")}>Corals</li> */}
          <li onClick={() => handleNavigation("/diamondsjewelry")}>Diamonds</li>
          <li onClick={() => handleNavigation("/loosediamonds")}>Diamonds</li>
          <li onClick={() => handleNavigation("/gems")}>Gems</li>
          {/* <li onClick={() => handleNavigation("/jewelery")}>Jewellery</li> */}
          {/* <li onClick={() => handleNavigation("/peralhome")}>Perals</li> */}
          {/* <li onClick={() => handleNavigation("/aboutus")}>About us</li> */}
          {/* <li onClick={() => handleNavigation("/")}>Contact us</li> */}
        </ol>
      </div>
      {/* Render the SearchBarPopup component if isSearchPopupVisible is true */}
      {isSearchPopupVisible && (
        <SearchBarPopup onClose={() => setSearchPopupVisible(false)} />
      )}
    </>
  );
};

export default Navmobile;
