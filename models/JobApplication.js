import mongoose from "mongoose";

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
  },
  { timestamps: true }
);

export default mongoose.models.JobApplication ||
  mongoose.model("JobApplication", JobApplicationSchema);
