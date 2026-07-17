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

const ContactMessageSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    company: {
      type: String,
      trim: true,
      default: "",
    },
    email: {
      type: String,
      required: true,
      trim: true,
    },
    phone: {
      type: String,
      trim: true,
      default: "",
    },
    message: {
      type: String,
      required: true,
      trim: true,
    },
    status: {
      type: String,
      default: "new",
      enum: ["new", "reviewed", "under review", "contacted", "ignored"],
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

export default mongoose.models.ContactMessage ||
  mongoose.model("ContactMessage", ContactMessageSchema);
