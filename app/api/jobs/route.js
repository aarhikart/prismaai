import { createJob, getJobs } from "@/lib/job-service";
import { ADMIN_ROLES } from "@/lib/admin-access";
import { requireApiRole } from "@/lib/auth";
import { saveUploadedFile } from "@/lib/upload-file";

function parseSections(value) {
  try {
    const parsed = JSON.parse(value || "[]");

    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed.map((section) => ({
      title: typeof section?.title === "string" ? section.title : "",
      description: typeof section?.description === "string" ? section.description : "",
    }));
  } catch {
    return [];
  }
}

function normalizeText(value) {
  return typeof value === "string" ? value : "";
}

export async function GET() {
  const jobs = await getJobs();
  return Response.json(jobs);
}

export async function POST(req) {
  const { error } = await requireApiRole([ADMIN_ROLES.ADMIN, ADMIN_ROLES.HR]);

  if (error) {
    return error;
  }

  try {
    const formData = await req.formData();
    const imageFile = formData.get("image");
    const image =
      imageFile && imageFile.size > 0 ? await saveUploadedFile(imageFile, "job") : "";

    const job = await createJob({
      title: normalizeText(formData.get("title")),
      address: normalizeText(formData.get("address")),
      jobType: normalizeText(formData.get("jobType")),
      requirementsCount: normalizeText(formData.get("requirementsCount")),
      experienceYears: normalizeText(formData.get("experienceYears")),
      salary: normalizeText(formData.get("salary")),
      qualification: normalizeText(formData.get("qualification")),
      ctc: normalizeText(formData.get("ctc")),
      image,
      sections: parseSections(formData.get("sections")),
    });

    return Response.json(job, { status: 201 });
  } catch (error) {
    return Response.json(
      { error: error.message || "Unable to create job." },
      { status: 400 }
    );
  }
}
