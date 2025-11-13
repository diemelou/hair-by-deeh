import React from "react";
import { Link } from "react-router-dom";

export default function Navbar({ isAdmin, setIsAdmin }) {
  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminEmail");
    setIsAdmin(false);
  };

  return (
    <nav className="navbar">
      <h2>Hair by Deeh</h2>
      <div className="nav-links">
        {isAdmin ? (
          <>
            <Link to="/admin">Dashboard</Link>
            <button onClick={handleLogout} className="logout-btn">Logout</button>
          </>
        ) : (
          <Link to="/admin-login">Admin Login</Link>
        )}
      </div>
    </nav>
  );
}
