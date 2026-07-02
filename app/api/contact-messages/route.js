import { createContactMessage, getContactMessages } from "@/lib/contact-message-service";
import { ADMIN_ROLES } from "@/lib/admin-access";
import { requireApiRole } from "@/lib/auth";

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

function validateMessage(message) {
  const normalized = requireField(message, "Message");

  if (normalized.length < 20) {
    throw new Error("Message must be at least 20 characters.");
  }

  return normalized;
}

function normalizeOptional(value) {
  return typeof value === "string" ? value.trim() : "";
}

export async function GET() {
  const { error } = await requireApiRole([ADMIN_ROLES.ADMIN]);

  if (error) {
    return error;
  }

  const messages = await getContactMessages();
  return Response.json(messages);
}

export async function POST(req) {
  try {
    const body = await req.json();

    const message = await createContactMessage({
      name: requireField(body.name, "Name"),
      company: normalizeOptional(body.company),
      email: validateEmail(body.email),
      phone: normalizeOptional(body.phone),
      message: validateMessage(body.message),
    });

    return Response.json(message, { status: 201 });
  } catch (error) {
    return Response.json(
      { error: error.message || "Unable to send contact message." },
      { status: 400 }
    );
  }
}
