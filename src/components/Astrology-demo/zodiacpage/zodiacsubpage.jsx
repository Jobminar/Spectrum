import { useState, useEffect } from 'react';
import './zodiacsubpage.css';
import { useLocation } from 'react-router-dom';
import aries from '../astrologydata/Ariesstones'
import cancer from '../astrologydata/Cancerstones'
import capricon from '../astrologydata/Capricornstones'
import gemini from '../astrologydata/Geministones'
import Aquarius from '../astrologydata/Aquariusstones'
import capricorn from '../astrologydata/Capricornstones'
import leo from '../astrologydata/Leostones'
import libra from '../astrologydata/Librastones'
import pisces from '../astrologydata/Piecesstones'
import scorpio from '../astrologydata/Scorpiostones'
import Taurus from '../astrologydata/Taurusstones'
import virgo from '../astrologydata/Taurusstones'

const Zodiacsubpage = () => {
  const location = useLocation();
  const zodiacname = location.state && location.state.itemName;
  const [zodiac, setzodiac] = useState([]);

  useEffect(() => {
    function zodiacfilter(zodiacname) {
         if(zodiacname === 'Aries'){
            setzodiac(aries)
         }
         else if(zodiacname === 'Cancer'){
            setzodiac(cancer)
         }
         else if(zodiacname === 'Aquarius'){
            setzodiac(Aquarius)
         }
         else if(zodiacname === 'Capricorn'){
            setzodiac(capricorn)
         }
         else if(zodiacname === 'Gemini'){
            setzodiac(gemini)
         }
         else if(zodiacname === 'Leo'){
            setzodiac(leo)
         }
         else if(zodiacname === 'Libra'){
            setzodiac(libra)
         }
         else if(zodiacname === 'Pisces'){
            setzodiac(pisces)
         }
         else if(zodiacname === 'Scorpio'){
            setzodiac(scorpio)
         }
         else if(zodiacname === 'Taurus'){
            setzodiac(Taurus)
         }
         else if(zodiacname === 'Virgo'){
            setzodiac(virgo)
         }
         else{
            setzodiac(capricon)
         }
    }
    zodiacfilter(zodiacname);
  }, [zodiacname]);

  return (
    
    
    <>
      <h2>{zodiacname}</h2>
      
        <div className='beadsmain-con'>
          
          {/* Render other content using sampleData */}
          {zodiac.map((item, index) => (
            <div key={index}>
              <div className='box'>
                <img src={item.imageUrl} alt={item.name} className='beads-image' />
                <p className='beadsname'>{item.zodiac}</p>
                <p>{item.description}</p>
                <p>{item.price}</p>
              </div>
            </div>
          ))}
        </div>
    
    
    </>
  );
};

export default Zodiacsubpage;
