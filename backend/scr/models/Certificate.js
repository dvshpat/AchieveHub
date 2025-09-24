import mongoose from "mongoose";

const certificateSchema = new mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: "Student" },
  fileUrl: { type: String, required: true },
  extractedData: {
    name: String,
    title: String,
    issuer: String,
    date: String
  },
  skills: [String],
  trustLevel: { type: String, enum: ["High", "Medium", "Needs Review"], default: "Needs Review" },
  status: { type: String, enum: ["Pending", "Verified", "Rejected"], default: "Pending" }
}, { timestamps: true });

export default mongoose.model("Certificate", certificateSchema);
