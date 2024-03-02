import './shopbyme.css'
import { useNavigate } from 'react-router-dom'
// images
import Round from './homediamonds/Round.png'
import Pear from './homediamonds/Frame 65.png'
import Princess from './homediamonds/Frame 66.png'
import Marquise from './homediamonds/Frame 67.png'
import Oval from './homediamonds/Frame 68.png'
import Radiant from './homediamonds/Frame 69.png'
import Emerald from './homediamonds/Frame 70.png'
import Heart from './homediamonds/Frame 71.png'
import Cushion from './homediamonds/Frame 73.png'
import Asscher from './homediamonds/Frame 74.png'

const Shopbyme = (()=>{
   const navigate = useNavigate()
    return(
        <>
                 <h1 className='diamonds-heading'>Loose Diamonds</h1>
            <div className="shopbyme-section">
               
                <div className="sbm-heading-section">
                      <h1>Loose Diamonds</h1>
                </div>
                <div className="product-nav-section"  >
                      <div className="sbm-sub-section" style={{textAlign:"center",cursor:"pointer"}} onClick={()=>{navigate("/Loosediamonds")}} > 
                         <img src={Round} style={{height:"50%"}} alt="Round"/>
                         <p>Round</p>
                      </div>
                      <div className="sbm-sub-section" style={{textAlign:"center",cursor:"pointer"}} onClick={()=>{navigate("/Loosediamonds")}}> 
                         <img src={Pear} style={{height:"50%"}} alt="Pear"/>
                         <p>Pear</p>
                      </div>
                      <div className="sbm-sub-section" style={{textAlign:"center",cursor:"pointer"}} onClick={()=>{navigate("/Loosediamonds")}}> 
                         <img src={Princess} style={{height:"50%"}} alt="Princess"/>
                         <p>Princess</p>
                      </div>
                      <div className="sbm-sub-section" style={{textAlign:"center",cursor:"pointer"}} onClick={()=>{navigate("/Loosediamonds")}}> 
                         <img src={Marquise} style={{height:"50%"}} alt="Oval"/>
                         <p>Marquise</p>
                      </div>
                      <div className="sbm-sub-section" style={{textAlign:"center",cursor:"pointer"}} onClick={()=>{navigate("/Loosediamonds")}}> 
                         <img src={Oval} style={{height:"50%"}} alt=""/>
                         <p>Oval</p>
                      </div>
                      {/* <div className="sbm-sub-section" style={{textAlign:"center"}} onClick={()=>{navigate("/Gemsjewelry")}}> 
                         <img src={Radiant} style={{height:"50%"}} alt="Radiant"/>
                         <p>Radiant</p>
                      </div>
                      <div className="sbm-sub-section" style={{textAlign:"center"}} onClick={()=>{navigate("/Gemsjewelry")}}> 
                         <img src={Emerald} style={{height:"50%"}} alt="Emerald"/>
                         <p>Emerald</p>
                      </div>
                      <div className="sbm-sub-section" style={{textAlign:"center"}} onClick={()=>{navigate("/Gemsjewelry")}}> 
                         <img src={Heart} style={{height:"50%"}} alt="Heart"/>
                         <p>Heart</p>
                      </div>
                      <div className="sbm-sub-section" style={{textAlign:"center"}} onClick={()=>{navigate("/Gemsjewelry")}}> 
                         <img src={Cushion} style={{height:"50%"}} alt="Cushion"/>
                         <p>Cushion</p>
                      </div>
                      <div className="sbm-sub-section" style={{textAlign:"center"}} onClick={()=>{navigate("/Gemsjewelry")}}> 
                         <img src={Asscher} style={{height:"50%"}} alt="Asscher"/>
                         <p>Asscher</p>
                      </div> */}
                </div>
            </div>
        </>
    )
})
export default Shopbyme