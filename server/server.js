import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import connectDB from "./config/db.js";
import bookingRoutes from "./routes/bookingRoutes.js";

dotenv.config();
connectDB();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/bookings", bookingRoutes);

// Serve static client build in production
if (process.env.NODE_ENV === "production") {
	const clientBuildPath = path.join(__dirname, "..", "client", "build");
	app.use(express.static(clientBuildPath));
	app.get("/*", (req, res) => {
		res.sendFile(path.join(clientBuildPath, "index.html"));
	});
}

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));
