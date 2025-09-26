import express from "express";
import { adminSignup, adminRegister, login } from "../controllers/authController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

// ✅ Admin Signup (multiple admins allowed for now)
router.post("/admin/signup", adminSignup);

// ✅ Admin registers student or recruiter (protected route)
router.post("/admin/register", protect, adminRegister);

// ✅ Login for all users
router.post("/login", login);

export default router;
