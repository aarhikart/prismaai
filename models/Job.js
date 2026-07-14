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
    status: {
      type: String,
      default: "Draft",
      enum: ["Draft", "Pending Review", "Changes Requested", "Approved", "Rejected", "Published"],
    },
    creatorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "AdminUser",
    },
    creatorName: {
      type: String,
      default: "",
    },
    reviewerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "AdminUser",
    },
    reviewerName: {
      type: String,
      default: "",
    },
    timeline: {
      type: [
        {
          user: String,
          role: String,
          action: String,
          comment: String,
          date: {
            type: Date,
            default: Date.now,
          },
        },
      ],
      default: [],
    },
    comments: {
      type: [
        {
          user: String,
          role: String,
          message: String,
          date: {
            type: Date,
            default: Date.now,
          },
        },
      ],
      default: [],
    },
  },
  { timestamps: true }
);

export default mongoose.models.Job || mongoose.model("Job", JobSchema);
