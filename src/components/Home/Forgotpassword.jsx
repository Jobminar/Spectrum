import { useState } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TextField from '@mui/material/TextField';
import axios from "axios";
import Swal from "sweetalert2";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [whatsapp, setWhatsapp] = useState('');

  const handleBackToLogin = () => {
    window.location.href = "/login";
  };

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
  
    try {
      const response = await axios.post('https://sgl-be.onrender.com/forgot-password', {
        email,
        whatsapp,
        newPassword,
      });
  
      if (response.status === 200) {
        // setLoading(false);
        toast.success("Password reset successful!");
        // Optionally, you can redirect the user to the login page after successful reset
        window.location.href = "/login";
        await Swal.fire({
          icon: "success",
          title: "Password Reset successfully!",
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        // setLoading(false)
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Give correct email and whatsapp number Details!",
        });
        // toast.error("Password reset failed. Please try again.");
      }
    } catch (error) {
      // setLoading(false)
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Give correct email and whatsapp number Details!",
      });
      console.error("Error:", error);
      // toast.error("Password reset failed. Please try again.");
    }finally{
      setLoading(false); 
    }
  };
  
  return (
    <div className="container mt-5 m-auto" style={{ maxWidth: "20rem" }}>
      <div className="card mx-auto" style={{ maxWidth: "500px" }}>
        <div className="card-body">
          <h2 className="card-title text-center mb-4">Forgot Password</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <TextField
                id="standard-basic"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{ textAlign: "start", width: "250px" }}
                label="Email"
                variant="standard"
              />
            </div>
            <div className="mb-3">
              <TextField
                id="standard-basic"
                type="text"
                value={whatsapp}
                onChange={(e) => setWhatsapp(e.target.value)}
                style={{ textAlign: "start", width: "250px" }}
                label="Whatsapp Number"
                variant="standard"
              />
            </div>
            <div className="mb-3">
              <TextField
                id="standard-basic"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                style={{ textAlign: "start", width: "250px" }}
                label="New Password"
                variant="standard"
              />
            </div>
            <button type="submit" style={{paddingBottom:"30px",margin:"20px"}} className="btn btn-primary btn-block">
             {loading ? "Please Wait":"Reset Password"} 
            </button>
          </form>
          <Link to="/login" onClick={handleBackToLogin}>
            Back to Login
          </Link>
        </div>
      </div>
      <ToastContainer
        position={
          window.location.hash.includes("/login")
            ? "bottom-right"
            : "bottom-left"
        }
        autoClose={3000}
      />
    </div>
  );
};

export default ForgotPassword;
