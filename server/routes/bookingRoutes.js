import express from "express";
import { 
  createBooking, 
  getAllBookings, 
  approveBooking, 
  rejectBooking, 
  createManualBooking 
} from "../controllers/bookingController.js";
import { authMiddleware } from "../middleware/auth.js";

const router = express.Router();

router.post("/", createBooking);
router.get("/", getAllBookings);
router.post("/:id/approve", authMiddleware, approveBooking);
router.post("/:id/reject", authMiddleware, rejectBooking);
router.post("/manual/create", authMiddleware, createManualBooking);

export default router;
