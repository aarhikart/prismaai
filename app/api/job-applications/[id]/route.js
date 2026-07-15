import { deleteJobApplication, updateJobApplicationStatus } from "@/lib/job-application-service";
import { ADMIN_ROLES } from "@/lib/admin-access";
import { requireApiRole } from "@/lib/auth";

// HANDLES DELETING APPLICATIONS
export async function DELETE(req, { params }) {
  try {
    // 1. Enforce admin role authentication checks
    const { error } = await requireApiRole([ADMIN_ROLES.ADMIN, ADMIN_ROLES.HR]);
    if (error) {
      return error;
    }
 
    // 2. Destructure the dynamic path parameter
    const { id } = await params; 
    if (!id) {
      return Response.json({ error: "Application ID is required." }, { status: 400 });
    }

    // 3. Invoke the database operation from your service
    await deleteJobApplication(id);

    return Response.json({ message: "Application deleted successfully." }, { status: 200 });
  } catch (error) {
    console.error("DELETE API Error:", error);
    return Response.json(
      { error: error.message || "Unable to delete job application." },
      { status: 500 }
    );
  }
}

// HANDLES UPDATING STATUS (MOVING TO REVIEWED / ALTERING SUB-STATUSES)
export async function PATCH(req, { params }) {
  try {
    // 1. Enforce admin role authentication checks
    const { error, user } = await requireApiRole([ADMIN_ROLES.ADMIN, ADMIN_ROLES.HR]);
    if (error) {
      return error;
    }

    // 2. Destructure path dynamic values
    const { id } = await params;
    if (!id) {
      return Response.json({ error: "Application ID is required." }, { status: 400 });
    }

    // 3. Extract the new status value payload from the request body
    const body = await req.json();
    if (!body.status) {
      return Response.json({ error: "Status field payload is required." }, { status: 400 });
    }

    // 4. Update status and save dynamic history timeline tracking logs
    const updatedRecord = await updateJobApplicationStatus(id, body.status, user.username);

    return Response.json({ 
      message: "Application status updated successfully.",
      application: updatedRecord
    }, { status: 200 });
  } catch (error) {
    console.error("PATCH API Error:", error);
    return Response.json(
      { error: error.message || "Unable to update job application status." },
      { status: 500 }
    );
  }
}
