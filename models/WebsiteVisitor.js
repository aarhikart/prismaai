import mongoose from "mongoose";

const WebsiteVisitorSchema = new mongoose.Schema(
  {
    key: {
      type: String,
      required: true,
      unique: true,
      default: "landing-page",
    },
    total: {
      type: Number,
      default: 0,
      min: 0,
    },
  },
  { timestamps: true }
);

export default mongoose.models.WebsiteVisitor ||
  mongoose.model("WebsiteVisitor", WebsiteVisitorSchema);
