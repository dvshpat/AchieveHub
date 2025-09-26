import User from "../models/User.js";
import bcrypt from "bcryptjs";
import generateToken from "../utils/generateToken.js";

export const adminSignup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ error: "Admin already exists with this email" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const admin = await User.create({
      name,
      email,
      password: hashedPassword,
      role: "admin"
    });

    res.status(201).json({
      message: "Admin created successfully",
      admin: {
        _id: admin._id,
        name: admin.name,
        email: admin.email,
        role: admin.role,
        token: generateToken(admin._id, admin.role)
      }
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const adminRegister = async (req, res) => {
  try {
    const { name, email, password, role, usn, recruiterId, department, company } = req.body;

    if (req.user.role !== "admin") {
      return res.status(403).json({ error: "Only admins can create accounts." });
    }

    if (!role || (role !== "student" && role !== "recruiter")) {
      return res.status(400).json({ error: "Role must be either 'student' or 'recruiter'." });
    }

    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ error: "User already exists with this email" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
      usn: role === "student" ? usn : undefined,
      recruiterId: role === "recruiter" ? recruiterId : undefined,
      department,
      company
    });

    res.status(201).json({
      message: `${role} account created successfully.`,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, usn, recruiterId, password } = req.body;

    let user;

    if (usn) user = await User.findOne({ usn });
    else if (recruiterId) user = await User.findOne({ recruiterId });
    else if (email) user = await User.findOne({ email });

    if (!user) return res.status(404).json({ error: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ error: "Invalid credentials" });

    res.json({
      token: generateToken(user._id, user.role),
      role: user.role
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
