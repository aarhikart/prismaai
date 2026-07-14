import { deleteJob, getJobById, updateJob } from "@/lib/job-service";
import { ADMIN_ROLES } from "@/lib/admin-access";
import { requireApiRole } from "@/lib/auth";
import { removeUploadedFile, saveUploadedFile } from "@/lib/upload-file";
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

export async function GET(_req, context) {
  const { id } = await context.params;
  const job = await getJobById(id);

  if (!job) {
    return Response.json({ error: "Job not found." }, { status: 404 });
  }

  return Response.json(job);
}

export async function PUT(req, context) {
  const { error, user } = await requireApiRole([ADMIN_ROLES.ADMIN, ADMIN_ROLES.HR]);

  if (error) {
    return error;
  }

  const { id } = await context.params;
  const existingJob = await getJobById(id);

  if (!existingJob) {
    return Response.json({ error: "Job not found." }, { status: 404 });
  }

  // Permission Check: HR can only edit Drafts, Changes Requested, Approved, or Published jobs
  const isValidStatusForHR = !existingJob.status || 
    existingJob.status === "Draft" || 
    existingJob.status === "Changes Requested" || 
    existingJob.status === "Approved" ||
    existingJob.status === "Published";
  
  if (user.role === ADMIN_ROLES.HR) {
    if (!isValidStatusForHR) {
      return Response.json({ error: "You can only edit jobs in Draft, Changes Requested, Approved, or Published status." }, { status: 403 });
    }
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

    const statusInput = formData.get("status") ? normalizeText(formData.get("status")) : (existingJob.status || "Draft");
    const reviewerId = formData.get("reviewerId") ? normalizeText(formData.get("reviewerId")) : (existingJob.reviewerId ? String(existingJob.reviewerId) : "");
    let reviewerName = existingJob.reviewerName || "";

    if (reviewerId && reviewerId !== (existingJob.reviewerId ? String(existingJob.reviewerId) : "")) {
      const reviewerObj = await AdminUser.findById(reviewerId);
      if (reviewerObj) {
        reviewerName = reviewerObj.username;
      }
    }

    // Build timeline
    const timeline = existingJob.timeline || [];
    timeline.push({
      user: user.username,
      role: user.role,
      action: "Job Updated",
      comment: "Job details updated",
      date: new Date(),
    });

    const oldStatus = existingJob.status || "Draft";
    if (statusInput !== oldStatus) {
      if (statusInput === "Pending Review") {
        timeline.push({
          user: user.username,
          role: user.role,
          action: "Review Request Sent",
          comment: `Submitted to reviewer: ${reviewerName}`,
          date: new Date(),
        });
      } else {
        timeline.push({
          user: user.username,
          role: user.role,
          action: "Status Changed",
          comment: `Status updated from ${oldStatus} to ${statusInput}`,
          date: new Date(),
        });
      }
    }

    const updateData = {
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
      reviewerId: reviewerId || null,
      reviewerName: reviewerName || "",
      timeline,
    };

    // If it didn't have a creator (legacy job), assign it
    if (!existingJob.creatorId) {
      updateData.creatorId = user.id;
      updateData.creatorName = user.username;
    }

    const updatedJob = await updateJob(id, updateData);

    // Send notification if requested review
    if (statusInput === "Pending Review" && statusInput !== oldStatus && reviewerId) {
      await createNotification({
        recipient: reviewerId,
        sender: user.id,
        senderName: user.username,
        job: id,
        jobTitle: updatedJob.title,
        action: "Review Request Sent",
        message: `${user.username} submitted "${updatedJob.title}" to you for review.`,
      });
    }

    return Response.json(updatedJob);
  } catch (error) {
    return Response.json(
      { error: error.message || "Unable to update job." },
      { status: 400 }
    );
  }
}

export async function DELETE(_req, context) {
  const { error, user } = await requireApiRole([ADMIN_ROLES.ADMIN, ADMIN_ROLES.HR]);

  if (error) {
    return error;
  }

  const { id } = await context.params;
  const job = await getJobById(id);

  if (!job) {
    return Response.json({ error: "Job not found." }, { status: 404 });
  }

  // Permission Check: HR can only delete draft, approved, or published jobs
  if (user.role === ADMIN_ROLES.HR) {
    const isValidStatusForDelete = !job.status || 
      job.status === "Draft" || 
      job.status === "Approved" ||
      job.status === "Published";
    if (!isValidStatusForDelete) {
      return Response.json({ error: "You can only delete draft, approved, or published jobs." }, { status: 403 });
    }
  }

  await deleteJob(id);

  if (job.image) {
    await removeUploadedFile(job.image);
  }

  return Response.json({ message: "Job deleted successfully." });
}
