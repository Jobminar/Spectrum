import React from 'react';

const Logout = ({ onLogout }) => {
  const handleLogout = () => {
    // Perform any necessary cleanup or additional actions before logging out

    // Call the provided onLogout function to handle the logout action
    onLogout();
  };

  return (
    <div>
      <h2>Logout</h2>
      <p>Are you sure you want to logout?</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Logout;
