import React, { useState, useEffect } from "react";
import CalendarView from "../components/CalendarView";
import AdminBookingForm from "../components/AdminBookingForm";
import BookingsList from "../components/BookingsList";

export default function AdminDashboard() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  const [refreshKey, setRefreshKey] = useState(0);

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

  const refreshBookings = () => {
    setRefreshKey((prev) => prev + 1);
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
      <div className="admin-content">
        <CalendarView key={refreshKey} />
        <AdminBookingForm />
        <BookingsList key={refreshKey} />
      </div>
    </div>
  );
}
