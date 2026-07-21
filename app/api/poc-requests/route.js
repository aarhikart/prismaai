import { createPocRequest, getPocRequests } from "@/lib/poc-request-service";
import { ADMIN_ROLES } from "@/lib/admin-access";
import { requireApiRole } from "@/lib/auth";
import AdminUser from "@/models/AdminUser";
import { createNotification } from "@/lib/notification-service";
import { sendPocEmails } from "@/lib/mailer";

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

function validateIndustry(value) {
  if (typeof value !== "string" || !value.trim()) {
    throw new Error("Industry is required.");
  }

  return value.trim();
}

function validateMessage(message) {
  if (typeof message !== "string" || !message.trim()) {
    return "";
  }

  const normalized = message.trim();
  if (normalized.length < 20) {
    throw new Error("Message must be at least 20 characters when provided.");
  }

  return normalized;
}

export async function GET() {
  const { error } = await requireApiRole([ADMIN_ROLES.ADMIN]);

  if (error) {
    return error;
  }

  const requests = await getPocRequests();
  return Response.json(requests);
}

export async function POST(req) {
  try {
    const body = await req.json();
    const industry = validateIndustry(body.industry);

    const pocRequest = await createPocRequest({
      fullName: requireField(body.fullName, "Full name"),
      email: validateEmail(body.email),
      company: requireField(body.company, "Company name"),
      industry,
      industries: [industry],
      message: validateMessage(body.message),
    });

    // Create notifications for all Admins and HRs
    try {
      const staff = await AdminUser.find({
        role: { $in: [ADMIN_ROLES.ADMIN, ADMIN_ROLES.HR] }
      });
      for (const member of staff) {
        await createNotification({
          recipient: member._id,
          sender: member._id,
          senderName: "System",
          action: "New POC Request",
          message: `New POC request received from ${pocRequest.company} (${pocRequest.fullName}).`,
        });
      }
    } catch (notifError) {
      console.error("Failed to create notifications for POC request:", notifError);
    }

    // Send internal notification email & user auto-reply email via Gmail SMTP
    try {
      await sendPocEmails(pocRequest);
    } catch (emailError) {
      console.error("Failed to send POC emails:", emailError);
    }

    return Response.json(pocRequest, { status: 201 });
  } catch (error) {
    return Response.json(
      { error: error.message || "Unable to submit POC request." },
      { status: 400 }
    );
  }
}
