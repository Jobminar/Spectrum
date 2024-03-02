import React, { useEffect, useState } from "react";
import "../../Perals/PearlsHome.css";
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
        const response = await fetch("https://sgl-be.onrender.com/getastrologygems");
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

  const filteredBeads = beads.filter(item => {
    if (selectedOption === 'YellowSappire') {
      return item.subtype === 'YellowSappire';
    } else if (selectedOption === 'BlueSapphire') {
      return item.subtype === 'BlueSapphire';
    }
    else if (selectedOption === 'Emerald') {
      return item.subtype === 'Emerald';
    }
    else if (selectedOption === 'Ruby') {
      return item.subtype === 'Ruby';
    }
    else if (selectedOption === 'Opal') {
      return item.subtype === 'Opal';
    }
    else if (selectedOption === 'Pearl') {
      return item.subtype === 'Pearl';
    }
    else if (selectedOption === 'RedCoral') {
      return item.subtype === 'RedCoral';
    }
    else if (selectedOption === 'Hessonite') {
      return item.subtype === 'Hessonite';
    }
    else if (selectedOption === 'Hessonite') {
      return item.subtype === 'Hessonite';
    } else {
      return true; 
    }
  });

  const currentItems = filteredBeads.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="pearlshome-container">
      {isLoading && (
        <div className="loading-container">
          <CircularProgress  color="warning" />
        </div>
      )}

      {!isLoading && (
        <div className="gemsgrid-main-con">
          <div className="mm">
            {/* <div style={{backgroundColor:"#FCE2CB",width:"100%",paddingRight:"40px",paddingTop:"20px",paddingBottom:"20px"}}>
            <div >
              <label style={{paddingRight:"70px"}}>
                <input
                  type="radio"
                  value="YellowSappire"
                  style={{paddingLeft:"10px"}}
                  checked={selectedOption === 'YellowSappire'}
                  onChange={handleOptionChange}
                />
                YellowSappire
              </label>
            </div>
            <div>
              <label style={{paddingRight:"13px"}}>
                <input
                  type="radio"
                  value="BlueSapphire"
                  checked={selectedOption === 'BlueSapphire'}
                  onChange={handleOptionChange}
                  style={{marginRight:"px"}}
                />BlueSapphire
              </label>
            </div>
            <div >
              <label style={{paddingRight:"10px"}}>
                <input
                  type="radio"
                  value="YellowSappire"
                  style={{paddingLeft:"10px"}}
                  checked={selectedOption === 'YellowSappire'}
                  onChange={handleOptionChange}
                />
                YellowSappire
              </label>
            </div>
            <div>
              <label style={{paddingRight:"60px"}}>
                <input
                  type="radio"
                  value="Ruby"
                  checked={selectedOption === 'Ruby'}
                  onChange={handleOptionChange}
                  style={{marginRight:"0px"}}
                />
                Ruby
              </label>
            </div>
            <div>
              <label style={{paddingRight:"40px"}}>
                <input
                  type="radio"
                  value="Opal"
                  checked={selectedOption === 'Opal'}
                  onChange={handleOptionChange}
                  style={{marginRight:"0px"}}
                />
                Opal
              </label>
            </div>
            <div>
              <label style={{paddingRight:"45px"}}>
                <input
                  type="radio"
                  value="Pearl"
                  checked={selectedOption === 'Pearl'}
                  onChange={handleOptionChange}
                  style={{marginRight:"0px"}}
                />
                Pearl
              </label>
            </div>
            <div>
              <label style={{paddingRight:"55px"}}>
                <input
                  type="radio"
                  value="Mutyam"
                  checked={selectedOption === 'Mutyam'}
                  onChange={handleOptionChange}
                  style={{marginRight:"0px"}}
                />
                Mutyam
              </label>
            </div>
            <div>
              <label style={{paddingRight:"55px"}}>
                <input
                  type="radio"
                  value="Mutyam"
                  checked={selectedOption === 'Mutyam'}
                  onChange={handleOptionChange}
                  style={{marginRight:"0px"}}
                />
                Mutyam
              </label>
            </div>
            <div>
              <label style={{paddingLeft:"7px"}}>
                <input
                  type="radio"
                  value="Hessonite"
                  checked={selectedOption === 'Hessonite'}
                  onChange={handleOptionChange}
                  style={{marginRight:"7px"}}
                />
                Hessonite
              </label>
            </div>
            </div> */}
            <div style={{ backgroundColor: "#FCE2CB", width: "90%",marginTop:"30px", paddingRight: "10px",paddingLeft:"10px", paddingTop: "20px", paddingBottom: "20px" }}>
  <ul style={{ listStyleType: "none", padding: 0 }}>
    <li>
      <label style={{ paddingRight: "10px" }}>
        <input
          type="radio"
          value="YellowSappire"
          style={{ paddingLeft: "10px",marginRight:"20px" }}
          checked={selectedOption === 'YellowSappire'}
          onChange={handleOptionChange}
        />
        YellowSappire
      </label>
    </li>
    <li>
      <label style={{ paddingRight: "13px" }}>
        <input
          type="radio"
          value="BlueSapphire"
          checked={selectedOption === 'BlueSapphire'}
          onChange={handleOptionChange}
          style={{ marginRight: "20px" }}
        />
        BlueSapphire
      </label>
    </li>
    <li>
      <label style={{ paddingRight: "48px" }}>
        <input
          type="radio"
          value="Emerald"
          style={{ paddingLeft: "10px",marginRight:"20px" }}
          checked={selectedOption === 'Emerald'}
          onChange={handleOptionChange}
        />
        Emerald
      </label>
    </li>
    <li>
      <label style={{ paddingRight: "80px" }}>
        <input
          type="radio"
          value="Ruby"
          checked={selectedOption === 'Ruby'}
          onChange={handleOptionChange}
          style={{ marginRight: "20px" }}
        />
        Ruby
      </label>
    </li>
    <li>
      <label style={{ paddingRight: "75px" }}>
        <input
          type="radio"
          value="Opal"
          checked={selectedOption === 'Opal'}
          onChange={handleOptionChange}
          style={{ marginRight: "20px" }}
        />
        Opal
      </label>
    </li>
    <li>
      <label style={{ paddingRight: "70px" }}>
        <input
          type="radio"
          value="Pearl"
          checked={selectedOption === 'Pearl'}
          onChange={handleOptionChange}
          style={{ marginRight: "20px" }}
        />
        Pearl
      </label>
    </li>
    <li>
      <label style={{ paddingRight: "55px" }}>
        <input
          type="radio"
          value="RedCoral"
          checked={selectedOption === 'RedCoral'}
          onChange={handleOptionChange}
          style={{ marginRight: "20px" }}
        />
        RedCoral
      </label>
    </li>
    <li>
      <label style={{ paddingRight: "55px" }}>
        <input
          type="radio"
          value="Hessonite"
          checked={selectedOption === 'Hessonite'}
          onChange={handleOptionChange}
          style={{ marginRight: "20px" }}
        />
        Hessonite
      </label>
    </li>
    
    
    {/* <li>
      <label style={{ paddingLeft: "0px" }}>
        <input
          type="radio"
          value="Hessonite"
          checked={selectedOption === 'SemiPreciousStones'}
          onChange={handleOptionChange}
          style={{ marginLeft: "20px" }}
        />
        SemiPrecious
      </label>
    </li> */}
  </ul>
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