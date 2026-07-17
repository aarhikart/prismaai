import { connectDB } from "@/lib/mongodb";
import PocRequest from "@/models/PocRequest";

export async function getPocRequests() {
  await connectDB();
  return PocRequest.find().sort({ createdAt: -1 }).lean();
}

export async function createPocRequest(data) {
  await connectDB();
  const initialTimestamp = new Date();
  const reqData = {
    ...data,
    statusUpdatedAt: initialTimestamp,
    statusHistory: [{ status: data.status || "new", updatedAt: initialTimestamp, updatedBy: "Applicant" }]
  };
  return PocRequest.create(reqData);
}

export async function deletePocRequest(id) {
  await connectDB();
  return await PocRequest.findByIdAndDelete(id);
}

export async function updatePocRequestStatus(id, newStatus, updatedBy) {
  await connectDB();
  const updateTimestamp = new Date();

  const updatedRequest = await PocRequest.findByIdAndUpdate(
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

  if (!updatedRequest) {
    throw new Error("POC request not found.");
  }

  return updatedRequest;
}
