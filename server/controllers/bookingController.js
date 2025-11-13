import Booking from "../models/Booking.js";
import { sendBookingConfirmation, sendBookingApprovalNotification } from "../services/emailService.js";

export const createBooking = async (req, res) => {
  try {
    const booking = await Booking.create(req.body);
    // Send admin notification
    await sendBookingApprovalNotification(booking);
    res.json(booking);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find();
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const approveBooking = async (req, res) => {
  try {
    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status: "approved" },
      { new: true }
    );
    if (!booking) return res.status(404).json({ error: "Booking not found" });

    // Send confirmation email to client
    await sendBookingConfirmation(booking);
    res.json({ message: "Booking approved and confirmation email sent", booking });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const rejectBooking = async (req, res) => {
  try {
    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status: "rejected" },
      { new: true }
    );
    if (!booking) return res.status(404).json({ error: "Booking not found" });
    res.json({ message: "Booking rejected", booking });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const createManualBooking = async (req, res) => {
  try {
    const booking = await Booking.create({
      ...req.body,
      status: req.body.status || "approved"
    });
    // Send confirmation email if approved
    if (booking.status === "approved") {
      await sendBookingConfirmation(booking);
    }
    res.json(booking);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
