import mongoose from "mongoose";

const certificateSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    type: { type: String, required: true }, 
    issuer: { type: String, required: true },
    fileURL: { type: String, required: true },
    status: {
      type: String,
      enum: ["pending", "verified", "rejected"],
      default: "pending"
    },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }
  },
  { timestamps: true }
);

export default mongoose.model("Certificate", certificateSchema);
