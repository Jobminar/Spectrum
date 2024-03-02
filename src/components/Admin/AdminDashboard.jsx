// AdminTemplate.jsx
import React, { useEffect } from "react";
import { Outlet, Route, Routes, Navigate, useNavigate } from "react-router-dom";
import Inventory from './Inventoryall'
import Blogs from "./Blogs";
import Orders from "./Orders";
import Gems from "./Gems";
import Beads from "./Beads";
import Pearls from "./Pearls";
import Corals from "./Corals";
import Jewellary from "./Jewellary";
import Diamonds from "./Diamonds";
import Adminhome from "../Adminhome/Adminhome";
import Inventoryitem from "../Inventoryitem/Inventoryitem"
import Austrology from "./Austrology"
import Gemsjewelry from "./Gemsjewlry"
import Quires from "./Queries.jsx"

const AdminTemplate = () => {
  const navigate = useNavigate();
  const isLoggedIn = true; // Replace with your authentication logic

  useEffect(() => {
    // If the user is not logged in, redirect to /admin-login
    if (!isLoggedIn) {
      navigate("/admin-login");
    }
  }, [isLoggedIn, navigate]);

  return (
    <div className="admin-container">
      {/* Handle unauthorized access */}
      <Routes>
        <Route
          path="/"
          element={
            isLoggedIn ? (
              <Outlet />
            ) : (
              // Redirect to /admin-login if not logged in
              <Navigate to="/admin-login" />
            )
          }
        >
          <Route path="*" element={<Quires/>}/>
          <Route path="/inventory" element={<Inventory />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/admingems" element={<Gems />} />
          <Route path="/beads" element={<Beads />} />
          <Route path="/pearls" element={<Pearls />} />
          <Route path="/corals" element={<Corals />} />
          <Route path="/Diamondsjewelry" element={<Jewellary />} />
          <Route path="/austrology" element={<Austrology />} />
          <Route path="/Loosediamonds" element={<Gemsjewelry />} />
          <Route path="/diamonds" element={<Diamonds />} />
        <Route path="/beadss" element={<Beads />} />
        <Route path="/adminhome" element={<Adminhome />} />
        <Route path="/inventoryitem" element={<Inventoryitem />} />
        </Route>
      </Routes>
    </div>
  );
};

export default AdminTemplate;
