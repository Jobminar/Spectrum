// import AdminSideNav from "./AdminSide"
// import { FaSignOutAlt } from "react-icons/fa";
// import './Queries.css'
// import { useState,useEffect } from "react";
// import HomeIcon from '@mui/icons-material/Home';
// import { useNavigate } from "react-router-dom";
// import axios from "axios";

// const Queries=(()=>{
//     const [products, setProducts] = useState([]);
//     const navigate=useNavigate()
//     const [error, setError] = useState(null);
//     const [contacts,setContacts]=useState([])
  
//     useEffect(() => {
//         const fetchData = async () => {
//           try {
//             const response = await fetch('https://fakestoreapi.com/products');
//             if (!response.ok) {
//               throw new Error('Failed to fetch data');
//             }
//             const data = await response.json();
//             setProducts(data);
//           } catch (error) {
//             setError('Error fetching data');
//           }
//         };
    
//         fetchData();
//       }, []);
//       useEffect(() => {
//         const fetchData = async () => {
//           try {
//             const response = await fetch('https://sgl-be.onrender.com/getallcontact');
//             if (!response.ok) {
//               throw new Error('Failed to fetch data');
//             }
//             const data = await response.json();
//             setContacts(data);
//           } catch (error) {
//             setError('Error fetching data');
//           }
//         };
    
//         fetchData();
//       }, []);
//       console.log(contacts)

//       useEffect(() => {
//         // Check if the user is already logged in
//         const adminUsername = sessionStorage.getItem("admin-username");
//         if (!adminUsername) {
//           navigate("/adminlogin");
//         }
//       }, []);

//       const deletei = async (id) => {
//         console.log('Deleting contact with ID:', id);

//         try {
//           // Assuming you have the contactId as a prop or state
//           // const response = await axios.delete(`https://sgl-be.onrender.com/deletecontact/${id}`);
//           // console.log(response.data); // Optional: Log the response for debugging
//           const response = await fetch(`https://sgl-be.onrender.com/deletecontact/${id}`, {
//         method: "DELETE",
//       });
//       console.log(response)
    
//           // Handle any other UI updates or actions after successful deletion
//         } catch (error) {
//           console.error('Error deleting contact:', error);
//           // Handle error and show an error message to the user
//         }
//       };

//     return(
//         <>  
//            {/* <AdminSideNav/> */}
//            <nav
//                 className="navbar navbar-expand-lg navbar-light bg-light"
//                 style={{ marginTop: 0 }}
//             >
//                 {/* <div
//                 className="container"
//                 style={{ marginRight: "auto", display:'flex',justifyContent:"space-between"}}
//                 >
//                 <HomeIcon onClick={()=>navigate("/admin/adminhome")} style={{height:"40px",width:"40px",cursor:"pointer",margin:"5% 0% 0% 5%"}}/>

//                 <h1
//                     className="admin-dashboard ms-4 ms-sm-3 mx-auto"
//                     style={{ maxWidth: "fit-content" }}
//                 >
//                     Admin Dashboard
//                 </h1> */}
//                 {/* <div
//                     onClick={() => {
//                     navigate("/adminlogin");
//                     }}
//                     className="logout-button ms-auto"
//                 >
//                     <span className="d-none d-sm-inline">Logout </span>
//                     <FaSignOutAlt style={{ marginLeft: "8px", fontSize: "1rem" }} />
//                 </div> */}
//                 {/* </div> */}
//                 <div >
//                 <HomeIcon onClick={()=>navigate("/admin/adminhome")} style={{height:"40px",width:"40px",cursor:"pointer",margin:"5% 0% 0% 5%"}}/>
                
//                 {/* <h1 style={{textAlign:"center"}}>Admin Dashboard</h1> */}
//                 </div>
//                 <h1 style={{padding:"0px 35% 0% 35%"}}>Admin Dashboard</h1>
//             </nav>
//             <div className="queries-con">
//                  <h1>Queries</h1>
//                  <table className="table mt-3">
//             <thead>
//               <tr>
//                 <th>Name</th>
//                 <th>Email</th>
//                 <th>Mobile Number</th>
//                 <th>Message</th>
//                 <th>Action</th>
//               </tr>
//             </thead>
//             <tbody>
//               {contacts.map((item)=>(
//                 <tr key={item._id}>
//                   <td style={{paddingTop:"25px"}}>{item.name}</td>
//                   <td style={{paddingTop:"25px"}}>{item.email}</td>
//                   <td style={{paddingTop:"25px"}}>{item.mobile}</td>
//                   <td style={{paddingTop:"25px"}}>{item.message}</td>
//                   <td><button onClick={() => deletei(item._id)}>Delete</button></td>
//                 </tr>
//                 ))}
//             </tbody>
//           </table>
//                  <div className="queries-sub-con">
//                  {error && <p>{error}</p>}
//                     <ul>
//                         {products.map((product) => (
//                         <li style={{textAlign:"start"}} key={product.id}>{product.title}</li>
//                         // Render other product information as needed
//                         ))}
//                     </ul>
//                  </div>
//             </div> 
//             <div>
//             {/* <table className="table mt-3">
//             <thead>
//               <tr>
//                 <th>Name</th>
//                 <th>Email</th>
//                 <th>Mobile Number</th>
//                 <th>Message</th>
//               </tr>
//             </thead>
//             <tbody>
//               {contacts.map((item)=>(
//                 <tr key={item._id}>
//                   <td>{item.name}</td>
//                   <td>{item.email}</td>
//                   <td>{item.mobile}</td>
//                   <td>{item.message}</td>
//                 </tr>
//                 ))}
//             </tbody>
//           </table> */}
//             </div>
//         </>
//     )
// })
// export default Queries


import AdminSideNav from "./AdminSide";
import { FaSignOutAlt } from "react-icons/fa";
import './Queries.css';
import { useState, useEffect } from "react";
import HomeIcon from '@mui/icons-material/Home';
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Queries = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://fakestoreapi.com/products');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        setError('Error fetching data');
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://sgl-be.onrender.com/getallcontact');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setContacts(data);
      } catch (error) {
        setError('Error fetching data');
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const adminUsername = sessionStorage.getItem("admin-username");
    if (!adminUsername) {
      navigate("/adminlogin");
    }
  }, []);

  // const deleteContact = async (id) => {
  //   console.log('Deleting contact with ID:', id);

  //   try {
  //     const response = await fetch(`https://sgl-be.onrender.com/deletecontact/${id}`, {
  //       method: "DELETE",
  //     });

  //     if (!response.ok) {
  //       throw new Error('Failed to delete contact');
  //     }

  //     // Handle any other UI updates or actions after successful deletion
  //     // For example, you might want to update the state to remove the deleted contact
  //     setContacts(prevContacts => prevContacts.filter(contact => contact._id !== id));
  //   } catch (error) {
  //     console.error('Error deleting contact:', error);
  //     // Handle error and show an error message to the user
  //   }
  // };

  const handleDelete = async (id, index) => {
    try {
      const response = await fetch(`https://sgl-be.onrender.com/deleteconatct/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        console.log("Item deleted successfully!");
        const co = [...contacts];
        co.splice(index, 1);
        setContacts(co);
        // await Swal.fire({
        //   icon: "success",
        //   title: "Item deleted successfully!",
        //   showConfirmButton: false,
        //   timer: 1500,
        // });
      } else {
        console.error("Item deletion failed. Status:", response.status);
        throw new Error("Item deletion failed");
      }
    } catch (error) {
      // Swal.fire({
      //   icon: "error",
      //   title: "Oops...",
      //   text: "Something went wrong!",
      // });
      console.error("An error occurred during item deletion:", error);
    }
  };

  // const deleteContact = async (contactId) => {
  //   try {
  //     // Logic to delete the contact using an API or any other method
  //     await fetch(`https://sgl-be.onrender.com/deletecontact/${contactId}`, {
  //       method: 'DELETE',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //     });

  //     // After deletion, update the state to re-render the component
  //     // fetchContacts();
  //   } catch (error) {
  //     console.error('Error deleting contact:', error);
  //     // Handle error if needed
  //   }
  // };
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light" style={{ marginTop: 0 }}>
        <div>
          <HomeIcon onClick={() => navigate("/admin/adminhome")} style={{ height: "40px", width: "40px", cursor: "pointer", margin: "5% 0% 0% 5%" }} />
        </div>
        <h1 style={{ padding: "0px 35% 0% 35%" }}>Admin Dashboard</h1>
      </nav>
      <div className="queries-con">
        <h1>Queries</h1>
        <table className="table mt-3">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Mobile Number</th>
              <th>Message</th>
              <th>Action</th>
            </tr>
          </thead>
          {contacts.length<=0?(<p style={{textAlign:"center"}}>No Data Found</p>):(
          <tbody>
            {/* {contacts.length<=0?(<p style={{textAlign:"center"}}>No Data Found</p>):( */}
              <>
            {contacts.map((item,index) => (
              <tr key={index}>
                <td style={{ paddingTop: "25px" }}>{item.name}</td>
                <td style={{ paddingTop: "25px" }}>{item.email}</td>
                <td style={{ paddingTop: "25px" }}>{item.mobile}</td>
                <td style={{ paddingTop: "25px" }}>{item.message}</td>
                <td><button onClick={() => handleDelete( item._id,index)}>Delete</button></td>
              </tr>
            ))}
            </>
          </tbody>)}
        </table>
        <div className="queries-sub-con">
          {error && <p>{error}</p>}
          <ul>
            {products.map((product) => (
              <li style={{ textAlign: "start" }} key={product.id}>{product.title}</li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Queries;
