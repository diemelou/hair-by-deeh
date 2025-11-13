import React, { useState, useEffect } from "react";
import CalendarView from "../components/CalendarView";

export default function AdminDashboard() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    const storedEmail = localStorage.getItem("adminEmail");
    if (token) {
      setIsLoggedIn(true);
      setEmail(storedEmail);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminEmail");
    setIsLoggedIn(false);
    window.location.href = "/";
  };

  if (!isLoggedIn) {
    return <div className="admin-dashboard"><p>Redirecting to login...</p></div>;
  }

  return (
    <div className="admin-dashboard">
      <div className="admin-header">
        <h1>Admin Dashboard</h1>
        <p>Welcome, {email}</p>
        <button onClick={handleLogout} className="logout-btn">Logout</button>
      </div>
      <CalendarView />
    </div>
  );
}
