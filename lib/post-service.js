import mongoose from "mongoose";

import { connectDB } from "@/lib/mongodb";
import Post from "@/models/Post";

export async function getPosts() {
  await connectDB();
  return Post.find().sort({ createdAt: -1 }).lean();
}

export async function getPostById(id) {
  await connectDB();

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return null;
  }

  return Post.findById(id).lean();
}
