import React from "react";
import { useLocation } from "react-router-dom";
import ProductFullView from "./ProductFullView";
import FooterWithImages from "./FooterWithImages";

const ProductDetails = () => {
  const location = useLocation();
  // Retrieve selected item data from session storage
  const selectedItem = JSON.parse(sessionStorage.getItem("selectedItem"));

  return (
    <div className="diamond-display-container">
      <div className="diamond-display-content">
        <ProductFullView selectedItem={selectedItem} />
        <div className="main-content">
          <FooterWithImages />
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
