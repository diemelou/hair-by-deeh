import React, { useState, useEffect } from "react";

export default function BookingsList() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/bookings");
      const data = await res.json();
      setBookings(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Failed to fetch bookings:", err);
    }
    setLoading(false);
  };

  const handleApprove = async (id) => {
    try {
      const token = localStorage.getItem("adminToken");
      const res = await fetch(`/api/bookings/${id}/approve`, {
        method: "POST",
        headers: { "Authorization": `Bearer ${token}` }
      });
      if (res.ok) {
        fetchBookings();
        alert("Booking approved and confirmation email sent!");
      }
    } catch (err) {
      alert("Error approving booking: " + err.message);
    }
  };

  const handleReject = async (id) => {
    try {
      const token = localStorage.getItem("adminToken");
      const res = await fetch(`/api/bookings/${id}/reject`, {
        method: "POST",
        headers: { "Authorization": `Bearer ${token}` }
      });
      if (res.ok) {
        fetchBookings();
        alert("Booking rejected");
      }
    } catch (err) {
      alert("Error rejecting booking: " + err.message);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "approved":
        return "#93e9be";
      case "rejected":
        return "#e74c3c";
      default:
        return "#f39c12";
    }
  };

  if (loading) return <p>Loading bookings...</p>;

  return (
    <div className="bookings-list">
      <h3>Booking Requests</h3>
      {bookings.length === 0 ? (
        <p>No bookings yet.</p>
      ) : (
        <table className="bookings-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Date</th>
              <th>Deposit</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr key={booking._id}>
                <td>{booking.name}</td>
                <td>{booking.email}</td>
                <td>{new Date(booking.date).toLocaleDateString()}</td>
                <td>${booking.deposit}</td>
                <td>
                  <span style={{ color: getStatusColor(booking.status), fontWeight: "bold" }}>
                    {booking.status.toUpperCase()}
                  </span>
                </td>
                <td>
                  {booking.status === "pending" ? (
                    <>
                      <button
                        className="approve-btn"
                        onClick={() => handleApprove(booking._id)}
                      >
                        Approve
                      </button>
                      <button
                        className="reject-btn"
                        onClick={() => handleReject(booking._id)}
                      >
                        Reject
                      </button>
                    </>
                  ) : (
                    <span>—</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
