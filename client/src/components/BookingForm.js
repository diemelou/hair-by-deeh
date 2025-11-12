import React, { useState } from "react";
import { createBooking } from "../utils/api";

export default function BookingForm() {
  const [form, setForm] = useState({ name: "", email: "", date: "", deposit: 20 });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createBooking(form);
    alert("Booking requested! You’ll receive confirmation soon.");
  };

  return (
    <form className="booking-form" onSubmit={handleSubmit}>
      <input placeholder="Name" onChange={e => setForm({ ...form, name: e.target.value })} />
      <input placeholder="Email" onChange={e => setForm({ ...form, email: e.target.value })} />
      <input type="date" onChange={e => setForm({ ...form, date: e.target.value })} />
      <input
        type="number"
        placeholder="Deposit Amount"
        value={form.deposit}
        onChange={e => setForm({ ...form, deposit: e.target.value })}
      />
      <button type="submit">Book Now</button>
    </form>
  );
}
