import { connectDB } from "@/lib/mongodb";
import Post from "@/models/Post";
import mongoose from "mongoose";

export async function GET(req, context) {
  await connectDB();

  // 🚨 FIX: unwrap params properly
  const { params } = context;
  const { id } = await params;

  console.log("REQUEST ID:", id);

  const all = await Post.find();
  console.log("ALL POSTS IDS:", all.map(p => p._id.toString()));

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return Response.json({ error: "Invalid ID format" }, { status: 400 });
  }

  const post = await Post.findById(id);

  if (!post) {
    return Response.json({ error: "Post not found" }, { status: 404 });
  }

  return Response.json(post);
}
