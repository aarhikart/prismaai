import { connectDB } from "@/lib/mongodb";
import PocRequest from "@/models/PocRequest";

export async function getPocRequests() {
  await connectDB();
  return PocRequest.find().sort({ createdAt: -1 }).lean();
}

export async function createPocRequest(data) {
  await connectDB();
  return PocRequest.create(data);
}
