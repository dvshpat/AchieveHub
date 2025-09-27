// routes/userRoutes.js
import express from "express";
import { protect } from "../middlewares/authMiddleware.js";
import { fetchProfile, fetchAllUsers } from "../controllers/userController.js";
const router = express.Router();

router.get("/profile", protect, fetchProfile);
router.get("/", fetchAllUsers);

export default router;