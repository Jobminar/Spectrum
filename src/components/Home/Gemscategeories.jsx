// GemstoneCategories.js
import { useNavigate } from "react-router-dom";
import React from "react";
import './Gemscategeories.css'
// images
import  Gemstones from './homeicons/Gem Stones.png'
import Gemrings from './homeicons/Gem Rings.png'
import Gempendats from './homeicons/Gem Pendats.png';
import Gemtesting from "./homeicons/Gem Testing.png";
import Gemcutting from './homeicons/Gem Cutting.png'


const GemstoneCategories = () => {
    const navigate = useNavigate()
  return (
    <div className="GEMS-CATEGORY" style={{marginLeft:"20px"}}>
        <div className="gems-cate-section">
           <div className="gems-headding-sub-section">
                <h1>GEMS 
                    CATEGORY</h1>
           </div>
           <div className="gems-routing-section" style={{textAlign:"center"}}>
              <div className="gems-cate-sub-section" onClick={()=>{navigate("/gems")}}>
                  <img src={Gemstones} alt="Gemstones"/>
                  <p>Gems Stones</p>
              </div>
              <div className="gems-cate-sub-section" onClick={()=>{navigate("/gems")}}>
                  <img src={Gemrings} alt="Gemrings"/>
                  <p>Gems Stones Rings</p>
              </div>
              <div className="gems-cate-sub-section" onClick={()=>{navigate("/gems")}}>
                  <img src={Gempendats} alt="Gempendats"/>
                  <p>Gems Pendats</p>
              </div>
              {/* <div className="gems-cate-sub-section" onClick={()=>{navigate("/gems")}}>
                  <img src={Gemtesting} alt="Gemtesting"/>
                  <p>Gem Testing </p>
              </div> */}
              {/* <div className="gems-cate-sub-section" onClick={()=>{navigate("/gems")}}>
                  <img src={Gemcutting} alt="Gemcutting"/>
                  <p>Gem Cutting</p>
              </div> */}
           </div>
          


        </div>
        
    </div>
  );
};

export default GemstoneCategories;
