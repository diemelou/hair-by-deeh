import Admin from "../models/Admin.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

export const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "Email and password required" });
    }

    let admin = await Admin.findOne({ email });
    
    // If admin doesn't exist, create one (simple setup for demo)
    if (!admin) {
      const hashedPassword = await bcrypt.hash(password, 10);
      admin = await Admin.create({ email, password: hashedPassword });
    } else {
      // Verify password
      const isValid = await bcrypt.compare(password, admin.password);
      if (!isValid) return res.status(401).json({ error: "Invalid password" });
    }

    const token = jwt.sign({ id: admin._id, email: admin.email }, JWT_SECRET, { expiresIn: "7d" });
    res.json({ token, email: admin.email });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
