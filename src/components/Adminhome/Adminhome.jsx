import React, { useEffect } from 'react'
import "./Adminhome.css"
import { useNavigate } from 'react-router-dom';
import { FaComments, FaShoppingCart, FaList, FaBox } from "react-icons/fa";
import { FaEdit, FaTrashAlt, FaSignOutAlt } from "react-icons/fa";



const Adminhome = () => {
    const navigate =useNavigate()
    useEffect(() => {
        // Check if the user is already logged in
        const adminUsername = sessionStorage.getItem("admin-username");
        if (!adminUsername) {
          navigate("/adminlogin");
        }
      }, []);
      const logou=()=>{
        sessionStorage.removeItem("admin-username")
        navigate("/adminlogin")
      }
  return (
    <div style={{textAlign:"center",height:"100vh"}}>
        <h1>Admin Dashbord</h1>
        <div
        onClick={logou}
            // onClick={() => {
            //   navigate("/adminlogin");
            // }}
            className="logout-button ms-auto"
          >
            <span className="d-none d-sm-inline">Logout </span>
            <FaSignOutAlt style={{ marginLeft: "8px", fontSize: "1rem" }} />
          </div>
        <div className='cont1' style={{height:"30vh",display:"flex",justifyContent:"space-evenly",alignItems:"center",flexWrap:"wrap"}}>
            <div className='but' onClick={()=>navigate("/admin/inventoryitem")} style={{display:'flex',justifyContent:"center",cursor:"pointer",borderStyle:"solid",alignItems:"center",padding:"2px",backgroundColor:"#F4821F",borderRadius:"6px",border:"none"}}>
                <div>
                    <FaShoppingCart style={{height:"40px",width:"40px",paddingLeft:"10px"}} />
                </div>
                <div>
                    <h1 className='fontco'>Inventory</h1>
                </div>
            </div>
            <div onClick={()=>navigate("/admin/orders")} style={{display:'flex',justifyContent:"center",cursor:"pointer",backgroundColor:"#F4821F",borderRadius:"6px",border:"none",alignItems:"center",padding:"2px"}} className='but'>
                <div>
                    <FaBox style={{height:"40px",width:"40px"}} />
                </div>
                <div>
                    <h1 className='fontco'>Orders</h1>
                </div>
            </div>
            
        </div>
        <div style={{height:"30vh",display:"flex",justifyContent:"space-evenly",alignItems:"center",flexWrap:"wrap"}}>
            <div onClick={()=>navigate("/admin/blogs")} style={{display:'flex',justifyContent:"center",cursor:"pointer",backgroundColor:"#F4821F",borderRadius:"6px",border:"none",alignItems:"center",padding:"2px"}} className='but'>
                <div>
                    <FaList style={{height:"40px",width:"40px"}} />
                </div>
                <div>
                    <h1 className='fontco'>Blogs</h1>
                </div>
            </div>
            <div onClick={()=>navigate("/admin/queries")} style={{display:'flex',justifyContent:"center",cursor:"pointer",backgroundColor:"#F4821F",borderRadius:"6px",border:"none",alignItems:"center",padding:"2px"}} className='but'>
                <div>
                    <FaComments style={{height:"40px",width:"40px"}} />
                </div>
                <div>
                    <h1 className='fontco'>Queries</h1>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Adminhome