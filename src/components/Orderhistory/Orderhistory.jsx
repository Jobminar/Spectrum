import React, { useEffect, useState } from 'react'
import CircularProgress from "@mui/material/CircularProgress";


const Orderhistory = () => {
    const [data, setData]=useState([])
    const [cartItems, setCartItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);


    // useEffect(()=>{
    //     const fetchDate=async()=>{
    //         try{
    //             const responce =await fetch("https://sgl-be.onrender.com/getallcart")
    //             const respodata= await responce.json()
    //             const userCartItems = respodata.cartItems.filter(item => item.userIds === user._id);
    //             const updatedData = userCartItems.map((item) => ({ ...item, quantity: 1 }));
    //             setData(updatedData)
    //             console.log(updatedData,"usecart")
    //         }catch{
    //             console.log("error")
    //         }
            
    //     }
    //     fetchDate();
    // },[])
    useEffect(() => {
        const fetchData = async () => {
          try {
            const user= JSON.parse(sessionStorage.getItem("userData"))
            console.log(user)
            const response = await fetch("https://sgl-be.onrender.com/getuserorder");
            const data = await response.json();
            // const userCartItems = data.cartItems.filter(item => item.userID === user._id);
            const userCartItems = data.filter(item => item.userID === user._id);

            // const data = await response.json();
            const updatedData = userCartItems.map((item) => ({ ...item}));
            setCartItems(updatedData);
            if (response.ok) {
              // const data = await response.json();
              // setBeads(data);
              
              setIsLoading(false);
            } else {
              const errorMessage = await response.text();
              console.error(
                `Failed to fetch beads. Server response: ${errorMessage}`
              );
              setIsLoading(false);
            }
          } catch (error) {
            console.error("Error fetching data:", error);
            setIsLoading(false);
          }
        };
    
        fetchData();
      }, [])
    console.log(cartItems.length,"length")
  return (
    <div>
      <h1>Order History</h1>
      {isLoading && (
        <div className="loading-container">
          <CircularProgress color="warning"/>
        </div>
      )}
      {!isLoading && (
      <center>
        {cartItems.length<=0 ?"No Orders":(
      <table border="1" style={{width:"90%",marginBottom:"20px",paddingBottom:"20px",textAlign:"center"}}>
        <thead style={{textAlign:'center'}}>
          <tr>
            <th >Total Items</th>
            <th>Total Cost</th>
            <th>Address</th>
            {/* <th>Stta</th> */}
            <th>Date</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {cartItems.map(item => (
            <tr key={item._id}>
              <td>{item.totalItems}</td>
              <td>{item.grandTotal}</td>
              <td>{item.address}</td>
              {/* <td>{item.totalItems}</td> */}
              <td>{item.date}</td>
              <td>{item.status}</td>
              {/* <td><img
                src={`data:image/png;base64,${item.username}`}
                alt={item.username}
                style={{ height: "50px", width: "50px" }}
              /></td> */}
              {/* Add more cells based on your data structure */}
            </tr>
          ))}
        </tbody>
      </table>
        )}
      </center>
      )}
    </div>
  );
};

export default Orderhistory