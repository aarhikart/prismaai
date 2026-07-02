import { connectDB } from "@/lib/mongodb";
import { ADMIN_ROLES } from "@/lib/admin-access";
import { requireApiRole } from "@/lib/auth";
import { removeUploadedFile, saveUploadedFile } from "@/lib/upload-file";
import Post from "@/models/Post";
import fs from "fs";
import path from "path";

// GET ALL
export async function GET() {
  await connectDB();
  const posts = await Post.find().sort({ createdAt: -1 });
  return Response.json(posts);
}

// CREATE
export async function POST(req) {
  const { error } = await requireApiRole([ADMIN_ROLES.ADMIN, ADMIN_ROLES.MARKETING]);

  if (error) {
    return error;
  }

  await connectDB();

  try {
    const formData = await req.formData();
    const title = formData.get("title");
    const subTitle = formData.get("subTitle");
    const description = formData.get("description");
    const date = formData.get("date");
    const image = formData.get("image");

    if (!image || image.size === 0) {
      return Response.json({ error: "Image is required." }, { status: 400 });
    }

    const bytes = await image.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const fileName = `${Date.now()}-${image.name}`;
    const filePath = path.join(process.cwd(), "public/uploads", fileName);

    fs.writeFileSync(filePath, buffer);

    const post = await Post.create({
      title: title || "",
      subTitle: subTitle || "",
      description: description || "",
      date: date || "",
      image: `/uploads/${fileName}`,
    });

    return Response.json(post, { status: 201 });
  } catch {
    return Response.json({ error: "Unable to create blog post." }, { status: 500 });
  }
}
// UPDATE (FIXED)
export async function PUT(req) {
  const { error } = await requireApiRole([ADMIN_ROLES.ADMIN, ADMIN_ROLES.MARKETING]);

  if (error) {
    return error;
  }

  await connectDB();

  try {
    const formData = await req.formData();
    const id = formData.get("id");
    const title = formData.get("title");
    const subTitle = formData.get("subTitle");
    const description = formData.get("description");
    const date = formData.get("date");
    const image = formData.get("image");

    const post = await Post.findById(id);

    if (!post) {
      return Response.json({ error: "Blog post not found." }, { status: 404 });
    }

    let imageUrl = post.image;

    if (image && image.size > 0) {
      imageUrl = await saveUploadedFile(image);

      if (post.image && post.image !== imageUrl) {
        await removeUploadedFile(post.image);
      }
    }

    const updated = await Post.findByIdAndUpdate(
      id,
      {
        title: title || "",
        subTitle: subTitle || "",
        description: description || "",
        date: date || "",
        image: imageUrl,
      },
      { new: true }
    );

    return Response.json(updated);
  } catch {
    return Response.json({ error: "Unable to update blog post." }, { status: 500 });
  }
}

// DELETE
export async function DELETE(req) {
  const { error } = await requireApiRole([ADMIN_ROLES.ADMIN, ADMIN_ROLES.MARKETING]);

  if (error) {
    return error;
  }

  await connectDB();

  try {
    const { id } = await req.json();
    await Post.findByIdAndDelete(id);
    return Response.json({ message: "Deleted" });
  } catch {
    return Response.json({ error: "Unable to delete blog post." }, { status: 500 });
  }
}
