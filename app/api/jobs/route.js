import { createJob, getJobs } from "@/lib/job-service";
import { ADMIN_ROLES } from "@/lib/admin-access";
import { requireApiRole } from "@/lib/auth";
import { saveUploadedFile } from "@/lib/upload-file";
import AdminUser from "@/models/AdminUser";
import { createNotification } from "@/lib/notification-service";

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
  const { error, user } = await requireApiRole([ADMIN_ROLES.ADMIN, ADMIN_ROLES.HR]);

  if (error) {
    return error;
  }

  try {
    const formData = await req.formData();
    const imageFile = formData.get("image");
    const image =
      imageFile && imageFile.size > 0 ? await saveUploadedFile(imageFile, "job") : "";

    const statusInput = normalizeText(formData.get("status")) || "Draft";
    const reviewerId = normalizeText(formData.get("reviewerId"));
    let reviewerName = "";

    if (reviewerId) {
      const reviewerObj = await AdminUser.findById(reviewerId);
      if (reviewerObj) {
        reviewerName = reviewerObj.username;
      }
    }

    const comment = statusInput === "Pending Review"
      ? "Job created and submitted for review"
      : statusInput === "Approved"
      ? "Job posted directly"
      : "Job created as draft";

    const timeline = [
      {
        user: user.username,
        role: user.role,
        action: statusInput === "Approved" ? "Approved" : "Job Created",
        comment,
        date: new Date(),
      },
    ];

    if (statusInput === "Pending Review") {
      timeline.push({
        user: user.username,
        role: user.role,
        action: "Review Request Sent",
        comment: `Assigned reviewer: ${reviewerName}`,
        date: new Date(),
      });
    }

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
      status: statusInput,
      creatorId: user.id,
      creatorName: user.username,
      reviewerId: reviewerId || null,
      reviewerName: reviewerName || "",
      timeline,
      comments: [],
    });

    if (statusInput === "Pending Review" && reviewerId) {
      await createNotification({
        recipient: reviewerId,
        sender: user.id,
        senderName: user.username,
        job: job._id,
        jobTitle: job.title,
        action: "Review Request Sent",
        message: `${user.username} submitted "${job.title}" to you for review.`,
      });
    }

    return Response.json(job, { status: 201 });
  } catch (error) {
    return Response.json(
      { error: error.message || "Unable to create job." },
      { status: 400 }
    );
  }
}
