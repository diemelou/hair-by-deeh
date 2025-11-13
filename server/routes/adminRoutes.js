import express from "express";
import { adminLogin } from "../controllers/adminController.js";
import { authMiddleware } from "../middleware/auth.js";

const router = express.Router();

router.post("/login", adminLogin);

// Protected route example
router.get("/me", authMiddleware, (req, res) => {
  res.json({ email: req.admin.email });
});

export default router;
