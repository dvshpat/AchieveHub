import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, unique: true, sparse: true }, // optional for recruiters/students
    password: { type: String, required: true },
    role: { type: String, enum: ["admin", "student", "recruiter"], required: true },

    // Student-specific
    usn: { type: String, unique: true, sparse: true },

    // Recruiter-specific
    recruiterId: { type: String, unique: true, sparse: true },
    company: { type: String },

    department: { type: String }, // for students
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
