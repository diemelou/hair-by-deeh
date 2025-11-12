import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  name: String,
  email: String,
  date: Date,
  deposit: Number,
  status: { type: String, default: "pending" }
});

export default mongoose.model("Booking", bookingSchema);
