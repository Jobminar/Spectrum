export const DiamondFilters = () => {
  // Create a function to create a new badge element
  function createBadge(filter) {
    // Create a span element with the badge class and the filter value
    return (
      <div
        key={filter}
        className="badge bg-white text-dark border border-orange m-1 badge-sm"
      >
        <span className="badge-text">{filter}</span>
        <button type="button" className="btn-close" aria-label="Close"></button>
      </div>
    );
  }

  // Render some static badges for demonstration
  const staticBadges = ["Round", "Oval", "Princess"];

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light mt-0">
      <div className="container">
        <a className="navbar-brand" href="#">
          24 Products
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <a className="nav-link" href="#">
                Ascending
              </a>
            </li>
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="navbarDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                SORT BY
              </a>
              <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                <a className="dropdown-item" href="#">
                  Price
                </a>
                <a className="dropdown-item" href="#">
                  Carat
                </a>
              </div>
            </li>
            <div className="filter-container d-flex mt-1 p-0">
              {/* Render static badges for now */}
              {staticBadges.map((filter) => createBadge(filter))}
            </div>
          </ul>
        </div>
      </div>
    </nav>
  );
};