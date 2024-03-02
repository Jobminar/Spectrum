
import React, { useEffect, useState } from "react";
import "../Perals/PearlsHome.css";
import { useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import CallIcon from '@mui/icons-material/Call';

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
        const response = await fetch("https://sgl-be.onrender.com/getgems");
        // console.log(response,"Response 285 line")
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
        // console.log()
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
    sessionStorage.setItem("Category","GEM")
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
    if (selectedOption === 'Precious') {
      return item.subtype === 'Precious';
    } else if (selectedOption === 'Semi-Precious') {
      return item.subtype === 'Semi-Precious';
    } else {
      return true; // Show all if no option is selected
    }
  });

  const currentItems = filteredBeads.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="pearlshome-container">
      {console.log(beads,"data from backed")}
      {isLoading && (
        <div className="loading-container">
          <CircularProgress color="warning"/>
        </div>
      )}

      {!isLoading && (
        <div className="gemsgrid-main-con">
          <div className="" style={{padding:"0px",position:"relative",marginRight:"5%"}}>
            <div style={{backgroundColor:"#FCE2CB",width:"100%",marginRight:"0px"}}>
            <ul style={{ listStyleType: "none", padding: "5px" }}>
              <li>
              <label style={{paddingRight:"35px"}}>
                <input
                  type="radio"
                  value="Precious"
                  style={{paddingLeft:"10px"}}
                  checked={selectedOption === 'Precious'}
                  onChange={handleOptionChange}
                />
                Precious
              </label>
              </li>
              <li>
              <label style={{paddingLeft:"9px"}}>
                <input
                  type="radio"
                  value="Semi-Precious"
                  checked={selectedOption === 'Semi-Precious'}
                  onChange={handleOptionChange}
                  style={{marginRight:"10px"}}
                />
                SemiPrecious
              </label>
              </li>
            </ul>
            </div>
          </div>
          <div className="perals-map-area" >
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
                      src={`data:image/png;base64,${item.image1}`}
                      alt="jewelry"
                      width="50%"
                      height="50%"
                      className="beads-image" style={{paddingRight:"1px"}}
                    />
                    <p className="pearlsname">{item.name}</p>

                    <h4 className="">{item.shape}</h4>
                    <p style={{textAlign:'center'}}><a href="tel:+123456789"><CallIcon style={{cursor:"pointer",color:"orange"}}/></a></p>
                    {/* <p>{item. dimensions}</p> */}
                    {console.log(item.dimensions,'hgfdfgkjrdhhfj')}
                    {/* <h4 className="">{item.units}</h4> */}
                    <button className="buy-now-button">View Product</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
        </div>
        
      )}
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
  );
};

export default GemGrid;

