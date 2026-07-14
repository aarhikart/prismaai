import { ADMIN_ROLES } from "@/lib/admin-access";
import { requireApiRole } from "@/lib/auth";
import { getJobById, updateJob } from "@/lib/job-service";
import AdminUser from "@/models/AdminUser";
import { createNotification } from "@/lib/notification-service";

export async function POST(req, context) {
  const { error, user } = await requireApiRole([ADMIN_ROLES.ADMIN, ADMIN_ROLES.HR]);
  if (error) return error;

  const { id } = await context.params;
  const job = await getJobById(id);

  if (!job) {
    return Response.json({ error: "Job not found." }, { status: 404 });
  }

  try {
    const body = await req.json();
    const { action, comment, reviewerId } = body;

    const currentStatus = job.status || "Draft";
    const timeline = job.timeline || [];
    const updateData = { timeline };

    // Check actions
    if (action === "approve" || action === "reject" || action === "request_changes") {
      // Must be pending review
      if (currentStatus !== "Pending Review") {
        return Response.json({ error: "Job is not in Pending Review status." }, { status: 400 });
      }

      // Must be the assigned reviewer or Admin
      const isReviewer = job.reviewerId && String(job.reviewerId) === String(user.id);
      const isAdmin = user.role === ADMIN_ROLES.ADMIN;
      if (!isReviewer && !isAdmin) {
        return Response.json({ error: "You are not authorized to review this job." }, { status: 403 });
      }

      let newStatus = "";
      let timelineAction = "";
      if (action === "approve") {
        newStatus = "Approved";
        timelineAction = "Approved";
      } else if (action === "reject") {
        newStatus = "Rejected";
        timelineAction = "Rejected";
      } else if (action === "request_changes") {
        newStatus = "Changes Requested";
        timelineAction = "Changes Requested";
      }

      timeline.push({
        user: user.username,
        role: user.role,
        action: timelineAction,
        comment: comment || `Job ${newStatus.toLowerCase()}`,
        date: new Date(),
      });

      updateData.status = newStatus;

      // Save job updates
      const updatedJob = await updateJob(id, updateData);

      // Notify creator
      if (job.creatorId) {
        await createNotification({
          recipient: job.creatorId,
          sender: user.id,
          senderName: user.username,
          job: id,
          jobTitle: job.title,
          action: timelineAction,
          message: `${user.username} ${action === "request_changes" ? "requested changes on" : action + "d"} "${job.title}".${comment ? ' Comment: ' + comment : ""}`,
        });
      }

      return Response.json(updatedJob);
    } else if (action === "send_for_review") {
      // Creator or Admin can send for review
      const isCreator = !job.creatorId || String(job.creatorId) === String(user.id);
      const isAdmin = user.role === ADMIN_ROLES.ADMIN;
      if (!isCreator && !isAdmin) {
        return Response.json({ error: "You are not authorized to submit this job for review." }, { status: 403 });
      }

      // Can only send if Draft or Changes Requested
      if (currentStatus !== "Draft" && currentStatus !== "Changes Requested") {
        return Response.json({ error: "Job cannot be submitted for review from this status." }, { status: 400 });
      }

      const finalReviewerId = reviewerId || (job.reviewerId ? String(job.reviewerId) : "");
      if (!finalReviewerId) {
        return Response.json({ error: "A reviewer must be assigned." }, { status: 400 });
      }

      let finalReviewerName = job.reviewerName || "";
      if (finalReviewerId !== (job.reviewerId ? String(job.reviewerId) : "")) {
        const revUser = await AdminUser.findById(finalReviewerId);
        if (revUser) {
          finalReviewerName = revUser.username;
        }
      }

      timeline.push({
        user: user.username,
        role: user.role,
        action: "Review Request Sent",
        comment: comment || `Submitted to reviewer: ${finalReviewerName}`,
        date: new Date(),
      });

      updateData.status = "Pending Review";
      updateData.reviewerId = finalReviewerId;
      updateData.reviewerName = finalReviewerName;

      const updatedJob = await updateJob(id, updateData);

      // Notify reviewer
      await createNotification({
        recipient: finalReviewerId,
        sender: user.id,
        senderName: user.username,
        job: id,
        jobTitle: job.title,
        action: "Review Request Sent",
        message: `${user.username} submitted "${job.title}" to you for review.`,
      });

      return Response.json(updatedJob);
    } else if (action === "reassign") {
      // Reassign reviewer (Admin only)
      if (user.role !== ADMIN_ROLES.ADMIN) {
        return Response.json({ error: "Only administrators can reassign reviewers." }, { status: 403 });
      }

      if (!reviewerId) {
        return Response.json({ error: "New reviewer ID is required." }, { status: 400 });
      }

      const newReviewer = await AdminUser.findById(reviewerId);
      if (!newReviewer) {
        return Response.json({ error: "Reviewer user not found." }, { status: 404 });
      }

      const oldReviewerName = job.reviewerName || "unassigned";
      timeline.push({
        user: user.username,
        role: user.role,
        action: "Reviewer Reassigned",
        comment: `Reassigned from ${oldReviewerName} to ${newReviewer.username}`,
        date: new Date(),
      });

      updateData.reviewerId = reviewerId;
      updateData.reviewerName = newReviewer.username;

      const updatedJob = await updateJob(id, updateData);

      // Notify new reviewer
      await createNotification({
        recipient: reviewerId,
        sender: user.id,
        senderName: user.username,
        job: id,
        jobTitle: job.title,
        action: "Reviewer Assigned",
        message: `${user.username} assigned job "${job.title}" to you for review.`,
      });

      return Response.json(updatedJob);
    } else {
      return Response.json({ error: "Invalid action." }, { status: 400 });
    }
  } catch (err) {
    return Response.json({ error: err.message || "An error occurred." }, { status: 500 });
  }
}
