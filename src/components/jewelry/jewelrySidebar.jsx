import { useState } from "react";
import "./jewelrysidebar.css";

const JewelrySidebar = () => {
  const [activeSection, setActiveSection] = useState(null);

  const toggleVisibility = (section) => {
    setActiveSection(activeSection === section ? null : section);
  };

  return (
    <div>
      <div className="sidenav-beads">
        {/* Categories */}
        <div
          className="select-main"
          onClick={() => toggleVisibility("categories")}
        >
          Categories
          <span>
            <i className="fa-solid fa-caret-down"></i>
          </span>
        </div>
        <div
          className="optionsmain"
          style={{ display: activeSection === "categories" ? "block" : "none" }}
        >
          <div>
            <input
              type="checkbox"
              id="checkbox1"
              name="name"
              value="Vintage Look"
            />
            <label htmlFor="checkbox1">Vintage Look</label>
          </div>
          <div>
            <input
              type="checkbox"
              id="checkbox2"
              name="name"
              value="Metallic Look"
            />
            <label htmlFor="checkbox2">Metallic Look</label>
          </div>
          <div>
            <input
              type="checkbox"
              id="checkbox3"
              name="name"
              value="Ntense Look"
            />
            <label htmlFor="checkbox3">Ntense Look</label>
          </div>
        </div>

        {/* Shapes */}
        <div className="select-main" onClick={() => toggleVisibility("shapes")}>
          Shapes
          <span>
            <i className="fa-solid fa-caret-down"></i>
          </span>
        </div>
        <div
          className="optionsmain"
          style={{ display: activeSection === "shapes" ? "block" : "none" }}
        >
          <div>
            <input type="checkbox" id="Cylinder" name="name" value="Cylinder" />
            <label htmlFor="Cylinder">Cylinder</label>
          </div>
          <div>
            <input type="checkbox" id="Disc" name="name" value="Disc" />
            <label htmlFor="Disc">Disc</label>
          </div>
          <div>
            <input type="checkbox" id="Droplet" name="name" value="Droplet" />
            <label htmlFor="Droplet">Droplet</label>
          </div>
          <div>
            <input type="checkbox" id="Cube" name="name" value="Cube" />
            <label htmlFor="Cube">Cube</label>
          </div>
          <div>
            <input type="checkbox" id="Oval" name="name" value="Oval" />
            <label htmlFor="Oval">Oval</label>
          </div>
          <div>
            <input type="checkbox" id="Round" name="name" value="Round" />
            <label htmlFor="Round">Round</label>
          </div>
        </div>

        {/* Colors */}
        <div className="select-main" onClick={() => toggleVisibility("colors")}>
          Colors
          <span>
            <i className="fa-solid fa-caret-down"></i>
          </span>
        </div>
        <div
          className="optionsmain"
          style={{ display: activeSection === "colors" ? "block" : "none" }}
        >
          <div>
            <input type="checkbox" id="Beige" name="name" value="Beige" />
            <label htmlFor="Beige">Beige</label>
          </div>
          <div>
            <input type="checkbox" id="Blue" name="name" value="Blue" />
            <label htmlFor="Blue">Blue</label>
          </div>
          <div>
            <input type="checkbox" id="Brown" name="name" value="Brown" />
            <label htmlFor="Brown">Brown</label>
          </div>
          <div>
            <input type="checkbox" id="Yellow" name="name" value="Yellow" />
            <label htmlFor="Yellow">Yellow</label>
          </div>
          <div>
            <input type="checkbox" id="Gold" name="name" value="Gold" />
            <label htmlFor="Gold">Gold</label>
          </div>
          <div>
            <input type="checkbox" id="Green" name="name" value="Green" />
            <label htmlFor="Green">Green</label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JewelrySidebar;
