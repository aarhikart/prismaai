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

const JobApplicationSchema = new mongoose.Schema(
  {
    jobId: {
      type: String,
      default: "",
      trim: true,
    },
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
    },
    phone: {
      type: String,
      required: true,
      trim: true,
    },
    roleTitle: {
      type: String,
      required: true,
      trim: true,
    },
    resumeUrl: {
      type: String,
      required: true,
    },
    resumeFileName: {
      type: String,
      required: true,
      trim: true,
    },
    status: {
      type: String,
      default: "new",
      enum: ["new", "reviewed", "under review", "shortlisted", "not shortlisted"],
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

export default mongoose.models.JobApplication ||
  mongoose.model("JobApplication", JobApplicationSchema);