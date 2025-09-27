// routes/profileRoutes.js
import express from "express";
import { saveProfile, fetchRatings } from "../controllers/profileController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/save", protect, saveProfile);   // student saves handles
router.get("/ratings", protect, fetchRatings); // fetch & update live ratings

export default router;
