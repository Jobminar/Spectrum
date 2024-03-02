import { useState } from "react";
import { Link } from "react-router-dom";

const SideNav = () => {
  const navStyle = {
    backgroundColor: "#FFDAB9", // Pale orange color
    minHeight: "100vh",
    padding: "20px",
    border: "1px solid #FF4500", // Black border
    borderRadius: "1px", // Optional: add border-radius for rounded corners
  };

  const [selectedDropdown, setSelectedDropdown] = useState(null);

  const handleDropdownClick = (dropdownName) => {
    setSelectedDropdown((prev) =>
      prev === dropdownName ? null : dropdownName
    );
  };

  const isDropdownSelected = (dropdownName) => {
    return selectedDropdown === dropdownName ? "selected-dropdown" : "";
  };

  const dropdownStyle = {
    color: "black",
    backgroundColor: "#FFDAB9", // Pale orange color

    borderRadius: "5px",
    padding: "5px",
  };

  const listItemStyle = {
    color: "black",
  };

  return (
    <nav className="navbar navbar-expand-lg flex-column" style={navStyle}>
      <ul className="navbar-nav flex-column">
        {/* First Dropdown */}
        <li
          className={`nav-item dropdown ${isDropdownSelected(
            "gemstonesDropdown"
          )}`}
        >
          <a
            className="nav-link dropdown-toggle text-wrapper text-orange"
            href="#"
            id="gemstonesDropdown"
            role="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
            style={dropdownStyle}
            onClick={() => handleDropdownClick("gemstonesDropdown")}
          >
            Astro Gems
          </a>
          <ul className="dropdown-menu">
            <li className="nav-item">
              <Link
                to="/gemstones/astro-gems"
                className={`dropdown-item text-wrapper-15 text-orange ${isDropdownSelected(
                  "gemstonesDropdown"
                )}`}
                style={listItemStyle}
              >
                Option 1
              </Link>
            </li>
            {/* Add more items as needed */}
          </ul>
        </li>

        {/* Second Dropdown */}
        <li
          className={`nav-item dropdown ${isDropdownSelected(
            "vedicGemstonesDropdown"
          )}`}
        >
          <a
            className="nav-link dropdown-toggle text-wrapper text-orange"
            href="#"
            id="vedicGemstonesDropdown"
            role="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
            style={dropdownStyle}
            onClick={() => handleDropdownClick("vedicGemstonesDropdown")}
          >
            Vedic Gemstones
          </a>
          <ul className="dropdown-menu">
            <li className="nav-item">
              <Link
                to="/gemstones/vedic-gemstones"
                className={`dropdown-item text-wrapper-16 text-orange ${isDropdownSelected(
                  "vedicGemstonesDropdown"
                )}`}
                style={listItemStyle}
              >
                Option 1
              </Link>
            </li>
            {/* Add more items as needed */}
          </ul>
        </li>

        {/* Third Dropdown */}
        <li
          className={`nav-item dropdown ${isDropdownSelected(
            "exclusiveGemstonesDropdown"
          )}`}
        >
          <a
            className="nav-link dropdown-toggle text-wrapper text-orange"
            href="#"
            id="exclusiveGemstonesDropdown"
            role="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
            style={dropdownStyle}
            onClick={() => handleDropdownClick("exclusiveGemstonesDropdown")}
          >
            Exclusive Gemstones
          </a>
          <ul className="dropdown-menu">
            <li className="nav-item">
              <Link
                to="/gemstones/exclusive-gemstones"
                className={`dropdown-item text-wrapper-17 text-orange ${isDropdownSelected(
                  "exclusiveGemstonesDropdown"
                )}`}
                style={listItemStyle}
              >
                Option 1
              </Link>
            </li>
            {/* Add more items as needed */}
          </ul>
        </li>

        {/* Fourth Dropdown */}
        <li
          className={`nav-item dropdown ${isDropdownSelected(
            "otherGemstonesDropdown"
          )}`}
        >
          <a
            className="nav-link dropdown-toggle text-wrapper text-orange"
            href="#"
            id="otherGemstonesDropdown"
            role="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
            style={dropdownStyle}
            onClick={() => handleDropdownClick("otherGemstonesDropdown")}
          >
            Other Gemstones
          </a>
          <ul className="dropdown-menu">
            <li className="nav-item">
              <Link
                to="/gemstones/other-gemstones"
                className={`dropdown-item text-wrapper-18 text-orange ${isDropdownSelected(
                  "otherGemstonesDropdown"
                )}`}
                style={listItemStyle}
              >
                Option 1
              </Link>
            </li>
            {/* Add more items as needed */}
          </ul>
        </li>

        {/* Add more individual dropdowns as needed */}
      </ul>
    </nav>
  );
};

export default SideNav;
