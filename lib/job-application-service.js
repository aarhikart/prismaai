import { connectDB } from "@/lib/mongodb";
import JobApplication from "@/models/JobApplication";

export async function getJobApplications() {
  await connectDB();
  return await JobApplication.find({}).sort({ createdAt: -1 }).lean();
}

export async function createJobApplication(data) {
  await connectDB();
  const initialTimestamp = new Date();
  
  const appData = {
    ...data,
    statusUpdatedAt: initialTimestamp,
    statusHistory: [{ status: data.status || "new", updatedAt: initialTimestamp, updatedBy: "Applicant" }]
  };
  
  return await JobApplication.create(appData);
}

export async function deleteJobApplication(id) {
  await connectDB();
  return await JobApplication.findByIdAndDelete(id);
}

export async function updateJobApplicationStatus(id, newStatus, updatedBy) {
  await connectDB();
  const updateTimestamp = new Date();

  const updatedApplication = await JobApplication.findByIdAndUpdate(
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

  if (!updatedApplication) {
    throw new Error("Application not found.");
  }

  return updatedApplication;
}