import { connectDB } from "@/lib/mongodb";
import ContactMessage from "@/models/ContactMessage";

export async function getContactMessages() {
  await connectDB();
  return ContactMessage.find().sort({ createdAt: -1 }).lean();
}

export async function createContactMessage(data) {
  await connectDB();
  return ContactMessage.create(data);
}
