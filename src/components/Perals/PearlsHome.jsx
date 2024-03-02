// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import "./PearlsHome.css";
// import Beadssidebar from "../Filterssidebar/beadssidebar";
// import CircularProgress from "@mui/material/CircularProgress";

// const PearlsHome = () => {
//   const navigate = useNavigate();
//   const [selectedItem, setSelectedItem] = useState(null);
//   const [pearls, setPearls] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     const fetchPearls = async () => {
//       try {
//         const response = await fetch("https://sgl-be.onrender.com/getpearls");
//         if (response.ok) { 
//           const data = await response.json();
//           setPearls(data);
//           setIsLoading(false);
//         } else {
//           const errorMessage = await response.text();
//           console.error(
//             `Failed to fetch Pearls. Server response: ${errorMessage}`
//           );
//           setIsLoading(false);
//         }
//       } catch (error) {
//         console.error("Error fetching pearls:", error.message);
//         setIsLoading(false);
//       }
//     };

//     fetchPearls();
//   }, []);

//   const handleViewDetails = (clickedItem) => {
//     setSelectedItem(clickedItem);
//     sessionStorage.setItem("selectedItem", JSON.stringify(clickedItem));
//     // Update the route based on your navigation setup
//     // For example, assuming "/diamondscart" is the route to navigate to
//     // Replace this line with your actual navigation logic
//     navigate("/diamondscart");
//   };

//   return (
//     <div className="pearlshome-container">
//       {isLoading && (
//         <div className="loading-container">
//           <CircularProgress />
//         </div>
//       )}
//       <h1>ononvoavn svjlapnNOAAN</h1>

//       {!isLoading && (
//         <div className="peralshome-main-con">
//           <div className="perals-side-nav">
//             <Beadssidebar />
//           </div>
//           <div className="perals-map-area">
//             <div className="beadsmain-con">
//               {pearls.map((item, index) => (
//                 <div key={index}>
//                   <div
//                     className={`beads-box ${
//                       selectedItem === item ? "selected" : ""
//                     }`}
//                     onClick={() => handleViewDetails(item)}
//                   >
//                     <img
//                       src={`data:image/png;base64,${item.image}`}
//                       alt="jewelry"
//                       width="50%"
//                       height="50%"
//                       className="beads-image"
//                     />
//                     <p className="pearlsname">{item.name}</p>
//                     <h4 className="">{item.price}</h4>
//                     <button
//                       className="buy-now-button"
//                       onClick={() => handleViewDetails(item)}
//                     >
//                       View Product
//                     </button>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default PearlsHome;


import React, { useEffect, useState } from "react";
import "../Perals/PearlsHome.css";
import { useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";

const ITEMS_PER_PAGE = 10;

const GemGrid = () => {
  const navigate = useNavigate();
  const [selectedItem, setSelectedItem] = useState(null);
  const [beads, setBeads] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedOption, setSelectedOption] = useState('');

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  useEffect(() => {
    const fetchBeads = async () => {
      try {
        const response = await fetch("https://sgl-be.onrender.com/getpearls");
        if (response.ok) {
          const data = await response.json();
          setBeads(data);
          setIsLoading(false);
        } else {
          const errorMessage = await response.text();
          console.error(
            `Failed to fetch beads. Server response: ${errorMessage}`
          );
          setIsLoading(false);
        }
      } catch (error) {
        console.error("Error fetching Pearls:", error.message);
        setIsLoading(false);
      }
    };

    fetchBeads();
  }, []);

  const handleViewDetails = (clickedItem) => {
    setSelectedItem(clickedItem);
    sessionStorage.setItem("selectedItem", JSON.stringify(clickedItem));
    navigate("/diamondscart");
  };

  const totalPages = Math.ceil(beads.length / ITEMS_PER_PAGE);

  const paginate = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const goToFirstPage = () => setCurrentPage(1);
  const goToLastPage = () => setCurrentPage(totalPages);

  const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;

  // Filter gemstones based on selected option
  const filteredBeads = beads.filter(item => {
    if (selectedOption === 'SouthSea') {
      return item.subtype === 'SouthSea';
    } else if (selectedOption === 'KcPerals') {
      return item.subtype === 'KcPerals';
    }
    else if (selectedOption === 'Freshwater') {
      return item.subtype === 'Freshwater';
    }
    else if (selectedOption === 'Cultured') {
      return item.subtype === 'Cultured';
    } else {
      return true; // Show all if no option is selected
    }
  });

  const currentItems = filteredBeads.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="pearlshome-container">
      {isLoading && (
        <div className="loading-container">
          <CircularProgress color="warning"/>
        </div>
      )}

      {!isLoading && (
        <div className="gemsgrid-main-con">
          <div className="" style={{padding:"0px",marginRight:"5%"}}>
            <div style={{backgroundColor:"#FCE2CB",width:"100%",marginRight:"0px",paddingLeft:"10px",paddingRight:"0px",paddingTop:"20px",paddingBottom:"20px"}}>
            <div >
              <label style={{paddingRight:"30px"}}>
                <input
                  type="radio"
                  value="SouthSea"
                  style={{paddingLeft:"10px",marginRight:"10px"}}
                  checked={selectedOption === 'SouthSea'}
                  onChange={handleOptionChange}
                />
                SouthSea
              </label>
            </div>
            <div>
              <label style={{paddingRight:"35px"}}>
                <input
                  type="radio"
                  value="KcPerals"
                  checked={selectedOption === 'KcPerals'}
                  onChange={handleOptionChange}
                  style={{marginRight:"10px"}}
                />KcPerals
              </label>
            </div>
            <div >
              <label style={{paddingRight:"20px"}}>
                <input
                  type="radio"
                  value="Freshwater"
                  style={{paddingLeft:"10px",marginRight:"10px"}}
                  checked={selectedOption === 'Freshwater'}
                  onChange={handleOptionChange}
                />
                Freshwater
              </label>
            </div>
            <div>
              <label style={{paddingRight:"40px"}}>
                <input
                  type="radio"
                  value="Cultured"
                  checked={selectedOption === 'Cultured'}
                  onChange={handleOptionChange}
                  style={{marginRight:"10px"}}
                />
                Cultured
              </label>
            </div>
            </div>
          </div>
          <div className="perals-map-area">
            <div className="gemsmain-con">
              {currentItems.map((item, index) => (
                <div key={index}>
                  <div
                    className={`beads-box ${
                      selectedItem === item ? "selected" : ""
                    }`}
                    onClick={() => handleViewDetails(item)}
                  >
                    <img
                      src={`data:image/png;base64,${item.image}`}
                      alt="jewelry"
                      width="50%"
                      height="50%"
                      className="beads-image"
                    />
                    <p className="pearlsname">{item.name}</p>
                    <h4 className="">{item.price}</h4>
                    <button className="buy-now-button">View Product</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div style={{display:'flex',justifyContent:"end"}}>
          {filteredBeads.length > ITEMS_PER_PAGE && (
            <div className="pagination">
              <span onClick={goToFirstPage}>First</span>
              {[...Array(totalPages).keys()].map((pageNumber) => (
                <span
                  key={pageNumber + 1}
                  onClick={() => paginate(pageNumber + 1)}
                  className={pageNumber + 1 === currentPage ? "active" : ""}
                >
                  {pageNumber + 1}
                </span>
              ))}
              <span onClick={goToLastPage}>Last</span>
            </div>
          )}
          </div>
        </div>
      )}
    </div>
  );
};

export default GemGrid;