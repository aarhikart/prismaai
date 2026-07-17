import { deletePocRequest, updatePocRequestStatus } from "@/lib/poc-request-service";
import { ADMIN_ROLES } from "@/lib/admin-access";
import { requireApiRole } from "@/lib/auth";

// HANDLES DELETING POC REQUESTS
export async function DELETE(req, { params }) {
  try {
    // 1. Enforce admin role authentication checks
    const { error } = await requireApiRole([ADMIN_ROLES.ADMIN]);
    if (error) {
      return error;
    }
 
    // 2. Destructure the dynamic path parameter
    const { id } = await params; 
    if (!id) {
      return Response.json({ error: "POC Request ID is required." }, { status: 400 });
    }

    // 3. Invoke the database operation from service
    await deletePocRequest(id);

    return Response.json({ message: "POC request deleted successfully." }, { status: 200 });
  } catch (error) {
    console.error("DELETE POC Request API Error:", error);
    return Response.json(
      { error: error.message || "Unable to delete POC request." },
      { status: 500 }
    );
  }
}

// HANDLES UPDATING STATUS
export async function PATCH(req, { params }) {
  try {
    // 1. Enforce admin role authentication checks
    const { error, user } = await requireApiRole([ADMIN_ROLES.ADMIN]);
    if (error) {
      return error;
    }

    // 2. Destructure path dynamic values
    const { id } = await params;
    if (!id) {
      return Response.json({ error: "POC Request ID is required." }, { status: 400 });
    }

    // 3. Extract the new status value payload from request body
    const body = await req.json();
    if (!body.status) {
      return Response.json({ error: "Status field payload is required." }, { status: 400 });
    }

    // 4. Update status and save status history
    const updatedRecord = await updatePocRequestStatus(id, body.status, user.username);

    return Response.json({ 
      message: "POC request status updated successfully.",
      pocRequest: updatedRecord
    }, { status: 200 });
  } catch (error) {
    console.error("PATCH POC Request API Error:", error);
    return Response.json(
      { error: error.message || "Unable to update POC request status." },
      { status: 500 }
    );
  }
}
