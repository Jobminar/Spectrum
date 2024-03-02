import { Navbar, Nav } from "react-bootstrap";
import { FaSignOutAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const MobileNavbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Implement your logout logic here
    // For example, clearing authentication tokens, etc.
    navigate("/admin-login");
  };

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Navbar.Brand href="#home">Admin Panel</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="ml-auto">
          <Nav.Link href="#home">Home</Nav.Link>
          <Nav.Link href="#blogs">Blogs</Nav.Link>
          <Nav.Link href="#users">Users</Nav.Link>
          <Nav.Link href="#settings">Settings</Nav.Link>
          <Nav.Link onClick={handleLogout}>
            Logout <FaSignOutAlt style={{ marginLeft: "5px" }} />
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default MobileNavbar;
