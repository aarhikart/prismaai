import mongoose from "mongoose";

const StatusHistorySchema = new mongoose.Schema(
  {
    status: {
      type: String,
      required: true,
      trim: true,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
    updatedBy: {
      type: String,
      trim: true,
    },
  },
  { _id: false }
);

const PocRequestSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
    },
    company: {
      type: String,
      required: true,
      trim: true,
    },
    industry: {
      type: String,
      required: true,
      trim: true,
    },
    industries: {
      type: [String],
      default: undefined,
    },
    message: {
      type: String,
      trim: true,
      default: "",
    },
    status: {
      type: String,
      default: "new",
      enum: ["new", "reviewed", "under review", "approved", "rejected"],
      trim: true,
    },
    statusUpdatedAt: {
      type: Date,
      default: Date.now,
    },
    statusHistory: [StatusHistorySchema],
  },
  { timestamps: true }
);

export default mongoose.models.PocRequest || mongoose.model("PocRequest", PocRequestSchema);
