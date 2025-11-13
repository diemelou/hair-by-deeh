import React from "react";
import Navbar from "./components/Navbar";
import BookingForm from "./components/BookingForm";
import "./styles/style.css";

function App() {
  return (
    <div className="app">
      <Navbar />
      <h1>Hair by Deeh</h1>
      <BookingForm />
    </div>
  );
}

export default App;
