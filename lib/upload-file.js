import fs from "fs/promises";
import path from "path";

function sanitizeFileName(fileName) {
  return fileName.replace(/\s+/g, "-").replace(/[^a-zA-Z0-9._-]/g, "");
}

function resolvePublicDir(targetDir = "uploads") {
  return path.join(process.cwd(), "public", ...targetDir.split("/"));
}

export async function saveUploadedFile(file, targetDir = "uploads") {
  if (!file || typeof file.arrayBuffer !== "function" || !file.name) {
    throw new Error("A valid image file is required.");
  }

  const uploadsDir = resolvePublicDir(targetDir);
  await fs.mkdir(uploadsDir, { recursive: true });

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  const safeName = `${Date.now()}-${sanitizeFileName(file.name)}`;
  const filePath = path.join(uploadsDir, safeName);

  await fs.writeFile(filePath, buffer);

  return `/${targetDir}/${safeName}`;
}

export async function removeUploadedFile(fileUrl) {
  if (!fileUrl || !fileUrl.startsWith("/")) {
    return;
  }

  const filePath = path.join(process.cwd(), "public", fileUrl.replace(/^\/+/, ""));

  try {
    await fs.unlink(filePath);
  } catch {
    // Ignore missing files so deletes remain resilient.
  }
}
