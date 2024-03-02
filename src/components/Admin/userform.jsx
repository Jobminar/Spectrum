import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaSignOutAlt } from "react-icons/fa";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import "./Inventory.css";

const UploadForm = ({ onUpload }) => {
  const navigate = useNavigate();

  // State to manage form data
  const [formData, setFormData] = useState({
    type: "",
    subtype: "",
    name: "",
    weight: 0,
    shape: "",
    price: 0,
    colour: "",
    value: 0,
    image: null,
  });

  // State to manage selected image file
  const [imageFile, setImageFile] = useState(null);

  // Options for different fields
  const jewelryTypes = [
    "Gems",
    "Beads",
    "Diamonds",
    "Jewelry",
    "Astrology Gems",
    "Pearls",
    "Corals",
    "Zodiac Stones",
  ];

  const [subtypeOptions, setSubtypeOptions] = useState([]);
  const [shapeOptions, setShapeOptions] = useState([]);

  // Effect to update subtype and shape options based on selected type
  useEffect(() => {
    // Set subtype options based on selected type
    if (formData.type && jewelrySubtypes[formData.type]) {
      setSubtypeOptions(jewelrySubtypes[formData.type]);
    } else {
      setSubtypeOptions([]);
    }

    // Set shape options based on selected type
    if (formData.type && jewelryShapes[formData.type]) {
      setShapeOptions(jewelryShapes[formData.type]);
    } else {
      setShapeOptions([]);
    }
  }, [formData.type]);

  // ... (previous code)

  // Function to render form input fields
  const renderInput = (label, name, type = "text") => (
    <div className="mb-3">
      <label htmlFor={name} className="form-label">
        {label}
      </label>
      {type === "dropdown" ? (
        // Render dropdown select for jewelryTypes
        <select
          className="form-select"
          id={name}
          name={name}
          value={formData[name]}
          onChange={handleChange}
          required
        >
          <option value="">{`Select ${label}`}</option>
          {jewelryTypes.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      ) : type === "textarea" || type === "text" ? (
        // Render textarea input for text values
        <div>
          <textarea
            className="form-control"
            id={name}
            name={name}
            value={formData[name]}
            onChange={handleChange}
            required
          ></textarea>
          {type === "textarea" && name === "value" && formData.type && (
            // Display additional information for value textarea
            <div>
              <p className="text-muted mt-2">
                <strong>Units:</strong> {units[formData.type]}
              </p>
              <p className="text-muted">
                <strong>Values:</strong>
                <br />
                {getValuesForType(formData.type)}
              </p>
            </div>
          )}
        </div>
      ) : (
        // Render regular input for other types
        <div>
          <input
            type={type}
            className="form-control"
            id={name}
            name={name}
            value={formData[name]}
            onChange={handleChange}
            required
          />
          {name === "value" && formData.type && (
            // Display additional information for value input
            <div>
              <p className="text-muted mt-2">
                <strong>Units:</strong> {units[formData.type]}
              </p>
              <p className="text-muted">
                <strong>Values:</strong>
                <br />
                {getValuesForType(formData.type)}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );

  // Function to render textarea input fields
  const renderTextarea = (name) => (
    <div className="mb-3">
      <label htmlFor={name} className="form-label">
        {name.charAt(0).toUpperCase() + name.slice(1)}
      </label>
      <div>
        <textarea
          className="form-control"
          id={name}
          name={name}
          value={formData[name]}
          onChange={handleChange}
          required
        ></textarea>
        {name === "value" && formData.type && (
          // Display additional information for value textarea
          <div>
            <p className="text-muted mt-2">
              <strong>Units:</strong> {units[formData.type]}
            </p>
            <p className="text-muted">
              <strong>Values:</strong>
              <br />
              {getValuesForType(formData.type)}
            </p>
          </div>
        )}
      </div>
    </div>
  );

  // Function to render dropdown select fields
  const renderDropdown = (label, name, options) => (
    <div className="mb-3">
      <label htmlFor={name} className="form-label">
        {label}
      </label>
      <select
        className="form-select"
        id={name}
        name={name}
        value={formData[name]}
        onChange={handleChange}
        required
      >
        <option value="">{`Select ${label}`}</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );

  // Function to get values for a specific type
  const getValuesForType = (type) => {
    if (values[type]) {
      return values[type].map((item, index) => (
        <div key={index} className="mb-2">
          {item}
        </div>
      ));
    }
    return (
      <div className="text-muted">
        No specific values available for the selected type.
      </div>
    );
  };

  // Function to handle form input changes
  const handleChange = (e) => {
    const { name, value, type } = e.target;

    if (type === "file") {
      // Handle image file change
      setImageFile(e.target.files[0]);
    } else {
      // Update form data for other input fields
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const apiUrl = "https://sgl-be.onrender.com/inventorypost";

    try {
      // Prepare form data for submission
      const formDataToSend = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        formDataToSend.append(key, key === "image" ? imageFile : value);
      });

      // Send POST request to API
      const response = await fetch(apiUrl, {
        method: "POST",
        body: formDataToSend,
      });

      if (response.ok) {
        // If successful, update state and show success message
        const newItem = { ...formData, image: imageFile, id: Date.now() };
        onUpload(newItem);

        setFormData({
          type: "",
          subtype: "",
          name: "",
          weight: 0,
          shape: "",
          price: 0,
          colour: "",
          value: 0,
          image: null,
        });

        await Swal.fire({
          icon: "success",
          title: "Item added successfully!",
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        // If unsuccessful, log error
        console.error("Failed to add item:", response.statusText);
      }
    } catch (error) {
      // Handle general error and show error message
      console.error("Error:", error);

      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
      });
    }
  };

  // Render the form
  return (
    <div id="uploadForm" className="card p-3 mb-4">
      <form onSubmit={handleSubmit} className="row g-3">
        <h1 className="text-dark mb-4 ps-0">Upload</h1>
        <hr
          style={{
            color: "orange",
            borderTop: "2px solid orange",
            width: "50%",
            margin: "0",
          }}
        />
        <h6>Add items to inventory</h6>

        {/* Render dropdown select for jewelryTypes */}
        {renderDropdown("Type", "type", jewelryTypes)}

        {/* Render subtype dropdown based on selected type */}
        {formData.type && renderDropdown("Subtype", "subtype", subtypeOptions)}

        {/* Render input fields for other attributes */}
        {renderInput("Name", "name")}
        {renderInput("Weight", "weight", "number")}
        {formData.type &&
          renderDropdown("Units", "units", units[formData.type])}
        {formData.type && renderDropdown("Shape", "shape", shapeOptions)}
        {renderInput("Price", "price", "number")}
        {renderInput("Colour", "colour")}
        {formData.type && renderTextarea("Value", "value")}

        {/* Render input field for image */}
        {renderInput("Image", "image", "file")}

        {/* Render submit button */}
        <div className="col-12">
          <button type="submit" className="btn btn-primary mt-3">
            Add Item
          </button>
        </div>
      </form>
    </div>
  );
};

export default UploadForm;
