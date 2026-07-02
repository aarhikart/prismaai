import { authenticateUser, createSession } from "@/lib/auth";

export async function POST(req) {
  try {
    const body = await req.json();
    const username = typeof body?.username === "string" ? body.username : "";
    const password = typeof body?.password === "string" ? body.password : "";

    if (!username.trim() || !password) {
      return Response.json(
        { error: "Username and password are required." },
        { status: 400 }
      );
    }

    const user = await authenticateUser(username, password);

    if (!user) {
      return Response.json({ error: "Invalid username or password." }, { status: 401 });
    }

    await createSession(user);

    return Response.json({
      user: {
        id: user._id.toString(),
        username: user.username,
        role: user.role,
      },
    });
  } catch {
    return Response.json({ error: "Unable to log in." }, { status: 500 });
  }
}
