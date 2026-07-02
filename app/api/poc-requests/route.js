import { createPocRequest, getPocRequests } from "@/lib/poc-request-service";
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

    return Response.json(pocRequest, { status: 201 });
  } catch (error) {
    return Response.json(
      { error: error.message || "Unable to submit POC request." },
      { status: 400 }
    );
  }
}
