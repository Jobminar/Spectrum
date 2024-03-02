import { useState } from "react";
import InventoryChart from "./InventoryChart";
import AdminSideNav from "./AdminSide";
import { useNavigate } from "react-router-dom";
import { FaSignOutAlt } from "react-icons/fa";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import UploadForm from "./UploadForm";
// import "./Inventory.css";

const Inventory = () => {
  const navigate = useNavigate();

  const [inventoryData, setInventoryData] = useState([]);

  const handleUpload = (newItem) => {
    setInventoryData((prevData) => [...prevData, newItem]);
  };

  const handleInventoryItem = (itemId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        setInventoryData((prevData) =>
          prevData.filter((item) => item.id !== itemId)
        );

        await Swal.fire({
          icon: "success",
          title: "Item deleted successfully!",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };

  const renderTableRows = () => {
    return inventoryData.map((item) => (
      <tr key={item.id}>
        <td>{item.type}</td>
        <td>{item.subtype}</td>
        <td>{item.name}</td>
        <td>{item.weight}</td>
        <td>{item.shape}</td>
        <td>{item.price}</td>
        <td>{item.colour}</td>
        <td>{item.value}</td>
        <td>
          {item.image ? (
            <img
              src={URL.createObjectURL(item.image)}
              alt="item"
              style={{
                maxWidth: "50px",
                maxHeight: "50px",
              }}
            />
          ) : (
            "No Image"
          )}
        </td>
        <td>
          <button
            className="btn btn-danger btn-sm"
            onClick={() => handleInventoryItem(item.id)}
          >
            Delete
          </button>
        </td>
      </tr>
    ));
  };

  useEffect(() => {
    // Check if the user is already logged in
    const adminUsername = sessionStorage.getItem("admin-username");
    if (!adminUsername) {
      navigate("/adminlogin");
    }
  }, []);

  return (
    <div>
      {/* Navigation bar for smaller screens */}
      <nav
        className="navbar navbar-expand-lg navbar-light bg-light"
        style={{ marginTop: 0 }}
      >
        <div
          className="container d-flex justify-content-center align-items-center text-center"
          style={{ marginLeft: "auto", marginRight: "auto" }}
        >
          <h1
            className="admin-dashboard ms-4 ms-sm-3 mx-auto"
            style={{ maxWidth: "fit-content" }}
          >
            Admin Dashboard
          </h1>
          <div
            onClick={() => {
              navigate("/adminlogin");
            }}
            className="logout-button ms-auto"
          >
            <span className="d-none d-sm-inline">Logout </span>
            <FaSignOutAlt style={{ marginLeft: "8px", fontSize: "1rem" }} />
          </div>
        </div>
      </nav>

      {/* Main content */}
      <div
        className="container-fluid mt-3"
        style={{
          "@media (min-width: 768px) and (max-width: 1199px)": {
            marginLeft: "-75px",
          },
          "@media (min-width: 1200px)": { marginLeft: "-75px" },
        }}
      >
        <div className="row">
          <div className="col-md-4">
            <AdminSideNav />
          </div>
          <div
            className="col-md-8 order-md-2 ms-auto me-1"
            style={{
              width: "75%",
              "@media (minWidth: 1200px)": { width: "80%", margin: "4rem 0" },
            }}
          >
            <UploadForm onUpload={handleUpload} />

            <div
              className="card p-4 mb-4"
              style={{ boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)" }}
            >
              <h2 className="mb-4">Current Inventory</h2>
              <div className="table-responsive">
                <table className="table mt-3">
                  <thead>
                    <tr>
                      <th>Type</th>
                      <th>Subtype</th>
                      <th>Name</th>
                      <th>Weight</th>
                      <th>Shape</th>
                      <th>Price</th>
                      <th>Colour</th>
                      <th>Value</th>
                      <th>Image</th>
                      <th>Actions</th>
                    </tr>
                  </thead>

                  <tbody>{renderTableRows()}</tbody>
                </table>
              </div>
            </div>

            <div
              className="card p-4 mb-4"
              style={{ boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)" }}
            >
              <h2 className="mb-4">Inventory Chart</h2>
              <InventoryChart />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Inventory;
