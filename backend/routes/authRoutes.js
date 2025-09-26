import express from "express";
import { adminSignup, adminRegister, login } from "../controllers/authController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/admin/signup", adminSignup);

router.post("/admin/register", protect, adminRegister);

router.post("/login", login);

export default router;
