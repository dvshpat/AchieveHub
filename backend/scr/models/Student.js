import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  department: { type: String },
  achievements: [{ type: mongoose.Schema.Types.ObjectId, ref: "Certificate" }]
}, { timestamps: true });

export default mongoose.model("Student", studentSchema);
