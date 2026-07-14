import { ADMIN_ROLES } from "@/lib/admin-access";
import { requireApiRole } from "@/lib/auth";
import { getNotificationsForUser, markAllAsRead } from "@/lib/notification-service";
import Notification from "@/models/Notification";
import { connectDB } from "@/lib/mongodb";

export async function GET() {
  const { error, user } = await requireApiRole([ADMIN_ROLES.ADMIN, ADMIN_ROLES.HR]);
  if (error) return error;

  try {
    const notifications = await getNotificationsForUser(user.id);
    return Response.json({ notifications });
  } catch (err) {
    return Response.json({ error: err.message || "An error occurred." }, { status: 500 });
  }
}

export async function PUT(req) {
  const { error, user } = await requireApiRole([ADMIN_ROLES.ADMIN, ADMIN_ROLES.HR]);
  if (error) return error;

  try {
    const body = await req.json();
    const { id, readAll } = body;

    await connectDB();

    if (readAll) {
      await markAllAsRead(user.id);
    } else if (id) {
      await Notification.updateOne({ _id: id, recipient: user.id }, { read: true });
    } else {
      return Response.json({ error: "Missing parameters." }, { status: 400 });
    }

    return Response.json({ success: true });
  } catch (err) {
    return Response.json({ error: err.message || "An error occurred." }, { status: 500 });
  }
}
