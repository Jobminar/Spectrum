import { useState } from "react";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import Avatar from "react-avatar";
import { FaUser } from "react-icons/fa";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import Signup from "./Signup"; // Assuming you have a Signup component
import ForgotPassword from "./Forgotpassword";
import "./Login.css";
import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Swal from "sweetalert2";

const Login = ({ onLogin }) => {
  const navigate = useNavigate();
  const [loading,setLoading]=useState(false)
  const useD=JSON.parse(sessionStorage.getItem("userData"))
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [formData, setFormData] = useState({
    email: useD ? useD.email : "",
    Name: useD ? useD.username : "",
    Number: useD ? useD.whatsapp : "",
    Address: useD ? useD.address : "",
    Image:useD ? useD.image:"",
    Password:useD ? useD.password:""
  });

  const [showSignup, setShowSignup] = useState(false);
  const [userData, setUserData] = useState(null);
  const [showForgotPassword, setShowForgotPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };
  const handleChang = (e) => {
    const { name, value } = e.target;
    setForm((prevData) => ({ ...prevData, [name]: value }));
  };
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setFormData((prevData) => ({ ...prevData, imageBase64: reader.result }));
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };
  const handleSignupSuccess = (data) => {
    // Handle the signup success data if needed
    console.log("Signup Success Data:", data);

    // Close the signup form
    setShowSignup(false);
  };
  const handleSubmit = async (e) => {
    setLoading(true)
    e.preventDefault();
    try {
      console.log(formData,"formdata")
      console.log(form,"form")
      const response = await fetch("https://sgl-be.onrender.com/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Unknown error");
      }
      const responseData = await response.json();
      console.log(responseData,"response data")

      setUserData(responseData.user);
      console.log(userData,"userData")
      sessionStorage.setItem("userData", JSON.stringify(responseData.user));
      onLogin(responseData.user);
      navigate("/")
      console.log(responseData.user,"kjnafkl")
      console.log(userData)
      // alert("Login Successful")
      await Swal.fire({
        icon: "success",
        title: "Login successfully!",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      setLoading(false)
      console.error("Error:", error);
      navigate("/login")
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Give correct email and Password Details!",
      });
    }
  };

  const handleToggleForms = () => {
    setShowSignup(!showSignup);
    setShowForgotPassword(false);
  };

  const handleForgotPasswordClick = () => {
    setShowForgotPassword(true);
    setShowSignup(false);
  };

  // const useD=JSON.parse(sessionStorage.getItem("userData"))
  const logout=()=>{
    sessionStorage.removeItem("userData");
    Swal.fire({
      icon: "success",
      title: "Logged OUT",
      text: "Loged out.!",
    });
  }
  const handleEditClick = () => {
    setEditMode(true);
  };

  // const handleSaveClick = () => {
  //   setEditMode(false);
  //   // Handle save logic here
  //   // You might want to send updated user data to the server
  //   // or update it locally depending on your use case.
  // };
  const handleSaveClick = async () => {
    setLoading(true)
    try {
      // const hashedPassword = await bcrypt.hash(formData.Password, 10);
      console.log(formData,"FromData nee to send update")
      const response = await fetch(`https://sgl-be.onrender.com/updateUser/${useD._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: formData.Name,
          email: formData.email,
          whatsapp: formData.Number,
          imageBase64: formData.Image,  // You may need to handle profile image separately if needed
          address: formData.Address,
          password: formData.Password,  // You may need to handle password separately if needed
        }),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Unknown error");
      }
  
      const responseData = await response.json();
      console.log(responseData);
  
      // Handle any logic you need after the user details are successfully updated
  
      // You might want to update the local state or perform any other actions
  
      Swal.fire({
        icon: "success",
        title: "User details updated successfully!",
        showConfirmButton: false,
        timer: 1500,
      });
      sessionStorage.setItem("userData", JSON.stringify(responseData.user));
      
      // sessionStorage.setItem("userData",formData)
      setEditMode(false);
    } catch (error) {
      setLoading(false)
      console.error("Error updating user details:", error);
  
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Failed to update user details. Please try again!",
      });
    }
  };
  
  

  return (
    useD ? (<div className="container mt-5">
      <h1>Jogined</h1>
    <div className="card mx-auto" style={{ maxWidth: "1200px",margin:"20%" }}>
      <div className="card-body" >
        <div className="text-center mb-3">
          {userData?.profileImage ? (
            <Avatar
              name={useD.username}
              size="100"
              round
              src={userData.profileImage}
            />
          ) : (
            <FaUser size={100} style={{ color: "orange" }} />
          )}
        </div>
        <h2 className="card-title text-center mb-3">
          {useD ? `Welcome, ${useD.username}!` : "Login or Sign Up"}
        </h2>

        {showSignup || showForgotPassword ? (
          showForgotPassword ? (
            <ForgotPassword />
          ) : (
            <Signup onSignupSuccess={handleSignupSuccess} />
          )
        ) : (
          <form >
            <div className="mb-3">
              
              <TextField id="standard-basic" disabled value={formData.email} onChange={handleChange} name="email" style={{textAlign:"start",width:"250px"}} label="Email" variant="standard" />
            </div>
            
            <div className="mb-3">
            <TextField id="standard-basic" disabled={!editMode} style={{textAlign:"start",width:"250px"}} name="Name" type="text" value={formData.Name} onChange={handleChange} label="Name" variant="standard" />
              
            </div>
            <div className="mb-3">
            <TextField id="standard-basic" disabled={!editMode} style={{textAlign:"start",width:"250px"}} name="Number" type="text" value={formData.Number} onChange={handleChange} label="Number" variant="standard" />
              
            </div>
            <div className="mb-3">
            <TextField id="standard-basic" disabled={!editMode} style={{textAlign:"start",width:"250px"}} name="Address" type="text" value={formData.Address} onChange={handleChange} label="Address" variant="standard" />
              
            </div>
            <div className="mb-3">
            <TextField id="standard-basic" disabled={!editMode} style={{textAlign:"start",width:"250px"}} name="Password" type="text" value={formData.Password} onChange={handleChange} label="Password" variant="standard" />
              
            </div>
            <div className="mb-3">
        <div className="input-group" style={{width:"250px"}}>
            <label className="input-group-text" htmlFor="profileImage">
              Profile Image
            </label>
            <input
              type="file"
              accept="image/*"
              name="Image"
              disabled={!editMode}
              value={useD.Image}
              className="profileImage"
              id="profileImage"
              style={{ display: "none" }}
              onChange={handleImageChange}
            />
          </div>
        </div>
            <div style={{display:'flex'}}>
              <button type="button" disabled={editMode} onClick={handleEditClick} style={{width:"80px",paddingBottom:"30px"}} className="btn btn-primary btn-block mb-4">
                Edit
              </button>
              <button type="button" disabled={!editMode} onClick={handleSaveClick} style={{width:"80px",paddingBottom:"30px"}} className="btn btn-primary btn-block mb-4">
                {/* Save */}
                {loading ? "Wait...":"Save"}
              </button>
            </div>
            <button type="submit" style={{paddingBottom:"30px"}} className="btn btn-primary btn-block" onClick={logout}>
              Logout
            </button>
          </form>
        )}

        

        
      </div>
    </div>
  </div>) :(
    <div className="container mt-5">
      <div className="card mx-auto" style={{ maxWidth: "1200px",margin:"20%" }}>
        <div className="card-body" >
          <div className="text-center mb-3">
            {userData?.profileImage ? (
              <Avatar
                name={userData.username}
                size="100"
                round
                src={userData.profileImage}
              />
            ) : (
              <FaUser size={100} style={{ color: "orange" }} />
            )}
          </div>
          <h2 className="card-title text-center mb-3">
            {userData ? `Welcome, ${userData.username}!` : "Login or Sign Up"}
          </h2>

          {showSignup || showForgotPassword ? (
            showForgotPassword ? (
              <ForgotPassword />
            ) : (
              <Signup onSignupSuccess={handleSignupSuccess} />
            )
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <TextField id="standard-basic" value={form.email} onChange={handleChang} name="email" style={{textAlign:"start",width:"250px"}} label="Email" variant="standard" />
              </div>
              
              <div className="mb-3">
              <TextField id="standard-basic" style={{textAlign:"start",width:"250px"}} name="password" type="password" value={form.password} onChange={handleChang} label="Password" variant="standard" />
              </div>
              <button type="submit" style={{paddingBottom:"30px"}} className="btn btn-primary btn-block">
                {/* {showSignup ? "Sign Up" : "Login"} */}
                {loading? "Please Wait":"Login"}
              </button>
            </form>
          )}

          {!showForgotPassword && (
            <div className="d-grid mx-auto" style={{ width: "80%" }}>
              <button
                type="button"
                className={`btn btn-secondary  mt-3 ${
                  showSignup ? "btn-back" : "btn-create"
                }`}
                onClick={handleToggleForms}
              >
                {showSignup ? "Back to Login" : "Create an Account"}
              </button>
            </div>
          )}

          {!showSignup && !showForgotPassword && (
            <div className="text-center mt-3">
              <button
                type="button"
                className="btn btn-link"
                onClick={handleForgotPasswordClick}
              >
                Forgot Password?
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
    )
  );
};

Login.propTypes = {
  onLogin: PropTypes.func.isRequired,
};

export default Login;
