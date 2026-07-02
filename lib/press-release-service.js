import mongoose from "mongoose";
import { connectDB } from "@/lib/mongodb";
import PressRelease from "@/models/PressRelease";

export async function getPressReleases() {
  await connectDB();
  return PressRelease.find().sort({ createdAt: -1 }).lean();
}

export async function getPressReleaseById(id) {
  await connectDB();

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return null;
  }

  return PressRelease.findById(id).lean();
}

export async function createPressRelease(data) {
  await connectDB();
  return PressRelease.create(data);
}

export async function updatePressRelease(id, data) {
  await connectDB();

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return null;
  }

  return PressRelease.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });
}

export async function deletePressRelease(id) {
  await connectDB();

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return null;
  }

  return PressRelease.findByIdAndDelete(id);
}
