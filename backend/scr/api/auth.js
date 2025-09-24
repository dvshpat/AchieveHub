import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Student from "../models/Student.js";
import Recruiter from "../models/Recruiter.js";
import Admin from "../models/Admin.js";

const router = express.Router();

// Helper: generate JWT
const generateToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

// Register (Student/Admin/Recruiter)
router.post("/register", async (req, res) => {
  try {
    const { name, email, password, role, department, company } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    let user;
    if (role === "student") {
      user = await Student.create({ name, email, password: hashedPassword, department });
    } else if (role === "recruiter") {
      user = await Recruiter.create({ name, email, password: hashedPassword, company });
    } else {
      user = await Admin.create({ name, email, password: hashedPassword });
    }

    res.json({ token: generateToken(user._id, role), role });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Login
router.post("/login", async (req, res) => {
  try {
    const { email, password, role } = req.body;

    let user;
    if (role === "student") user = await Student.findOne({ email });
    else if (role === "recruiter") user = await Recruiter.findOne({ email });
    else user = await Admin.findOne({ email });

    if (!user) return res.status(404).json({ error: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ error: "Invalid credentials" });

    res.json({ token: generateToken(user._id, role), role });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
