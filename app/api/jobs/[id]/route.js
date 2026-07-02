import { deleteJob, getJobById, updateJob } from "@/lib/job-service";
import { ADMIN_ROLES } from "@/lib/admin-access";
import { requireApiRole } from "@/lib/auth";
import { removeUploadedFile, saveUploadedFile } from "@/lib/upload-file";

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

export async function GET(_req, context) {
  const { id } = await context.params;
  const job = await getJobById(id);

  if (!job) {
    return Response.json({ error: "Job not found." }, { status: 404 });
  }

  return Response.json(job);
}

export async function PUT(req, context) {
  const { error } = await requireApiRole([ADMIN_ROLES.ADMIN, ADMIN_ROLES.HR]);

  if (error) {
    return error;
  }

  const { id } = await context.params;
  const existingJob = await getJobById(id);

  if (!existingJob) {
    return Response.json({ error: "Job not found." }, { status: 404 });
  }

  try {
    const formData = await req.formData();
    const imageFile = formData.get("image");
    let image = existingJob.image;

    if (imageFile && imageFile.size > 0) {
      image = await saveUploadedFile(imageFile, "job");

      if (existingJob.image) {
        await removeUploadedFile(existingJob.image);
      }
    }

    const updatedJob = await updateJob(id, {
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

    return Response.json(updatedJob);
  } catch (error) {
    return Response.json(
      { error: error.message || "Unable to update job." },
      { status: 400 }
    );
  }
}

export async function DELETE(_req, context) {
  const { error } = await requireApiRole([ADMIN_ROLES.ADMIN, ADMIN_ROLES.HR]);

  if (error) {
    return error;
  }

  const { id } = await context.params;
  const job = await deleteJob(id);

  if (!job) {
    return Response.json({ error: "Job not found." }, { status: 404 });
  }

  if (job.image) {
    await removeUploadedFile(job.image);
  }

  return Response.json({ message: "Job deleted successfully." });
}
