import { useState, useEffect } from "react";
import "./jewelrysub.css";
import { useLocation } from "react-router-dom";
import JewelrySidebar from "./jewelrySidebar"; // Assuming the file name is JewelrySidebar.js
import goldJewelry from "./Data/gold";
import silverJewelry from "./Data/silver";
import panchadhatuJewelry from "./Data/panchadhathu";
import coralJewelry from "./Data/coral";
import beadsJewelry from "./Data/beads";

const JewelrySub = () => {
  const location = useLocation();
  const itemName = location.state && location.state.itemName;
  const [datafinal, setDataFinal] = useState([]);

  useEffect(() => {
    function filterData(itemName) {
      switch (itemName) {
        case "Gold Jewelry":
          setDataFinal(goldJewelry);
          break;
        case "Silver Jewelry":
          setDataFinal(silverJewelry);
          break;
        case "Panchadhatu Jewelry":
          setDataFinal(panchadhatuJewelry);
          break;
        case "Coral Jewelry":
          setDataFinal(coralJewelry);
          break;
        case "Beads Jewelry":
          setDataFinal(beadsJewelry);
          break;
        default:
          setDataFinal([]); // default to an empty array
      }
    }
    filterData(itemName);
  }, [itemName]);

  return (
    <>
      <h2>{itemName}</h2>
      <div className="Jewelry-subage-maincon">
        <div>
          <JewelrySidebar />
        </div>
        <div className="Jewelrymain-con">
          {/* Render other content using datafinal */}
          {datafinal.map((item, index) => (
            <div key={index}>
              <div className="box">
                <img
                  src={item.image}
                  alt={item.name}
                  className="Jewelry-image"
                />
                <p className="Jewelryname">{item.name}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default JewelrySub;
