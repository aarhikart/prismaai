import mongoose from "mongoose";
import { connectDB } from "@/lib/mongodb";
import Article from "@/models/Article";

export async function getArticles() {
  await connectDB();
  return Article.find().sort({ createdAt: -1 }).lean();
}

export async function getArticleById(id) {
  await connectDB();

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return null;
  }

  return Article.findById(id).lean();
}

export async function createArticle(data) {
  await connectDB();
  return Article.create(data);
}

export async function updateArticle(id, data) {
  await connectDB();

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return null;
  }

  return Article.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });
}

export async function deleteArticle(id) {
  await connectDB();

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return null;
  }

  return Article.findByIdAndDelete(id);
}
