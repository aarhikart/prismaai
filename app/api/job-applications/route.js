import { createJobApplication, getJobApplications } from "@/lib/job-application-service";
import { ADMIN_ROLES } from "@/lib/admin-access";
import { requireApiRole } from "@/lib/auth";
import { saveUploadedFile } from "@/lib/upload-file";

function requireField(value, fieldName) {
  if (typeof value !== "string" || !value.trim()) {
    throw new Error(`${fieldName} is required.`);
  }

  return value.trim();
}

function validateEmail(email) {
  const normalized = requireField(email, "Email");

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalized)) {
    throw new Error("Email must be valid.");
  }

  return normalized;
}

export async function GET() {
  const { error } = await requireApiRole([ADMIN_ROLES.ADMIN]);

  if (error) {
    return error;
  }

  const applications = await getJobApplications();
  return Response.json(applications);
}

export async function POST(req) {
  try {
    const formData = await req.formData();
    const resume = formData.get("resume");

    if (!resume || resume.size === 0) {
      throw new Error("Resume is required.");
    }

    const resumeUrl = await saveUploadedFile(resume, "job/resumefiles");

    const application = await createJobApplication({
      jobId: requireField(formData.get("jobId"), "Job ID"),
      firstName: requireField(formData.get("firstName"), "First name"),
      lastName: requireField(formData.get("lastName"), "Last name"),
      email: validateEmail(formData.get("email")),
      phone: requireField(formData.get("phone"), "Phone number"),
      roleTitle: requireField(formData.get("roleTitle"), "Role title"),
      resumeUrl,
      resumeFileName: resume.name,
    });

    return Response.json(application, { status: 201 });
  } catch (error) {
    return Response.json(
      { error: error.message || "Unable to submit job application." },
      { status: 400 }
    );
  }
}
