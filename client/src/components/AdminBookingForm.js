import React, { useState } from "react";

export default function AdminBookingForm() {
  const [form, setForm] = useState({ name: "", email: "", date: "", deposit: 20, status: "approved" });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const token = localStorage.getItem("adminToken");
      const res = await fetch("/api/bookings/manual/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(form)
      });

      if (!res.ok) throw new Error("Failed to create booking");
      
      setMessage("Booking created successfully!");
      setForm({ name: "", email: "", date: "", deposit: 20, status: "approved" });
      setTimeout(() => setMessage(""), 3000);
    } catch (err) {
      setMessage(`Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-booking-form">
      <h3>Manually Add Booking</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Client Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />
        <input
          type="email"
          placeholder="Client Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
        />
        <input
          type="date"
          value={form.date}
          onChange={(e) => setForm({ ...form, date: e.target.value })}
          required
        />
        <input
          type="number"
          placeholder="Deposit Amount"
          value={form.deposit}
          onChange={(e) => setForm({ ...form, deposit: parseFloat(e.target.value) })}
          required
        />
        <select
          value={form.status}
          onChange={(e) => setForm({ ...form, status: e.target.value })}
        >
          <option value="pending">Pending</option>
          <option value="approved">Approved (send confirmation email)</option>
          <option value="rejected">Rejected</option>
        </select>
        <button type="submit" disabled={loading}>
          {loading ? "Creating..." : "Add Booking"}
        </button>
      </form>
      {message && <p className={message.includes("Error") ? "error" : "success"}>{message}</p>}
    </div>
  );
}
