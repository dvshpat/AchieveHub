import mongoose from "mongoose";

const certificateSchema = new mongoose.Schema(
  {
    title: { type: String, required: true }, // Human-readable title
    description: { type: String },
    imageUrl: { type: String, required: true }, // Cloudinary URL
    publicId: { type: String, required: true }, // Cloudinary ID
    uploadedAt: { type: Date, default: Date.now },
    fileSize: { type: Number },
    format: { type: String },

    // AI-extracted fields
    recipientName: String,
    issuingAuthority: String,
    certificateTitle: String,
    verificationInfo: {
      verificationUrl: String,
      credentialId: String,
    },
    keywords: [String],

    // Normalized fields for recruiters
    type: { type: String },   // maps to certificateTitle
    issuer: { type: String }, // maps to issuingAuthority
    fileURL: { type: String }, // maps to imageUrl
    hasQRCode: Boolean,
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
