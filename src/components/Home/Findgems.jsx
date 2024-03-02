/* eslint-disable react/no-unknown-property */

import './Findgems.css'
import 'bootstrap/dist/css/bootstrap.min.css';
// import Astrologydisplay from "../Astrology-demo/astrologodisplay";
// import Proptext from "./prop";


// images
// import YELLOWSAPPHIR from './homediamonds/YELLOW SAPPHIRE.png'
// import RUBY from './homediamonds/RUBY.png'
// import BLUESAPPHIRE from './homediamonds/BLUE SAPPHIRE.png'
// import EMERALD from './homediamonds/EMERALD.png'



const Finddiamonds=(()=>{
    
   return(
    <>
       
         <div className="findyourpreference-section">
             <h1 className="fyp-heading">Find your perfect Gemstones</h1>
            <div className="diamonds-filter">
            <select className="zodiac-filter" >
                <option value=""  >Search by Zodiac</option>
                <option value="Aquarius">Aquarius</option>
                <option value="Pieces" >Pieces</option>
                <option value="Aries" >Aries</option>
                <option value="Taurus" >Taurus</option>
                <option value="Gemini" >Gemini</option>
                <option value="Cancer" >Cancer</option>
                <option value="Leo" >Leo</option>
                <option value="Virgo" >Virgo</option>
                <option value="Libra" >Libra</option>
                <option value="Scorpio" >Scorpio</option>
                <option value="SagittCarius" >Sagittarius</option>
                <option value="apricon">apricon</option>
                
            </select>
            <select className="name-filter" >
                <option value=""  >Search by Name</option>
                <option value="option1">Blue Sapphire</option>
                <option value="option2">Cats Eye</option>
                <option value="option3">Coral</option>
                <option value="option1">Emerald </option>
                <option value="option2">Garnet</option>
                <option value="option3">Opal</option>
                <option value="option1">Pearl</option>
                <option value="option2">Pitambari</option>
                <option value="option3">Ruby</option>
                <option value="option1">Yellow Sapphire</option>
                <option value="option2">White Sapphire</option>
                <option value="option3">Amethyst</option>
                <option value="option1">Aquamarine</option>
                <option value="option2">Blood Stonemba</option>
                <option value="option3">Blue Stone</option>
                <option value="option1">Blue Topaz</option>
                <option value="option2">Citrine</option>
                <option value="option3">Fluorite</option>
                <option value="option1">lolite</option>
                <option value="option2">Kynite</option>
                <option value="option3">Lapis Lazuli</option>
                <option value="option1">Magnet Stone</option>
                <option value="option2">Malachite</option>
                <option value="option1">Moon stone</option>
                <option value="option2">Onyx</option>
                <option value="option1">Peridot</option>
                <option value="option2">Rock Crystal</option>
                <option value="option1">Rose Quartz</option>
                <option value="option2">Smokey Quartz</option>
                <option value="option1">Tanzanite</option>
                <option value="option2">Tiger Eye</option>
                <option value="option1">Tourmaline</option>
                <option value="option2">Turquoise</option>
            </select>
            </div>
           
          </div>
    </>
   )     
})
export default Finddiamonds