import React, { useState } from "react";
import { FaComments, FaShoppingCart, FaList, FaBox } from "react-icons/fa";
import { NavLink } from "react-router-dom";

const AdminSideNav = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const navigationItems = [
    {
      path: "/admin/inventory", // Adjusted path to be relative to /admin
      name: "Inventory",
      icon: <FaShoppingCart />,
    },
    {
      path: "/admin/blogs", // Adjusted path to be relative to /admin
      name: "Blogs",
      icon: <FaList />,
    },
    {
      path: "/admin/orders", // Adjusted path to be relative to /admin
      name: "Orders",
      icon: <FaBox />,
    },
    {
      path: "/admin/queries", // Adjusted path to be relative to /admin
      name: "Queries",
      icon: <FaComments />,
    },
  ];

  return (
    <div
      style={{
        position: "fixed",
        left: 0,
        top: 0,
        height: "100vh",
        width: isMobileMenuOpen ? "200px" : "50px", // Adjust width based on menu state
        backgroundColor: "#FFA500",
        zIndex: 1000,
        display: "flex",
        flexDirection: "column",
        transition: "width 0.3s ease", // Add transition for smoother animation
      }}
    >
      <div className="top_section">
        <div
          style={{
            display: "flex",
            justifyContent: isMobileMenuOpen ? "space-between" : "center",
            alignItems: "center",
            padding: "10px",
            cursor: "pointer",
          }}
          onClick={toggleMobileMenu}
        >
          {/* Hamburger icon */}
          <div
            style={{
              display: isMobileMenuOpen ? "none" : "block",
            }}
          >
            ☰
          </div>
          {/* Close icon */}
          <div
            style={{
              display: isMobileMenuOpen ? "block" : "none",
            }}
          >
            ✕
          </div>
        </div>
        {navigationItems.map((item, index) => (
          <NavLink
            key={index}
            to={item.path}
            className="link"
            style={{
              textAlign: "center",
              textDecoration: "none",
              color: "#fff",
              display: isMobileMenuOpen ? "flex" : "none",
              alignItems: "center",
              fontSize: "1.5rem",
              marginBottom: "0",
              border: "1px solid black",
              padding: "35px",
            }}
          >
            <div className="icon" style={{ marginRight: "10px" }}>
              {item.icon}
            </div>
            <div>{item.name}</div>
          </NavLink>
        ))}
      </div>
      {/* Empty div to fill the remaining space */}
      <div style={{ flex: 1 }}></div>
    </div>
  );
};

export default AdminSideNav;
