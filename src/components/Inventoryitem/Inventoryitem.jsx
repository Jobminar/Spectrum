import React, { useEffect } from 'react'
import "./Inventoryitem.css"
import { useNavigate } from 'react-router-dom';
import { FaComments, FaShoppingCart, FaList, FaBox } from "react-icons/fa";
import HomeIcon from '@mui/icons-material/Home';


const Adminhome = () => {
    const navigate =useNavigate()
    useEffect(() => {
        // Check if the user is already logged in
        const adminUsername = sessionStorage.getItem("admin-username");
        if (!adminUsername) {
          navigate("/adminlogin");
        }
      }, []);
  return (
    <div>
        {/* <HomeIcon onClick={()=>navigate("/admin/adminhome")} style={{height:"40px",cursor:"pointer",width:"40px",margin:"5% 0% 0% 5%"}}/> */}
        <div >
                <HomeIcon onClick={()=>navigate("/admin/adminhome")} style={{height:"40px",width:"40px",cursor:"pointer",margin:"5% 0% 0% 5%"}}/>
                
                {/* <h1 style={{textAlign:"center"}}>Admin Dashboard</h1> */}
                </div>
                <h1 style={{padding:"0px 35% 0% 35%"}}>Admin Dashboard</h1>
    <div style={{textAlign:"center",height:"100vh"}}>
        
        
        {/* <h1>Admin Dashboard</h1> */}
        <div>
            <div className='con' style={{height:"30vh",display:"flex",justifyContent:"space-evenly",alignItems:"center",flexWrap:"wrap"}}>
                <div className='buti' onClick={()=>navigate("/admin/admingems")} style={{display:'flex',cursor:"pointer",justifyContent:"center",height:"100px",borderStyle:"solid",alignItems:"center",backgroundColor:"#F4821F",borderRadius:"6px",border:"none"}}>
                    
                    <div>
                        <h3 className='fon' >Gems</h3>
                    </div>
                </div>
                <div className='buti' onClick={()=>navigate("/admin/beadss")} style={{display:'flex',cursor:"pointer",justifyContent:"center",height:"100px",borderStyle:"solid",alignItems:"center",backgroundColor:"#F4821F",borderRadius:"6px",border:"none"}}>
                    
                    <div>
                        <h3 className='fon'>Beads</h3>
                    </div>
                </div>
                <div className='buti' onClick={()=>navigate("/admin/diamonds")} style={{display:'flex',cursor:"pointer",justifyContent:"center",height:"100px",borderStyle:"solid",alignItems:"center",backgroundColor:"#F4821F",borderRadius:"6px",border:"none"}}>
                    
                    <div>
                        <h3 className='fon'>Dimonds</h3>
                    </div>
                </div>
                <div className='buti' onClick={()=>navigate("/admin/Diamondsjewelry")} style={{display:'flex',cursor:"pointer",justifyContent:"center",height:"100px",borderStyle:"solid",alignItems:"center",backgroundColor:"#F4821F",borderRadius:"6px",border:"none"}}>
                    
                    <div>
                        <h3 className='fon'>Diamonds<br/>Jewelry</h3>
                    </div>
                </div>
                
                
                
            </div>
            <div className='con' style={{height:"30vh",display:"flex",justifyContent:"space-evenly",alignItems:"center",flexWrap:"wrap"}}>
                <div className='buti' onClick={()=>navigate("/admin/austrology")} style={{display:'flex',cursor:"pointer",justifyContent:"center",height:"100px",borderStyle:"solid",alignItems:"center",backgroundColor:"#F4821F",borderRadius:"6px",border:"none"}}>
                    
                    <div>
                        <h3 className='fon'>Austrology <br/>Gems</h3>
                    </div>
                </div>
                <div className='buti' onClick={()=>navigate("/admin/pearls")} style={{display:'flex',cursor:"pointer",justifyContent:"center",height:"100px",borderStyle:"solid",alignItems:"center",backgroundColor:"#F4821F",borderRadius:"6px",border:"none"}}>
                    
                    <div>
                        <h3 className='fon'>Perals</h3>
                    </div>
                </div>
                <div className='buti' onClick={()=>navigate("/admin/corals")} style={{display:'flex',cursor:"pointer",justifyContent:"center",height:"100px",borderStyle:"solid",alignItems:"center",backgroundColor:"#F4821F",borderRadius:"6px",border:"none"}}>
                    <div style={{textAlign:"center"}}>
                        <h3 className='fon'>Corals</h3>
                    </div>
                </div>
                <div className='buti' onClick={()=>navigate("/admin/Loosediamonds")} style={{display:'flex',cursor:"pointer",justifyContent:"center",height:"100px",borderStyle:"solid",alignItems:"center",backgroundColor:"#F4821F",borderRadius:"6px",border:"none"}}>
                    <div>
                        <h3 className='fon'>Loose<br/> Diamonds</h3>
                    </div>
                </div>
                
                
                
            </div>
        </div>
        
    </div>
    </div>
  )
}

export default Adminhome