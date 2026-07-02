import dns from "dns";
import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;
const MONGODB_DNS_SERVERS = process.env.MONGODB_DNS_SERVERS?.split(",").map(
  (server) => server.trim()
) || ["8.8.8.8", "1.1.1.1"];

export const connectDB = async () => {
  if (!MONGODB_URI) {
    throw new Error("MONGODB_URI is not defined");
  }

  if (mongoose.connection.readyState >= 1) return;

  dns.setServers(MONGODB_DNS_SERVERS);

  await mongoose.connect(MONGODB_URI);
};
