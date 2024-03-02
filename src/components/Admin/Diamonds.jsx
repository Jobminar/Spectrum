import React, { useState, useEffect } from "react";
import "./gems.css";
import Swal from "sweetalert2";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from "react-router-dom";

const Diamonds = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    name: "",
    price: "",
    weight: "",
    colour: "",
    units: "",
    value: "",
    shape: "",
    size: "",
    clarity: "",
    dimensions: "",
    transparency: "",
    hardness: "",
    microscopicexamination: "",
    image: null,
  });

  const [inventoryData, setInventoryData] = useState([]);
  useEffect(() => {
    // Check if the user is already logged in
    const adminUsername = sessionStorage.getItem("admin-username");
    if (!adminUsername) {
      navigate("/adminlogin");
    }
  }, []);

  useEffect(() => {
    const fetchInventory = async () => {
      try {
        const response = await fetch("https://sgl-be.onrender.com/getdiamonds");
        if (response.ok) {
          const inventory = await response.json();
          setInventoryData(inventory);
        } else {
          console.error("Failed to fetch inventory. Status:", response.status);
        }
      } catch (error) {
        console.error("An error occurred during fetch:", error);
      }
    };

    fetchInventory();
  }, []); 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    setData((prevData) => ({
      ...prevData,
      image: selectedImage,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      for (const key in data) {
        formData.append(key, data[key]);
      }

      const response = await fetch("https://sgl-be.onrender.com/postdiamonds", {
        method: "POST",
        body: formData,
      });
      console.log(formData)

      if (response.ok) {
        console.log("Form submitted successfully!");
        alert("Successfully added the data");
        setData({
          name: "",
          price: "",
          weight: "",
          colour: "",
          units: "",
          value: "",
          shape: "",
          size: "",
          clarity: "",
          dimensions: "",
          transparency: "",
          hardness: "",
          microscopicexamination: "",
          image: null,
        });
        await Swal.fire({
          icon: "success",
          title: "Item added successfully!",
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        console.error("Form submission failed. Status:", response.status);
        throw new Error("Item addition failed");
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
      });
      console.error("An error occurred during form submission:", error);
    }
  };

  const handleDelete = async (id, index) => {
    try {
      const response = await fetch(`https://sgl-be.onrender.com/deletediamonds/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        console.log("Item deleted successfully!");
        const updatedInventory = [...inventoryData];
        updatedInventory.splice(index, 1);
        setInventoryData(updatedInventory);
        await Swal.fire({
          icon: "success",
          title: "Item deleted successfully!",
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        console.error("Item deletion failed. Status:", response.status);
        throw new Error("Item deletion failed");
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
      });
      console.error("An error occurred during item deletion:", error);
    }
  };

  const renderTableRows = () => {
    return inventoryData.map((item, index) => (
      <tr key={index}>
        <td>{item.name}</td>
        <td>{item.weight}</td>
        <td>{item.shape}</td>
        <td>{item.price}</td>
        <td>{item.colour}</td>
        <td>{item.value}</td>
        <td>{item.dimensions}</td>
        <td>{item.transparency}</td>
        <td>{item.hardness}</td>
        <td>{item.microscopicexamination}</td>
        <td>
          {item.image ? (
            <img
              src={`data:image/png;base64,${item.image}`} // Use the image URL directly
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
            onClick={() => handleDelete(item._id, index)}
          >
            Delete
          </button>
        </td>
      </tr>
    ));
  };
  const da=inventoryData.slice(-1)[0]
  console.log(da,"lat")  

  return (
    <div>
      <ArrowBackIcon onClick={() => navigate("/admin/inventoryitem")} style={{ width: "100px", height: "50px", marginTop: "10px" }} />
      <center>
        <form className="form-123" style={{ boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)" }}>
          <div className="card-123" style={{ boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)" }}>
            <h2 style={{borderBottom:"2px",borderStyle:"solid",borderColor:"gold",borderTop:"none",borderRight:"none",borderLeft:"none"}}>Dimonds Inventory</h2>
        <label htmlFor="name" className="form-label mb-0"> Name</label>
          <input
            type="text"
            name="name"
            value={data.name}
            onChange={handleChange}
            placeholder="Name"
          />
                    <label htmlFor="subtype" className="form-label mb-0 mt-2"> Price</label>

          <input
            type="text"
            name="price"
            value={data.price}
            onChange={handleChange}
            placeholder="Price"
          />
                    <label htmlFor="subtype" className="form-label mb-0 mt-2"> Weight</label>

          <input
            type="text"
            name="weight"
            value={data.weight}
            onChange={handleChange}
            placeholder="Weight"
          />
                    <label htmlFor="subtype" className="form-label mb-0 mt-2"> Colour</label>

          <input
            type="text"
            name="colour"
            value={data.colour}
            onChange={handleChange}
            placeholder="Colour"
          />
                    <label htmlFor="subtype" className="form-label mb-0 mt-2"> Units</label>

          <input
            type="text"
            name="units"
            value={data.units}
            onChange={handleChange}
            placeholder="Units"
          />
                    <label htmlFor="subtype" className="form-label mb-0 mt-2"> Value</label>

          <input
            type="text"
            name="value"
            value={data.value}
            onChange={handleChange}
            placeholder="Value"
          />
                    <label htmlFor="subtype" className="form-label mb-0 mt-2"> Shape</label>

          <input
            type="text"
            name="shape"
            value={data.shape}
            onChange={handleChange}
            placeholder="Shape"
          />
                    <label htmlFor="subtype" className="form-label mb-0 mt-2"> Size</label>

          <input
            type="text"
            name="size"
            value={data.size}
            onChange={handleChange}
            placeholder="Size"
          />
                    <label htmlFor="subtype" className="form-label mb-0 mt-2"> Clarity</label>

          <input
            type="text"
            name="clarity"
            value={data.clarity}
            onChange={handleChange}
            placeholder="Clarity"
          />
                    <label htmlFor="subtype" className="form-label mb-0 mt-2"> dimensions</label>

          <input
            type="text"
            name="dimensions"
            value={data.dimensions}
            onChange={handleChange}
            placeholder="dimensions"
          />
                    <label htmlFor="subtype" className="form-label mb-0 mt-2"> Transperency</label>

          <input
            type="text"
            name="transparency"
            value={data.transparency}
            onChange={handleChange}
            placeholder="Transparency"
          />
                    <label htmlFor="subtype" className="form-label mb-0 mt-2"> Hardness</label>

         <input
          type="number"
           name="hardness"
           value={data.hardness}
            onChange={handleChange}
            placeholder="Hardness"
          />
          <label htmlFor="subtype" className="form-label mb-0 mt-2"> Microscopic Examination</label>

          <input
            type="text"
            name="microscopicexamination"
            value={data.microscopicexamination}
            onChange={handleChange}
            placeholder="Microscopic Examination"
          />
          {/* <input type="file" onChange={handleImageChange} /> */}
          <label htmlFor="weight" className="form-label mb-0 mt-4"> Upload File</label>
          <div className="input-group">
            <label className="input-group-text" htmlFor="fileInput">
              Choose File
            </label>
            <input
              type="file"
              accept="image/*"
              className="form-control"
              id="fileInput"
              style={{ display: "none" }}
              onChange={handleImageChange}
            />
          </div>

            <button
              type="submit"
              style={{ backgroundColor:"rgba(244, 130, 31, 1)", color: "white" }}
              onClick={handleSubmit}
            >
              Submit
            </button>
          </div>
        </form>
      </center>


      <div className="card  p-4 mb-4 mt-3" style={{ boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)" }}>
        <h2 className="mb-2">All Inventory</h2>
        <div className="table-responsive" style={{ boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)", borderRadius: "7px" }}>
          <table className="table mt-3">
            <thead>
              <tr>
                <th>Name</th>
                <th>Weight</th>
                <th>Shape</th>
                <th>Price</th>
                <th>Colour</th>
                <th>Value</th>
                <th>dimensions</th>
                <th>Transparency</th>
                <th>Hardness</th>
                <th>Microscopic Examination</th>
                <th>Image</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>{renderTableRows()}</tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Diamonds;
