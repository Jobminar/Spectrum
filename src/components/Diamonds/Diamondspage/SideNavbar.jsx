import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS

export const SideNavbar = ({ onShapeChange }) => {
  const [selectedShape, setSelectedShape] = useState("Round");
  const handleShapeChange = (selectedShape) => {
    setSelectedShape(selectedShape);
    onShapeChange(selectedShape); // Callback to parent component
  };
  return (
    <div className="side-navbar m-0 w-md-25 w-sm-100 mt-0 p-1">
      <div className="profile-picture" />
      <div className="navbar">
        <div className="nav-item">
          <div className="nav-heading text-dark text-wrapper mt-0 p-4">
            Filters
          </div>
          <div className="nav-item dropdown p-0">
            <a
              className="text-wrapper dropdown-toggle"
              href="#"
              role="button"
              data-bs-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
              style={{ textDecoration: "none", color: "black" }}
            >
              Shape
            </a>

            <div className="dropdown-menu">
              <a
                className="dropdown-item"
                href="#"
                onClick={() => handleShapeChange("Round")}
              >
                Round
              </a>
              <a
                className="dropdown-item"
                href="#"
                onClick={() => handleShapeChange("Radiant")}
              >
                Radiant
              </a>
              <a
                className="dropdown-item"
                href="#"
                onClick={() => handleShapeChange("Princess")}
              >
                Princess
              </a>
              <a
                className="dropdown-item"
                href="#"
                onClick={() => handleShapeChange("Pear")}
              >
                Pear
              </a>
              <a
                className="dropdown-item"
                href="#"
                onClick={() => handleShapeChange("Oval")}
              >
                Oval
              </a>
              <a
                className="dropdown-item"
                href="#"
                onClick={() => handleShapeChange("Marquise")}
              >
                Marquise
              </a>
              <a
                className="dropdown-item"
                href="#"
                onClick={() => handleShapeChange("Heart")}
              >
                Heart
              </a>
              <a
                className="dropdown-item"
                href="#"
                onClick={() => handleShapeChange("Emerald")}
              >
                Emerald
              </a>
              <a
                className="dropdown-item"
                href="#"
                onClick={() => handleShapeChange("Cushion")}
              >
                Cushion
              </a>
              <a
                className="dropdown-item"
                href="#"
                onClick={() => handleShapeChange("Asscher")}
              >
                Asscher
              </a>
            </div>
          </div>
        </div>
        <div className="nav-item dropdown">
          <a
            className="text-wrapper dropdown-toggle"
            href="#"
            role="button"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
            style={{ textDecoration: "none", color: "black" }}
          >
            Roughness
          </a>
          <div className="dropdown-menu">
            <a className="dropdown-item" href="#">
              Option 1
            </a>
            <a className="dropdown-item" href="#">
              Option 2
            </a>
          </div>
        </div>
        <div className="nav-item dropdown">
          <a
            className="text-wrapper dropdown-toggle"
            href="#"
            role="button"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
            style={{ textDecoration: "none", color: "black" }}
          >
            Types
          </a>
          <div className="dropdown-menu">
            <a className="dropdown-item" href="#">
              Type 1
            </a>
            <a className="dropdown-item" href="#">
              Type 2
            </a>
          </div>
        </div>
        <div className="nav-item">
          <div className="text-wrapper">Price</div>
        </div>
        <div className="nav-item">
          <div className="text-wrapper">Colour</div>
        </div>
        <div className="nav-item">
          <div className="text-wrapper">Clarity</div>
        </div>
        <div className="nav-item">
          <div className="text-wrapper">Carat</div>
        </div>
        <div className="nav-item">
          <div className="text-wrapper">Cut</div>
        </div>
        <div className="nav-item dropdown">
          <a
            className="text-wrapper dropdown-toggle"
            href="#"
            role="button"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
            style={{ textDecoration: "none", color: "black" }}
          >
            Fluorescence
          </a>
          <div className="dropdown-menu">
            <a className="dropdown-item" href="#">
              Fluorescence 1
            </a>
            <a className="dropdown-item" href="#">
              Fluorescence 2
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
