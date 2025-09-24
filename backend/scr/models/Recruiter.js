import mongoose from "mongoose";

const recruiterSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  company: String,
  password: String
}, { timestamps: true });

export default mongoose.model("Recruiter", recruiterSchema);
