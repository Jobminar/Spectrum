import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaEye, FaEyeSlash, FaHome } from "react-icons/fa"; // Import eye and home icons
import "./LoginForm.css";

const AdminLoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // New state for password visibility
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // Check if the username and password are correct
    if (username === "admin" && password === "password") {
      navigate("/admin/adminhome");
      sessionStorage.setItem("admin-username",username)
    } else {
      // Handle incorrect username or password
      alert("Invalid username or password");
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  useEffect(() => {
    // Check if the user is already logged in
    const adminUsername = sessionStorage.getItem("admin-username");
    if (adminUsername) {
      navigate("/admin/adminhome");
    }
  }, []);

  return (
    <div className="login-form-card">
      <Link to="/" className="home-icon m-1">
        <FaHome
          style={{ color: "#FFA500", fontSize: "1.5em", margin: "auto" }}
        />
      </Link>
      <div className="image-box">
        <div className="image-container"></div>
      </div>
      <div className="login-form-container">
        <div className="login-form-container smart-card">
          <h1 style={{ color: "#FFA500" }}>Admin Login</h1>
          <form onSubmit={handleLogin}>
            <label>
              Username:
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your username"
                required
              />
            </label>
            <label style={{ display: "flex", alignItems: "center" }}>
              Password:
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
                style={{ marginRight: "1px", marginLeft: "2px" }}
              />
              {/* <button
                className="toggle-password-icon bg-white"
                onClick={togglePasswordVisibility}
                style={{
                  fontSize: "1em",
                  padding: "0",
                  width: "5%",
                  height: "75%",
                  cursor: "pointer",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  marginBottom: "15px",
                  border: "1px solid #ccc",
                  borderRadius: "0 5px 5px 0",
                }}
              >
                {showPassword ? (
                  <FaEyeSlash style={{ fontSize: "0.8em" }} />
                ) : (
                  <FaEye style={{ fontSize: "0.8em" }} />
                )}
              </button> */}
            </label>
            <button
              type="submit"
              style={{ background: "#FFA500", color: "#fff" }}
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminLoginForm;
