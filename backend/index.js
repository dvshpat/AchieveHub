import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import certificateRoutes from "./routes/certificateRoutes.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

connectDB();

app.use("/api/auth", authRoutes);
app.use("/api/certificates", certificateRoutes);

app.get("/", (req, res) => res.send("🚀 API Running"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
