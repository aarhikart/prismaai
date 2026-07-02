import { connectDB } from "@/lib/mongodb";
import JobApplication from "@/models/JobApplication";

export async function getJobApplications() {
  await connectDB();
  return JobApplication.find().sort({ createdAt: -1 }).lean();
}

export async function createJobApplication(data) {
  await connectDB();
  return JobApplication.create(data);
}
