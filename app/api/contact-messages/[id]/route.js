import { deleteContactMessage, updateContactMessageStatus } from "@/lib/contact-message-service";
import { ADMIN_ROLES } from "@/lib/admin-access";
import { requireApiRole } from "@/lib/auth";

// HANDLES DELETING CONTACT MESSAGES
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
      return Response.json({ error: "Contact Message ID is required." }, { status: 400 });
    }

    // 3. Invoke the database operation from service
    await deleteContactMessage(id);

    return Response.json({ message: "Contact message deleted successfully." }, { status: 200 });
  } catch (error) {
    console.error("DELETE Contact Message API Error:", error);
    return Response.json(
      { error: error.message || "Unable to delete contact message." },
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
      return Response.json({ error: "Contact Message ID is required." }, { status: 400 });
    }

    // 3. Extract the new status value payload from request body
    const body = await req.json();
    if (!body.status) {
      return Response.json({ error: "Status field payload is required." }, { status: 400 });
    }

    // 4. Update status and save status history
    const updatedRecord = await updateContactMessageStatus(id, body.status, user.username);

    return Response.json({ 
      message: "Contact message status updated successfully.",
      contactMessage: updatedRecord
    }, { status: 200 });
  } catch (error) {
    console.error("PATCH Contact Message API Error:", error);
    return Response.json(
      { error: error.message || "Unable to update contact message status." },
      { status: 500 }
    );
  }
}
