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
        const response = await fetch("https://sgl-be.onrender.com/getloosedimonds");
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
    sessionStorage.setItem("Category","Loosediamonds")
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
    if (selectedOption === 'Rings') {
      return item.subtype === 'Rings';
    } else if (selectedOption === 'Pendants') {
      return item.subtype === 'Pendants';
    }
    else if (selectedOption === 'Nosepin') {
      return item.subtype === 'Nosepin';
    }
    else if (selectedOption === 'Earings') {
      return item.subtype === 'Earings';
    }
    else if (selectedOption === 'Gold') {
      return item.subtype === 'Gold';
    }
    else if (selectedOption === 'Plantinum') {
      return item.subtype === 'Plantinum';
    }
    else if (selectedOption === 'Silver') {
      return item.subtype === 'Silver';
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
          <div className="" style={{marginRight:"5%"}}>
            <div style={{backgroundColor:"#FCE2CB",width:"100%",paddingLeft:"0px",paddingRight:"0px",paddingTop:"20px",paddingBottom:"20px"}}>
            <div >
              <label style={{paddingRight:"67px"}}>
                <input
                  type="radio"
                  value="Rings"
                  style={{margin:"10px"}}
                  checked={selectedOption === 'Rings'}
                  onChange={handleOptionChange}
                />
                Rings
              </label>
            </div>
            <div>
              <label style={{paddingRight:"40px"}}>
                <input
                  type="radio"
                  value="Pendants"
                  checked={selectedOption === 'Pendants'}
                  onChange={handleOptionChange}
                  style={{marginRight:"px"}}
                />Pendants
              </label>
            </div>
            <div >
              <label style={{paddingRight:"50px"}}>
                <input
                  type="radio"
                  value="Nosepin"
                  style={{paddingLeft:"10px"}}
                  checked={selectedOption === 'Nosepin'}
                  onChange={handleOptionChange}
                />
                Nosepin
              </label>
            </div>
            <div>
              <label style={{paddingRight:"55px"}}>
                <input
                  type="radio"
                  value="Earings"
                  checked={selectedOption === 'Earings'}
                  onChange={handleOptionChange}
                  style={{marginRight:"0px"}}
                />
                Earings
              </label>
            </div>
            <div>
              <label style={{paddingRight:"77px"}}>
                <input
                  type="radio"
                  value="Gold"
                  checked={selectedOption === 'Gold'}
                  onChange={handleOptionChange}
                  style={{marginRight:"0px"}}
                />
                Gold
              </label>
            </div>
            <div>
              <label style={{paddingRight:"40px"}}>
                <input
                  type="radio"
                  value="Plantinum"
                  checked={selectedOption === 'Plantinum'}
                  onChange={handleOptionChange}
                  style={{marginRight:"0px"}}
                />
                Plantinum
              </label>
            </div>
            <div>
              <label style={{paddingRight:"70px"}}>
                <input
                  type="radio"
                  value="Silver"
                  checked={selectedOption === 'Silver'}
                  onChange={handleOptionChange}
                  style={{marginRight:"0px"}}
                />
                Silver
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
                      src={`data:image/png;base64,${item.image1}`}
                      alt="jewelry"
                      width="50%"
                      height="50%"
                      className="beads-image"
                    />
                    <p className="pearlsname">{item.name}</p>
                    <h4 className="">{item.shape}</h4>
                    <p style={{textAlign:'center'}}><a href="tel:+123456789"><CallIcon style={{color:"orange",cursor:"pointer"}} /></a></p>
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