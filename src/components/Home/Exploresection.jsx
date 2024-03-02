// ExploreSection.js
import React from "react";
import './Exploresection.css'
// images
import Earings from './homeicons/Earings.png'
import Nosepin from './homeicons/Nosepin.png'
import Mangalsutra from './homeicons/Mangalsutra.png'
import Pendants from './homeicons/Pendants.png'
import Bracelet from './homeicons/Bracelet.png'
import Bangle from './homeicons/Bangle.png'
import RingsBands from './homeicons/Rings&Bands.png'
import { useNavigate } from 'react-router-dom'


const ExploreSection = () => {
   const navigate = useNavigate()
  return (
    <>
      <div className="explore-section" style={{marginLeft:"20px"}}>
          <div className="explore-heading-sub-section">
             <h1>Diamonds <br/> Jewelry</h1>
          </div>
          <div className="explore-routing-section">
               <div className="explore-sub-section"style={{textAlign:"center",cursor:"pointer"}} onClick={()=>{navigate("/Diamondsjewelry")}}>
                   <img src={RingsBands} style={{height:"70%",paddingBottom:"10px"}} alt="Rings & Bands"/>
                   <p>Rings and Bands</p>
                </div>
                <div className="explore-sub-section" style={{textAlign:"center",cursor:"pointer"}} onClick={()=>{navigate("/Diamondsjewelry")}}>
                   <img src={Bracelet} style={{height:"70%"}} alt="Bracelet"/>
                   <p>Bracelets</p>
                </div>
                <div className="explore-sub-section" style={{textAlign:"center",cursor:"pointer"}} onClick={()=>{navigate("/Diamondsjewelry")}}>
                   <img src={Bangle} style={{height:"70%"}} alt="Bangle"/>
                   <p>Bangles</p>
                </div>
                <div className="explore-sub-section" style={{textAlign:"center",cursor:"pointer"}} onClick={()=>{navigate("/Diamondsjewelry")}}>
                   <img src={Earings} style={{height:"70%"}} alt="Earings"/>
                   <p>Earings</p>
                </div>
                <div className="explore-sub-section" style={{textAlign:"center",cursor:"pointer"}} onClick={()=>{navigate("/Diamondsjewelry")}}>
                   <img src={Mangalsutra} style={{height:"70%"}} alt="Mangalsutra"/>
                   <p>Neckless</p>
                </div>
                <div className="explore-sub-section" style={{textAlign:"center",cursor:"pointer"}} onClick={()=>{navigate("/Diamondsjewelry")}}>
                   <img src={Nosepin} style={{height:"70%"}} alt="Nosepin"/>
                   <p>Nosepins</p>
                </div>
                <div className="explore-sub-section" style={{textAlign:"center",cursor:"pointer"}} onClick={()=>{navigate("/Diamondsjewelry")}}>
                   <img src={Pendants} style={{height:"70%"}} alt="Pendants"/>
                   <p>Pendants</p>
                </div>
                {/* <div className="explore-sub-section" onClick={()=>{navigate("/Jewelry")}}>
                   <img src={Nosepin} alt="Nosepin"/>
                   <p>Nosepin</p>
                </div> */}
                {/* <div className="explore-sub-section" onClick={()=>{navigate("/Jewelry")}}>
                   <img src={Earings} alt="Earings"/>
                   <p>Earings</p>
                </div> */}
                {/* <div className="explore-sub-section" onClick={()=>{navigate("/jewelery")}}>
                   <img src={Nosepin} alt="Nosepin"/>
                   <p>Nosepin</p>
                </div> */}
                {/* <div className="explore-sub-section" onClick={()=>{navigate("/Jewelry")}}>
                   <img src={Mangalsutra} alt="Mangalsutra"/>
                   <p>Mangalsutra</p>
                </div> */}
                {/* <div className="explore-sub-section" onClick={()=>{navigate("/jewelery")}}>
                   <img src={Pendants} alt="Pendants"/>
                   <p>Pendants</p>
                </div> */}
                {/* <div className="explore-sub-section" onClick={()=>{navigate("/jewelery")}}>
                   <img src={Bracelet} alt="Bracelet"/>
                   <p>Bracelet</p>
                </div> */}
                {/* <div className="explore-sub-section" onClick={()=>{navigate("/jewelery")}}>
                   <img src={Bangle} alt="Bangle"/>
                   <p>Bangle</p>
                </div> */}
                {/* <div className="explore-sub-section" onClick={()=>{navigate("/jewelery")}}>
                   <img src={RingsBands} alt="Rings & Bands"/>
                   <p>RingsBands</p>
                </div> */}

          </div> 
      </div>
    </>
  );
};

export default ExploreSection;