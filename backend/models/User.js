import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, unique: true, sparse: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["admin", "student", "recruiter"], required: true },

    usn: { type: String, unique: true, sparse: true },

    recruiterId: { type: String, unique: true, sparse: true },
    company: { type: String },

    department: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
