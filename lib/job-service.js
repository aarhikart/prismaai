import mongoose from "mongoose";
import { connectDB } from "@/lib/mongodb";
import Job from "@/models/Job";

export async function getJobs() {
  await connectDB();
  return Job.find().sort({ createdAt: -1 }).lean();
}

export async function getJobById(id) {
  await connectDB();

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return null;
  }

  return Job.findById(id).lean();
}

export async function createJob(data) {
  await connectDB();
  return Job.create(data);
}

export async function updateJob(id, data) {
  await connectDB();

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return null;
  }

  return Job.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });
}

export async function deleteJob(id) {
  await connectDB();

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return null;
  }

  return Job.findByIdAndDelete(id);
}
