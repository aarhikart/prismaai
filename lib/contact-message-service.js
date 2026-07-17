import { connectDB } from "@/lib/mongodb";
import ContactMessage from "@/models/ContactMessage";

export async function getContactMessages() {
  await connectDB();
  return ContactMessage.find().sort({ createdAt: -1 }).lean();
}

export async function createContactMessage(data) {
  await connectDB();
  const initialTimestamp = new Date();
  const msgData = {
    ...data,
    statusUpdatedAt: initialTimestamp,
    statusHistory: [{ status: data.status || "new", updatedAt: initialTimestamp, updatedBy: "Sender" }]
  };
  return ContactMessage.create(msgData);
}

export async function deleteContactMessage(id) {
  await connectDB();
  return await ContactMessage.findByIdAndDelete(id);
}

export async function updateContactMessageStatus(id, newStatus, updatedBy) {
  await connectDB();
  const updateTimestamp = new Date();

  const updatedMessage = await ContactMessage.findByIdAndUpdate(
    id,
    {
      $set: { 
        status: newStatus,
        statusUpdatedAt: updateTimestamp
      },
      $push: { 
        statusHistory: { 
          status: newStatus, 
          updatedAt: updateTimestamp,
          updatedBy: updatedBy || "system"
        } 
      }
    },
    { new: true, runValidators: true }
  );

  if (!updatedMessage) {
    throw new Error("Contact message not found.");
  }

  return updatedMessage;
}
