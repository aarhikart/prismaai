import crypto from "crypto";

function getSecret() {
  return process.env.ADMIN_SESSION_SECRET || "local-admin-secret-change-me";
}

function toBase64Url(value) {
  return Buffer.from(value)
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/g, "");
}

function fromBase64Url(value) {
  const normalized = value.replace(/-/g, "+").replace(/_/g, "/");
  const padding = normalized.length % 4 === 0 ? "" : "=".repeat(4 - (normalized.length % 4));
  return Buffer.from(`${normalized}${padding}`, "base64").toString("utf8");
}

function signValue(value) {
  return crypto.createHmac("sha256", getSecret()).update(value).digest("base64url");
}

export function createSessionToken(payload) {
  const json = JSON.stringify(payload);
  const encoded = toBase64Url(json);
  const signature = signValue(encoded);
  return `${encoded}.${signature}`;
}

export function parseSessionToken(token) {
  if (!token || !token.includes(".")) {
    return null;
  }

  const [encoded, signature] = token.split(".");
  const expectedSignature = signValue(encoded);

  try {
    const actualBuffer = Buffer.from(signature);
    const expectedBuffer = Buffer.from(expectedSignature);

    if (
      actualBuffer.length !== expectedBuffer.length ||
      !crypto.timingSafeEqual(actualBuffer, expectedBuffer)
    ) {
      return null;
    }

    const payload = JSON.parse(fromBase64Url(encoded));

    if (!payload?.userId || !payload?.role || Date.now() > payload.expiresAt) {
      return null;
    }

    return payload;
  } catch {
    return null;
  }
}
