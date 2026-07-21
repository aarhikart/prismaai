import { createJobApplication, getJobApplications } from "@/lib/job-application-service";
import { ADMIN_ROLES } from "@/lib/admin-access";
import { requireApiRole } from "@/lib/auth";
import { saveUploadedFile } from "@/lib/upload-file";
import AdminUser from "@/models/AdminUser";
import { createNotification } from "@/lib/notification-service";
import { sendJobApplicationEmails } from "@/lib/mailer";

function requireField(value, fieldName) {
  if (!value || typeof value !== "string" || !value.trim()) {
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
      return Response.json({ error: "Resume file is required." }, { status: 400 });
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
      status: "new",
    });

    // Create notifications for all Admins and HRs
    try {
      const staff = await AdminUser.find({
        role: { $in: [ADMIN_ROLES.ADMIN, ADMIN_ROLES.HR] }
      });
      for (const member of staff) {
        await createNotification({
          recipient: member._id,
          sender: member._id, // use the member's ID as sender to satisfy schema ObjectId requirement
          senderName: "System",
          job: application.jobId,
          jobTitle: application.roleTitle,
          action: "New Application",
          message: `New application received for "${application.roleTitle}" from ${application.firstName} ${application.lastName}.`,
        });
      }
    } catch (notifError) {
      console.error("Failed to create notifications for application:", notifError);
    }

    // Send internal notification email & applicant auto-reply email via Gmail SMTP
    try {
      await sendJobApplicationEmails(application);
    } catch (emailError) {
      console.error("Failed to send Job Application emails:", emailError);
    }

    return Response.json(application, { status: 201 });

  } catch (error) {
    console.error("Submission backend failure:", error);
    return Response.json(
      { error: error.message || "Unable to submit job application." },
      { status: 400 }
    );
  }
}
