import mongoose from "mongoose";

const NotificationSchema = new mongoose.Schema(
  {
    recipient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "AdminUser",
      required: true,
    },
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "AdminUser",
      required: true,
    },
    senderName: {
      type: String,
      required: true,
    },
    job: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job",
    },
    jobTitle: {
      type: String,
    },
    action: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    read: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

// Force delete from mongoose models cache to avoid Next.js hot-reload schema caching issues
if (mongoose.models.Notification) {
  delete mongoose.models.Notification;
}

export default mongoose.models.Notification || mongoose.model("Notification", NotificationSchema);
