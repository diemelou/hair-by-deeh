import React from "react";
import Navbar from "./components/Navbar";
import BookingForm from "./components/BookingForm";
import CalendarView from "./components/CalendarView";
import "./styles/style.css";

function App() {
  return (
    <div className="app">
      <Navbar />
      <h1>Hair by Deeh</h1>
      <BookingForm />
      <CalendarView />
    </div>
  );
}

export default App;
