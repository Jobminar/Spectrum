// Beadssidebar.js
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import jewelryData from "./jewelryData";
import "./beadssidebar.css";

const SidebarSection = ({
  title,
  options,
  activeSection,
  onToggleVisibility,
  onSelectOption,
  selectedType,
  selectedSubtype,
  selectedShape,
  selectedPrice,
}) => (
  <div className="sidebar-section">
    <div className="select-main" onClick={() => onToggleVisibility(title)}>
      {title}
      <span>
        <i className="fa-solid fa-caret-down"></i>
      </span>
    </div>
    <div
      className="options-main"
      style={{ display: activeSection === title ? "block" : "none" }}
    >
      {options.map((option) => (
        <div
          key={option}
          onClick={() => {
            console.log(`Selected ${title}: ${option}`);
            onSelectOption(title, option);
          }}
        >
          <input
            type="checkbox"
            id={`${title}-${option}`}
            checked={
              (title === "Type" && selectedType === option) ||
              (title === "Subtypes" && selectedSubtype === option) ||
              (title === "Shapes" && selectedShape === option) ||
              (title === "Prices" && selectedPrice === option)
            }
            readOnly
          />
          <label
            htmlFor={`${title}-${option}`}
            className={`option-label ${
              (title === "Type" && selectedType === option) ||
              (title === "Shapes" && selectedShape === option)
                ? "selected-option"
                : ""
            }`}
          >
            {option}
          </label>
        </div>
      ))}
    </div>
  </div>
);

SidebarSection.propTypes = {
  title: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
  activeSection: PropTypes.string, // Make it optional
  onToggleVisibility: PropTypes.func.isRequired,
  onSelectOption: PropTypes.func.isRequired,
  selectedType: PropTypes.string,
  selectedSubtype: PropTypes.string,
  selectedShape: PropTypes.string,
  selectedPrice: PropTypes.string,
};

const Beadssidebar = () => {
  const [activeSection, setActiveSection] = useState("Type");
  const [selectedType, setSelectedType] = useState(() => {
    // Set the default value based on the value stored in local storage
    const storedProductType = localStorage.getItem("selectedProductType");
    return storedProductType || "Beads";
  });
  const [selectedSubtype, setSelectedSubtype] = useState(null);
  const [selectedShape, setSelectedShape] = useState(null);
  const [selectedPrice, setSelectedPrice] = useState(null);

  useEffect(() => {
    // Load the selected product type from local storage on component mount
    const storedProductType = localStorage.getItem("selectedProductType");
    if (storedProductType) {
      setSelectedType(storedProductType);
    }
  }, []);

  useEffect(() => {
    // Update local storage when the selectedType changes
    localStorage.setItem("selectedProductType", selectedType);

    // Update subtypes when selectedType changes
    setSelectedSubtype(null); // Reset selected subtype
  }, [selectedType]);

  // Define toggleVisibility function
  const toggleVisibility = (section) => {
    setActiveSection(activeSection === section ? null : section);
  };

  const onSelectOption = (section, option) => {
    console.log(`Selected ${section}: ${option}`);
    if (section === "Type") {
      setSelectedType(option);
      setSelectedSubtype(null);
      setSelectedShape(null);
      setSelectedPrice(null);
      // Set the active section to "Subtypes" when a type is selected
      setActiveSection("Subtypes");
    } else if (section === "Subtypes") {
      setSelectedSubtype(option);
      setSelectedShape(null);
      setSelectedPrice(null);
    } else if (section === "Shapes") {
      setSelectedShape((prevShape) => (prevShape === option ? null : option));
      setSelectedPrice(null);
    } else if (section === "Prices") {
      setSelectedPrice((prevPrice) => (prevPrice === option ? null : option));
    }
  };

  const getOptions = () => {
    console.log("Active Section:", activeSection);
    console.log("Selected Type:", selectedType);
    switch (activeSection) {
      case "Type": {
        return [selectedType]; // Return only the selected type
      }
      case "Subtypes": {
        const subtypes = jewelryData.subtypes[selectedType];
        return subtypes ? subtypes : []; // Return subtypes if available, otherwise an empty array
      }
      case "Shapes": {
        return jewelryData.shapes[selectedType] || []; // Return shapes if available, otherwise an empty array
      }
      case "Prices": {
        return jewelryData.prices; // Return prices array
      }
      default: {
        return [];
      }
    }
  };

  const sections = [
    { title: "Type", options: jewelryData.types },
    { title: "Subtypes", options: jewelryData.subtypes[selectedType] || [] },
    { title: "Shapes", options: getOptions() },
    { title: "Prices", options: jewelryData.prices },
  ];

  return (
    <div className="beadssidebar-container">
      <div className="sidenav-beads">
        {sections.map((section) => (
          <SidebarSection
            key={section.title}
            {...section}
            activeSection={activeSection} // Pass activeSection prop here
            onToggleVisibility={toggleVisibility}
            onSelectOption={onSelectOption}
            selectedShape={selectedShape}
            selectedType={selectedType}
            selectedSubtype={selectedSubtype}
            selectedPrice={selectedPrice}
          />
        ))}
      </div>
    </div>
  );
};

export default Beadssidebar;
