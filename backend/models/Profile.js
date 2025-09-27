import mongoose from "mongoose";

const profileSchema = new mongoose.Schema(
  {
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

    // Competitive Programming Profiles
    codeforces: {
      handle: { type: String },
      rating: { type: Number, default: null },
    },
    codechef: {
      handle: { type: String },
      rating: { type: Number, default: null },
    },
    leetcode: {
      handle: { type: String },
      solvedProblems: { type: Number, default: 0 },
      contestRating: { type: Number, default: null },
      easySolved: { type: Number, default: 0 },
      mediumSolved: { type: Number, default: 0 },
      hardSolved: { type: Number, default: 0 },
    },

    // Development Profiles
    github: {
      username: { type: String },
      repoCount: { type: Number, default: 0 },
      followers: { type: Number, default: 0 },
    },
    linkedin: { type: String },   // Just link
    portfolio: { type: String },  // Optional personal site
  },
  { timestamps: true }
);

export default mongoose.model("Profile", profileSchema);
