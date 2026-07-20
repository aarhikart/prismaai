import { connectDB } from "@/lib/mongodb";
import WebsiteVisitor from "@/models/WebsiteVisitor";

export const dynamic = "force-dynamic";

export async function POST() {
  try {
    await connectDB();
    const visitorCounter = await WebsiteVisitor.findOneAndUpdate(
      { key: "landing-page" },
      { $inc: { total: 1 }, $setOnInsert: { key: "landing-page" } },
      { new: true, upsert: true }
    ).lean();

    return Response.json({ total: visitorCounter.total });
  } catch (error) {
    return Response.json(
      { error: error.message || "Unable to track visitor." },
      { status: 500 }
    );
  }
}
