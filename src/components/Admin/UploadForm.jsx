import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import "./Inventory.css";
import PropTypes from "prop-types";

const InventoryForm = ({ onUpload }) => {
  const [formData, setFormData] = useState({
    type: "",
    subtype: "",
    name: "",
    weight: 0,
    shape: "",
    price: 0,
    colour: "",
    value: "",
    transparency:"",
    hardness:"",
    microscopicexamination:"",
    image: null,
  });

  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  // Define jewelry data
  const jewelryTypes = [
    "Gems",
    "Beads",
    "Diamonds",
    "jewellary",
    "Astrology Gems",
    "Pearls",
    "Corals",
    "Zodiac Stones",
  ];

  const jewelrySubtypes = {
    Gems: ["Precious", "Semi-precious"],
    Beads: ["Gemstone", "Glass", "Metal", "Wood", "Plastic", "Ceramic"],
    Diamonds: ["White", "Yellow", "Pink", "Blue", "Green", "Black"],
    Jewelry: [
      "Rings",
      "Necklaces",
      "Bracelets",
      "Earrings",
      "Pendants",
      "Brooches",
      "Anklets",
      "Cufflinks",
      "Body jewelry",
    ],
    "Astrology Gems": [
      "Ruby",
      "Pearl",
      "Coral",
      "Emerald",
      "Yellow Sapphire",
      "Diamond",
      "Blue Sapphire",
      "Hessonite",
      "Cat's Eye",
    ],
    Pearls: ["Natural (Freshwater, Akoya)", "Cultured (South Sea, Tahitian)"],
    Corals: ["Precious (Red Coral)", "Organic (Black Coral, White Coral)"],
    "Zodiac Stones": [
      "Aries: Bloodstone",
      "Taurus: Sapphire",
      "Gemini: Agate",
      "Cancer: Moonstone",
      "Leo: Onyx",
      "Virgo: Carnelian",
      "Libra: Peridot",
      "Scorpio: Topaz",
      "Sagittarius: Turquoise",
      "Capricorn: Garnet",
      "Aquarius: Amethyst",
      "Pisces: Aquamarine",
    ],
  };

  const jewelryShapes = {
    Gems: [
      "Round",
      "Brilliant",
      "Oval",
      "Marquise",
      "Pear",
      "Cabochon",
      "Square",
      "Emerald cut",
      "Asscher",
      "Baguette",
    ],
    Beads: [
      "Round",
      "Cylindrical",
      "Square",
      "Faceted",
      "Bicone",
      "Tricone",
      "Heishi",
      "Barrel",
      "Oval",
      "Donut",
    ],
    Diamonds: [
      "Round",
      "Brilliant",
      "Oval",
      "Marquise",
      "Pear",
      "Cabochon",
      "Square",
      "Emerald cut",
      "Asscher",
      "Baguette",
    ],
    Jewelry: [
      "Styles: Vintage",
      "Modern",
      "Minimalist",
      "Statement",
      "Classic",
      "Trendy",
    ],
    "Astrology Gems": [
      "Often cabochons or beads, based on traditional practices",
    ],
    Pearls: ["Shapes: Round", "Button", "Oval", "Baroque", "Keshi"],
    Corals: ["Shapes: Cabochons", "Beads", "Carvings"],
    "Zodiac Stones": ["Varies based on stone type"],
  };

  const units = {
    Gems: ["Carat (metric; 1 carat = 0.2 grams)"],
    Beads: ["Sold by strand", "Weight (grams)", "Individual bead"],
    Diamonds: ["Carat (metric)"],
    Jewelry: ["Individual piece or set"],
    "Astrology Gems": ["Carats or grams"],
    Pearls: ["Grain (0.775 carats)", "Strand", "Individual pearl"],
    Corals: ["Grams or individual piece"],
    "Zodiac Stones": ["Varies based on stone type"],
  };

  const values = {
    Gems: [
      "Varies widely based on size, clarity, color, cut, and gemstone type. Prices can range from a few dollars per carat for lower-quality gemstones to millions for flawless diamonds.",
    ],
    Beads: [
      "Varies greatly based on material, size, and design. Can range from a few cents per bead to hundreds of dollars for rare or custom-made beads.",
    ],
    Diamonds: [
      "Extremely high, especially for larger, colorless diamonds of good clarity. Prices can soar into the millions for exceptional stones.",
    ],
    Jewelry: [
      "Enormous range based on materials, design, brand, and historical significance. Some pieces can be priceless antiques, while others are affordable everyday wear.",
    ],
    "Astrology Gems": [
      "Can vary based on quality and astrological significance, but generally not as high as purely ornamental gems.",
    ],
    Pearls: [
      "Can be high for large, round, white pearls, but vary based on size, luster, color, and origin.",
    ],
    Corals: [
      "Red coral is most valuable, with prices varying based on size and color. Organic corals are generally less expensive.",
    ],
    "Zodiac Stones": [
      "The value of Zodiac Stones varies based on the type of stone and its astrological significance.",
      "Bloodstone (Aries): Known for promoting courage and vitality.",
      "Sapphire (Taurus): Symbolizing wisdom and royalty.",
      "Agate (Gemini): Believed to enhance mental clarity and balance.",
      "Moonstone (Cancer): Associated with intuition and emotional healing.",
      "Onyx (Leo): A protective stone believed to bring strength and stamina.",
      "Carnelian (Virgo): Linked to creativity and boosting energy.",
      "Peridot (Libra): Representing good fortune and positive energy.",
      "Topaz (Scorpio): Thought to bring strength and protection.",
      "Turquoise (Sagittarius): Symbolizing wisdom and spiritual growth.",
      "Garnet (Capricorn): Associated with protection and strength.",
      "Amethyst (Aquarius): Believed to enhance intuition and spiritual awareness.",
      "Aquamarine (Pisces): Representing tranquility and emotional balance.",
    ],
  };

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

  // Additional information component
  const AdditionalInfo = () => {
    if (formData.type !== "text") {
      return (
        <div>
          <p className="text-muted mt-2">
            <strong>Units:</strong> {units[formData.type]}
          </p>
          <div className="text-muted">
            <strong>Values:</strong>
            <br />
            {values[formData.type] &&
              values[formData.type].map((item, index) => (
                <p key={index} className="mb-2">
                  {item}
                </p>
              ))}
          </div>
        </div>
      );
    }
    return null;
  };

  // Function to render input fields

  const renderInputField = (label, name, type = "text", placeholder = "") => {
    const inputProps = {
      id: name,
      name: name,
      value: formData[name],
      onChange: handleInputChange,
      required: true,
      placeholder: placeholder,
    };

    return (
      <div className="mb-3">
        <label htmlFor={name} className="form-label">
          {label}
        </label>
        {type === "dropdown" ? (
          <select className="form-select" {...inputProps}>
            <option value="">{`Select ${label}`}</option>
            {jewelryTypes.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        ) : type === "textarea" || type === "text" ? (
          <div>
            <textarea
              className={type === "textarea" ? "form-control" : "form-control"}
              {...inputProps}
            ></textarea>
          </div>
        ) : (
          <input type="text" className="form-control" {...inputProps} />
        )}
      </div>
    );
  };

  // Function to render textarea input fields
  const renderTextareaField = (label, name, placeholder) => {
    return (
      <div className="mb-3">
        <label htmlFor={name} className="form-label">
          {label}
        </label>
        <textarea
          className="form-control"
          id={name}
          name={name}
          value={formData[name]}
          onChange={(e) => setFormData({ ...formData, [name]: e.target.value })}
          placeholder={placeholder}
        />
      </div>
    );
  };

  // Function to render dropdown select fields

  // Handle form input change for dropdowns
  const handleDropdownChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  // Function to render dropdown select fields
  const renderDropdownField = (label, name, options) => (
    <div className="mb-3">
      <label htmlFor={name} className="form-label">
        {label}
      </label>
      <select
        className="form-select"
        id={name}
        name={name}
        value={formData[name]}
        onChange={(e) => handleDropdownChange(name, e.target.value)}
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

  // Handle form input change
  const handleInputChange = (e) => {
    const { name, value, type } = e.target;

    if (type === "file") {
      const file = e.target.files[0];
      setImageFile(file);

      // Display image preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      // Check if the name is subtype or shape and update the corresponding state
      if (name === "subtype" || name === "shape") {
        setFormData({ ...formData, [name]: value });
      } else {
        setFormData({ ...formData, [name]: value });
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Define the base API URL
    const baseApiUrl = "https://sgl-be.onrender.com/post";

    try {
      // Remove spaces from formData.type
      const typeWithoutSpaces = formData.type.replace(/\s/g, "");

      // Construct the complete API endpoint based on the selected type
      const apiUrl = `${baseApiUrl}${typeWithoutSpaces.toLowerCase()}`;

      const formDataToSend = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        formDataToSend.append(key, key === "image" ? imageFile : value);
      });

      console.log("FormData to Send:", formDataToSend);

      // Log the formData before making the API call
      console.log("FormData before API call:", formData);

      const response = await fetch(apiUrl, {
        method: "POST",
        body: formDataToSend,
      });

      // Always call onUpload, regardless of the API response
      const newItem = { ...formData, image: imageFile, id: Date.now() };
      onUpload(newItem);

      if (response.ok) {
        setFormData({
          type: "",
          subtype: "",
          name: "",
          weight: 0,
          shape: "",
          price: 0,
          colour: "",
          value: "",
          image: null,
        });

        await Swal.fire({
          icon: "success",
          title: "Item added successfully!",
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        console.error("Failed to add item:", response.statusText);
        throw new Error("Item addition failed");
      }
    } catch (error) {
      console.error("Error:", error);

      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
      });
    }
  };

  return (
    <div id="uploadForm" className="card p-3 mb-4">
      <form onSubmit={handleSubmit} className="row g-3">
        <h1 className="text-dark mb-4 ps-0">Inventory</h1>
        <hr
          style={{
            color: "orange",
            borderTop: "2px solid orange",
            width: "50%",
            marginRight: "auto",
          }}
        />
        <h6>Add items to inventory</h6>

        {renderInputField("Type", "type", "dropdown")}
        {console.log("Subtype Options:", subtypeOptions)}
        {formData.type &&
          renderDropdownField("Subtype", "subtype", subtypeOptions)}

        {renderInputField("Name", "name")}
        {renderInputField(
          "Weight",
          "weight",
          "number",
          "Rs (Rupees) / Weight (grams)"
        )}
        {formData.type &&
          renderDropdownField("Units", "units", units[formData.type])}
        {formData.type && renderDropdownField("Shape", "shape", shapeOptions)}

        {renderInputField("Price", "price", "number", "Rs (Rupees)")}
        {renderInputField("Colour", "colour")}
        {formData.type && renderTextareaField("Value", "value", "Enter Value")}
        <AdditionalInfo />
        <div className="mb-3">
          <label htmlFor="image" className="form-label">
            Image
          </label>
          <div className="input-group">
            <label className="input-group-text" htmlFor="fileInput">
              Choose File
            </label>
            <input
              type="file"
              className="form-control"
              id="fileInput"
              style={{ display: "none" }}
              onChange={handleInputChange}
            />
          </div>
          {/* Image preview */}
          {imagePreview && (
            <img
              src={imagePreview}
              alt="Image Preview"
              className="img-preview mt-2"
            />
          )}
        </div>

        <div className="col-12">
          <button
            type="submit"
            className="btn btn-primary mt-3"
            style={{
              padding: "5px 10px",
              fontSize: "14px",
              height: "40px",
              backgroundColor: "#FFA500", // Orange color
              borderColor: "#FFA500", // Orange color
              color: "#fff", // White text color
              transition: "background-color 0.3s",
              "@media (min-width: 576px)": {
                padding: "8px 8px",
                fontSize: "16px",
              },
              ":hover": {
                backgroundColor: "#28a745", // Green color on hover
                borderColor: "#28a745", // Green color on hover
              },
            }}
          >
            Add Item
          </button>
        </div>
      </form>
    </div>
  );
};
InventoryForm.propTypes = {
  onUpload: PropTypes.func.isRequired,
};
export default InventoryForm;
