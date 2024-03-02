import './footer.css'
import facebook from './footer-images/facebook.png'
import instagram from './footer-images/instagram.png'
import youtube from './footer-images/youtube.png'
import logo from './footer-images/footer-logo.png'
import { useState } from 'react'

const Footer = (()=>{
    const [showCompanyContent, setShowCompanyContent] = useState(true);

    const toggleCompanyContent = () => {
        setShowCompanyContent(!showCompanyContent);
    };


    return(
        <>
            <div className='footer-section'>
                  <div className='footer-logo'>
                    <img src={logo} alt='logo'/>
                  </div>
                  <div className='footer-content'>
                     <div className='company' onClick={toggleCompanyContent}>
                        
                            <h1>Company</h1>
                            <p>About Us</p>
                            <p>Terms & Conditions</p>
                            <p>Refund Policy</p>
                            <p>Careers</p>
                            <div className='social-media'>
                                <a><img src={facebook} alt='facebook'/></a>
                                <a><img src={instagram} alt='instagram'/></a>
                                <a><img src={youtube} alt='youtube'/></a>
                            </div>
                    
                        
                     </div>
                     <div className='Information'>
                           <h1>Information</h1>
                           <p>FAQs</p>
                           <p>Shipping Policy</p>
                           <p>Return & Exchange Policy</p>
                           <p>Privacy Policy</p>
                     </div>
                     <div className='contactus'>
                          <h1>Contact Us</h1>
                          <p>+91 9982805500</p>
                          <p>sales@navratan.com</p>
                          
                     </div>
                     <div className='workingsales'>
                          <h1>Working Hours Sales </h1>
                          <p> Mon-Sun 10.00am - 11:30pm</p>
                          <p>ISTSupport: Mon-Sat 10.00am - 6:30pm IST</p>
                     </div>
                </div>
            </div>
        </>
    )
})
export default Footer