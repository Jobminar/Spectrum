import React, { useEffect, useState } from "react";
import "./gems.css";
import Swal from "sweetalert2";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from "react-router-dom";

const Jewellary = () => {
  const navigate =useNavigate()
  const [data, setData] = useState({
    name: "",
    subtype: "Rings",
    price: "22",
    weight: "",
    units: "Carat",
    shape: "",
    colour: "",
    description: "",
    dimensions: "",
    // transparency: "",
    // hardness: "",
    // microscopicexamination: "",
    image1: null,
    image2:null
  });

  const [inventoryData, setInventoryData] = useState([]);

  useEffect(() => {
    const fetchInventory = async () => {
      try {
        const response = await fetch("https://sgl-be.onrender.com/getloosedimonds");
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
  useEffect(() => {
    // Check if the user is already logged in
    const adminUsername = sessionStorage.getItem("admin-username");
    if (!adminUsername) {
      navigate("/adminlogin");
    }
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
      image1: selectedImage,
    }));
  };
  const handleImageChange2 = (e) => {
    const selectedImage = e.target.files[0];
    setData((prevData) => ({
      ...prevData,
      image2: selectedImage,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("subtype", data.subtype);
      formData.append("name", data.name);
      formData.append("weight", data.weight);
      formData.append("units", data.units);
      formData.append("shape", data.shape);
      formData.append("price", data.price);
      formData.append("colour", data.colour);
      formData.append("description", data.description);
      formData.append("dimensions", data.dimensions);
      // formData.append("transparency", data.transparency);
      // formData.append("hardness", data.hardness);
      // formData.append("microscopicexamination", data.microscopicexamination);
      formData.append("image1", data.image1);
      formData.append("image2",data.image2)

      // Assuming 'inventoryData' is an array to store the form data
      setInventoryData([...inventoryData, data]);

      const response = await fetch("https://sgl-be.onrender.com/postloosediamonds", {
        method: "POST",
        body: formData, 
      });

      if (response.ok) {
        console.log("Form submitted successfully!");
        // Clear the form after submission
        alert("Successfully added the data");
        setData({
          name: "",
          subtype: "Rings",
          price: "22",
          weight: "",
          units: "Carat",
          shape: "",
          colour: "",
          description: "",
          dimensions: "",
          // transparency: "",
          // hardness: "",
          // microscopicexamination: "",
          image1: null,
          image2: null,
        });
        await Swal.fire({
          icon: "success",
          title: "Item added successfully!",
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        
        console.error("Form submission failed. Status:", response.status);
        throw new Error("Item addition failed")
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

  // const handleDelete = (index) => {
  //   const updatedInventory = [...inventoryData];
  //   updatedInventory.splice(index, 1);
  //   setInventoryData(updatedInventory);
  // };
  const handleDelete = async (id, index) => {
    try {
      const response = await fetch(`https://sgl-be.onrender.com/deletegemjewellary/${id}`, {
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
        <td>{item.subtype}</td>
        <td>{item.weight}</td>
        <td>{item.shape}</td>
        <td>{item.price}</td>
        <td>{item.colour}</td>
        <td>{item.description}</td>
        <td>{item.dimensions}</td>
        {/* <td>{item.transparency}</td> */}
        {/* <td>{item.hardness}</td> */}
        {/* <td>{item.microscopicexamination}</td> */}
        <td>
          {item.image1 ? (
            <img
              src={`data:image/png;base64,${item.image1}`}
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
          {item.image2 ? (
            <img
              src={`data:image/png;base64,${item.image2}`}
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
            onClick={() => handleDelete(item._id,index)}
          >
            Delete
          </button>
        </td>
      </tr>
    ));
  };

  return (
    <div>
      <ArrowBackIcon onClick={()=>navigate("/admin/inventoryitem")} style={{width:"100px",height:"50px",marginTop:"10px"}} />
            <center>
      <form className="form-123" style={{ boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)" }}>
        <div className="card-123" style={{ boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)" }}>
        <h2 style={{borderBottom:"2px",borderStyle:"solid",borderColor:"gold",borderTop:"none",borderRight:"none",borderLeft:"none"}}>Gem Jewelry Inventory</h2>
        <label htmlFor="name" className="form-label mb-0"> Name</label>
          <input
            type="text"
            name="name"
            value={data.name}
            onChange={handleChange}
            className="input"
            placeholder="Name"
          />
          <label htmlFor="subtype" className="form-label mb-0 mt-2"> Subtype</label>

          <select
            style={{ width: "100%", height: "45px", borderRadius: "5px" }}
            name="subtype"
            value={data.subtype}
            onChange={handleChange}
          >
            <option value="Rings">Rings</option>
            <option value="Pendants">Pendants</option>
            <option value="Nosepin">Nosepin</option>
            <option value="Earings">Earings</option>
            {/* <option value="Earings">Precious</option> */}
            <option value="Gold">Gold</option>
            <option value="Plantinum">Plantinum</option>
            <option value="Silver">Silver</option>
          </select>
          <label htmlFor="subtype" className="form-label mb-0 mt-2"> Weight</label>

          <input
            type="text"
            placeholder="Weight"
            name="weight"
            value={data.weight}
            onChange={handleChange}
            className="input"
          />
          <label htmlFor="subtype" className="form-label mb-0 mt-2"> Units</label>

          <select
            style={{ width: "100%", height: "45px", borderRadius: "5px" }}
            name="units"
            value={data.units}
            onChange={handleChange}
          >
            <option value="Carat">Carat (metric; 1 carat=0.2gm)</option>
          </select>
          <label htmlFor="subtype" className="form-label mb-0 mt-2"> Shape</label>

          <input
            type="text"
            name="shape"
            value={data.shape}
            onChange={handleChange}
            className="input"
            placeholder="Shape"
          />
          {/* <label htmlFor="subtype" className="form-label mb-0 mt-2"> Price</label>

          <input
            type="number"
            name="price"
            value={data.price}
            onChange={handleChange}
            className="input"
            placeholder="Price"
          /> */}
          <label htmlFor="subtype" className="form-label mb-0 mt-2"> Colour</label>

          <input
            type="text"
            name="colour"
            value={data.colour}
            onChange={handleChange}
            className="input"
            placeholder="Colour"
          />
          <label htmlFor="subtype" className="form-label mb-0 mt-2"> Description</label>

          <input
            type="text"
            name="description"
            value={data.description}
            onChange={handleChange}
            className="input"
            placeholder="Value"
          />
          <label htmlFor="subtype" className="form-label mb-0 mt-2"> dimensions</label>

          <input
            type="text"
            name="dimensions"
            value={data.dimensions}
            onChange={handleChange}
            className="input"
            placeholder="dimensions"
          />
                              {/* <label htmlFor="subtype" className="form-label mb-0 mt-2"> Transperency</label>

          <input
            type="text"
            name="transparency"
            value={data.transparency}
            onChange={handleChange}
            className="input"
            placeholder="Transparency"
          /> */}
                              {/* <label htmlFor="subtype" className="form-label mb-0 mt-2"> Hardness</label>

          <input
            type="number"
            name="hardness"
            value={data.hardness}
            onChange={handleChange}
            className="input"
            placeholder="Hardness"
          /> */}
          {/* <label htmlFor="subtype" className="form-label mb-0 mt-2"> Microscopical Examination</label>

          <input
            type="text"
            name="microscopicexamination"
            value={data.microscopicexamination}
            onChange={handleChange}
            className="input"
            placeholder="Microscopic Examination"
          /> */}

          {/* <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
          /> */}
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
          <div className="input-group">
            <label className="input-group-text" htmlFor="fileInput2">
              Certificate
            </label>
            <input
              type="file"
              accept="image/*"
              className="form-control"
              id="fileInput2"
              style={{ display: "none" }}
              onChange={handleImageChange2}
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
        <h2 className="mb-2">Current Inventory</h2>
        <div className="table-responsive" style={{ boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",borderRadius:"7px" }}>
          <table className="table mt-3">
            <thead>
              <tr>
                <th>Name</th>
                <th>Subtype</th>
                <th>Weight</th>
                <th>Shape</th>
                <th>Price</th>
                <th>Colour</th>
                <th>Description</th>
                <th>dimensions</th>
                {/* <th>Transparency</th> */}
                {/* <th>Hardness</th> */}
                {/* <th>Microscopic Examination</th> */}
                <th>Image</th>
                <th>Certificate</th>
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

export default Jewellary;
