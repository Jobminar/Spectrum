import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faTimes } from "@fortawesome/free-solid-svg-icons";
import "bootstrap/dist/css/bootstrap.min.css";
import FuzzySearch from "fuzzy-search";
import Swal from "sweetalert2";
import "./SearchBarPopup.css";

const SearchBarPopup = ({ onClose }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [message, setMessage] = useState("Search for your items.");
  const navigate = useNavigate();
  const [recommendedData, setRecommendedData] = useState([]);
  const [backspacePromptDisplayed, setBackspacePromptDisplayed] =
    useState(false);
  const [backspacePromptMessage, setBackspacePromptMessage] = useState("");
  const apiURL = "https://your-api.com/recommended";

  const sampleData = [
    { type: "page", path: "/gems", label: "Gems" },
    { type: "page", path: "/beads", label: "Beads" },
    { type: "page", path: "/diamonds", label: "Diamonds" },
    { type: "page", path: "/aboutus", label: "About Us" },
    { type: "page", path: "/astrology", label: "Astrology" },
    { type: "page", path: "/peralhome", label: "Pearls" },
    { type: "page", path: "/zodiacsub", label: "Zodiac Subpage" },
    { type: "page", path: "/corals", label: "Corals" },
    { type: "page", path: "/jewelery", label: "Jewelry" },
    { type: "product", id: "123", name: "Diamond Ring" },
    { type: "product", id: "456", name: "Pearl Necklace" },
  ];

  useEffect(() => {
    // Fetch recommended data on component mount
    fetch(apiURL)
      .then((response) => response.json())
      .then((data) => setRecommendedData(data))
      .catch((error) =>
        console.error("Error fetching recommended data:", error)
      );
  }, []);

  const fuzzySearchInstance = new FuzzySearch(sampleData, ["label"], {
    caseSensitive: false,
  });

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      // Trigger search on Enter key press
      handleSearch();
    } else if (event.key === "Backspace" && searchQuery === "") {
      if (!backspacePromptDisplayed) {
        // Display a prompt or message after the first backspace
        setBackspacePromptDisplayed(true);
        setBackspacePromptMessage("Press backspace again to exit");
      } else {
        // Handle backspace key when the search bar is empty for the second time
        console.log("Backspace pressed. Closing search.");
        onClose();
      }
    } else {
      // Reset backspace prompt when a key other than backspace is pressed
      setBackspacePromptDisplayed(false);
      setBackspacePromptMessage("");
    }
  };

  const handleSearchChange = (event) => {
    const query = event.target.value.trim();
    setSearchQuery(query);

    // Validation: Require at least 2 letters or spaces
    if (query.length < 2) {
      setMessage("Please enter at least 2 letters or spaces.");
      setSearchResults([]);
      return;
    }

    // Update search results based on query and recommended data
    const filteredResults = fuzzySearchInstance.search(query);
    setSearchResults([...recommendedData, ...filteredResults]);

    // Implement backspace functionality
    if (
      event.nativeEvent.inputType === "deleteContentBackward" &&
      query === ""
    ) {
      // Handle backspace when the search bar is not empty
      console.log("Backspace pressed. Clearing search results.");
      setSearchResults([]);
    }

    // Update the message based on the search query
    setMessage(
      query === "" ? "Search for your items." : "No matching results found."
    );
  };

  const handleSearch = () => {
    if (searchQuery.trim() === "") {
      Swal.fire({
        title: "Empty Search!",
        text: "Please enter something to search.",
        icon: "warning",
      });
      return;
    }

    const lowercaseQuery = searchQuery.toLowerCase();
    const filteredResults = fuzzySearchInstance.search(lowercaseQuery);

    if (filteredResults.length > 0) {
      const matchedResult = filteredResults[0];

      if (matchedResult.type === "page") {
        navigate(matchedResult.path);
      } else if (matchedResult.type === "product") {
        Swal.fire({
          title: "Product Found!",
          text: `Navigating to product with ID: ${matchedResult.id}`,
          icon: "success",
        });
      }
    } else {
      Swal.fire({
        title: "No Match Found!",
        text: `No match found for: ${searchQuery}`,
        icon: "error",
      });
    }

    onClose();
  };

  const handleSuggestionClick = (suggestion) => {
    const matchedResult = sampleData.find(
      (item) => item.label.toLowerCase() === suggestion.toLowerCase()
    );

    if (matchedResult) {
      if (matchedResult.type === "page") {
        navigate(matchedResult.path);
      } else if (matchedResult.type === "product") {
        Swal.fire({
          title: "Product Found!",
          text: `Navigating to product with ID: ${matchedResult.id}`,
          icon: "success",
        });
      }

      onClose();
    } else {
      Swal.fire({
        title: "No Match Found!",
        text: `No match found for suggestion: ${suggestion}`,
        icon: "error",
      });
    }
  };

  return (
    <div className="search-bar-popup p-2 m-auto border-0">
      <div className="search-card card rounded shadow-sm m-1 p-1">
        <div className="search-field d-flex align-items-center">
          <input
            className="form-control searchTerm rounded-start m-1"
            type="text"
            placeholder="Search here..."
            value={searchQuery}
            onChange={handleSearchChange}
            onKeyDown={handleKeyDown}
            required
          />
          <button
            className="searchButton btn btn-success rounded-end p-0 w-25"
            type="button"
            onClick={handleSearch}
          >
            <FontAwesomeIcon icon={faSearch} />
          </button>
          <button
            className="closeButton btn btn-danger rounded-end p-0 w-25"
            type="button"
            onClick={onClose}
          >
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </div>
        {searchResults.length > 0 && (
          <ul className="list-group mt-2">
            {searchResults.map((result, index) => (
              <li
                key={index}
                className="list-group-item suggestion-item hover-effect"
                onClick={() => handleSuggestionClick(result.label)}
              >
                {result.label}
              </li>
            ))}
          </ul>
        )}
        {/* Validation Warning */}
        {searchResults.length === 0 && searchQuery.length > 1 && (
          <div className="validation-warning">
            <p className="mt-2 text-warning">Please refine your search.</p>
          </div>
        )}

        {/* Inside the component's JSX */}
        {backspacePromptDisplayed && (
          <p className="backspace-prompt">{backspacePromptMessage}</p>
        )}

        {searchResults.length === 0 && (
          <div
            className="empty-search-results"
            style={{ overflow: "auto", minHeight: "40px" }}
          >
            <p className="mt-2 text-muted">{message}</p>
          </div>
        )}
      </div>
    </div>
  );
};

SearchBarPopup.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default SearchBarPopup;
