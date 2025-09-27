import express from "express";
import { 
  uploadCertificate, 
  uploadCertificateWithFile,
  getMyCertificates, 
  getAllCertificates,
  getCertificate,
  deleteCertificate
} from "../controllers/certificateController.js";
import { protect } from "../middlewares/authMiddleware.js";
import { upload } from "../config/multer.js";

const router = express.Router();

// Original file upload with AI processing
// router.post("/upload", upload.single('certificate'), uploadCertificateWithFile);
router.post("/upload", protect, upload.single('certificate'), uploadCertificateWithFile);

// New URL-based upload
router.post("/", protect, uploadCertificate);

// Get user's certificates
router.get("/my-certificates", protect, getMyCertificates);

// Get all certificates
router.get("/", getAllCertificates);

// Get single certificate
router.get("/:id", getCertificate);

// Delete certificate
router.delete("/:id", protect, deleteCertificate);


export default router;
