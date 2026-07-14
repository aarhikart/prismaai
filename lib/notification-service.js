import { connectDB } from "@/lib/mongodb";
import Notification from "@/models/Notification";

export async function createNotification({ recipient, sender, senderName, job, jobTitle, action, message }) {
  await connectDB();
  return Notification.create({
    recipient,
    sender,
    senderName,
    job,
    jobTitle,
    action,
    message,
  });
}

export async function getNotificationsForUser(userId) {
  await connectDB();
  return Notification.find({ recipient: userId })
    .sort({ createdAt: -1 })
    .limit(50)
    .lean();
}

export async function markAllAsRead(userId) {
  await connectDB();
  return Notification.updateMany({ recipient: userId }, { read: true });
}
