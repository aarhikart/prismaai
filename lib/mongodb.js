import dns from "dns";
import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;
const MONGODB_DNS_SERVERS = process.env.MONGODB_DNS_SERVERS
  ? process.env.MONGODB_DNS_SERVERS.split(",").map((server) => server.trim())
  : null;

export const connectDB = async () => {
  if (!MONGODB_URI) {
    throw new Error("MONGODB_URI is not defined");
  }

  if (mongoose.connection.readyState >= 1) return;

  if (MONGODB_DNS_SERVERS && MONGODB_DNS_SERVERS.length > 0) {
    dns.setServers(MONGODB_DNS_SERVERS);
  }

  await mongoose.connect(MONGODB_URI);
};
