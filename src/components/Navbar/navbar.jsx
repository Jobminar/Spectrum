import PropTypes from "prop-types";
import "./navbar.css";
import { useState } from "react";
import Mainheader from "./headermain";
import Productheader from "./productsheader";
import Navmobile from "./mobileview";

const Navbar = ({ userData }) => {
  const [selectedProductType, setSelectedProductType] = useState("");

  const handleSelectProductType = (productType) => {
    setSelectedProductType(productType);
  };
  return (
    <>
      <div className="desk-head">
        <Mainheader
          userData={userData}
          selectedProductType={selectedProductType}
        />
      </div>
      <div className="mobile-head">
        <Navmobile />
      </div>

      <div className="hrline"></div>
      <div className="desk-product">
        <Productheader onSelectProductType={handleSelectProductType} />
      </div>
    </>
  );
};
Navbar.propTypes = {
  userData: PropTypes.object, // Adjust the prop type based on your user data structure
};
export default Navbar;
