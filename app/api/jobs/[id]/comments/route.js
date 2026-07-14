import { ADMIN_ROLES } from "@/lib/admin-access";
import { requireApiRole } from "@/lib/auth";
import { getJobById, updateJob } from "@/lib/job-service";
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
    const { message } = body;

    if (!message || !message.trim()) {
      return Response.json({ error: "Comment message is required." }, { status: 400 });
    }

    const comments = job.comments || [];
    const newComment = {
      user: user.username,
      role: user.role,
      message: message.trim(),
      date: new Date(),
    };
    comments.push(newComment);

    const updatedJob = await updateJob(id, { comments });

    // Send notifications to the other party
    // Case 1: Comment added by creator -> notify reviewer (if assigned)
    if (String(job.creatorId) === String(user.id) && job.reviewerId) {
      await createNotification({
        recipient: job.reviewerId,
        sender: user.id,
        senderName: user.username,
        job: id,
        jobTitle: job.title,
        action: "Comment Added",
        message: `${user.username} left a comment on "${job.title}": "${message.trim().substring(0, 50)}${message.length > 50 ? "..." : ""}"`,
      });
    }
    // Case 2: Comment added by reviewer -> notify creator (if exists)
    else if (job.reviewerId && String(job.reviewerId) === String(user.id) && job.creatorId) {
      await createNotification({
        recipient: job.creatorId,
        sender: user.id,
        senderName: user.username,
        job: id,
        jobTitle: job.title,
        action: "Comment Added",
        message: `${user.username} left a comment on "${job.title}": "${message.trim().substring(0, 50)}${message.length > 50 ? "..." : ""}"`,
      });
    }
    // Case 3: Admin comments (who is neither) -> notify creator and reviewer
    else if (user.role === ADMIN_ROLES.ADMIN) {
      if (job.creatorId && String(job.creatorId) !== String(user.id)) {
        await createNotification({
          recipient: job.creatorId,
          sender: user.id,
          senderName: user.username,
          job: id,
          jobTitle: job.title,
          action: "Comment Added",
          message: `Admin ${user.username} left a comment on "${job.title}": "${message.trim().substring(0, 50)}${message.length > 50 ? "..." : ""}"`,
        });
      }
      if (job.reviewerId && String(job.reviewerId) !== String(user.id)) {
        await createNotification({
          recipient: job.reviewerId,
          sender: user.id,
          senderName: user.username,
          job: id,
          jobTitle: job.title,
          action: "Comment Added",
          message: `Admin ${user.username} left a comment on "${job.title}": "${message.trim().substring(0, 50)}${message.length > 50 ? "..." : ""}"`,
        });
      }
    }

    return Response.json(updatedJob);
  } catch (err) {
    return Response.json({ error: err.message || "An error occurred." }, { status: 500 });
  }
}
