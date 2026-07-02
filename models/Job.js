import mongoose from "mongoose";

const JobSectionSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      default: "",
      trim: true,
    },
    description: {
      type: String,
      default: "",
    },
  },
  { _id: false }
);

const JobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      default: "",
      trim: true,
    },
    address: {
      type: String,
      default: "",
      trim: true,
    },
    jobType: {
      type: String,
      default: "",
      trim: true,
    },
    requirementsCount: {
      type: String,
      default: "",
      trim: true,
    },
    experienceYears: {
      type: String,
      default: "",
      trim: true,
    },
    salary: {
      type: String,
      default: "",
      trim: true,
    },
    qualification: {
      type: String,
      default: "",
      trim: true,
    },
    ctc: {
      type: String,
      default: "",
      trim: true,
    },
    image: {
      type: String,
      default: "",
    },
    sections: {
      type: [JobSectionSchema],
      default: [],
    },
  },
  { timestamps: true }
);

export default mongoose.models.Job || mongoose.model("Job", JobSchema);
