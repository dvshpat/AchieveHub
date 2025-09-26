import express from "express";
import { uploadCertificate, getMyCertificates } from "../controllers/certificateController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

// No multer needed now because upload happens in frontend
router.post("/upload", protect, uploadCertificate);
router.get("/my-certificates", protect, getMyCertificates);

export default router;
