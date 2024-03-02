// Productheader.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import "./productheader.css";

const Productheader = ({ onSelectProductType }) => {
  const navigate = useNavigate();

  const handleProductClick = (productType) => {
    localStorage.setItem("selectedProductType", productType); // Update local storage
    console.log(`Selected Product Type: ${productType}`); // Log the selected product type
    navigate(`/${productType}`);
    onSelectProductType(productType); // Callback to update the selected product type
  };

  return (
    <div className="" style={{display:"flex",justifyContent:"space-around",marginTop:"20px",marginBottom:"20px"}}>
      <div
        className="product-head-sub-section"
        onClick={() => handleProductClick("Gems")}
      >
        Gems
      </div>
      {/* <div
        className="product-head-sub-section"
        onClick={() => handleProductClick("Beads")}
      >
        Beads
      </div> */}
      {/* <div
        className="product-head-sub-section"
        onClick={() => handleProductClick("Diamondsjewelry")}
      >
        Diamonds Jewelry
      </div> */}
      <div
        className="product-head-sub-section"
        onClick={() => handleProductClick("Diamondsjewelry")}
      >
        Diamonds Jewelry
      </div>
      {/* <div
        className="product-head-sub-section"
        onClick={() => handleProductClick("astrology")}
      >
        Astrology gems
      </div> */}
      {/* <div
        className="product-head-sub-section"
        onClick={() => handleProductClick("Pearls")}
      >
        Pearls
      </div> */}
      {/* <div
        className="product-head-sub-section"
        onClick={() => handleProductClick("Corals")}
      >
        Corals
      </div> */}
      <div
        className="product-head-sub-section"
        onClick={() => handleProductClick("Loosediamonds")}
      >
        Loose Diamonds
      </div>
    </div>
  );
};

Productheader.propTypes = {
  onSelectProductType: PropTypes.func.isRequired,
};

export default Productheader;
