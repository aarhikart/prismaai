const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");

// Parse MONGODB_URI from .env.local
const envPath = path.join(__dirname, ".env.local");
let MONGODB_URI = "";
if (fs.existsSync(envPath)) {
  const content = fs.readFileSync(envPath, "utf-8");
  const match = content.match(/MONGODB_URI\s*=\s*([^\s]+)/);
  if (match) {
    MONGODB_URI = match[1];
  }
}

if (!MONGODB_URI) {
  console.error("MONGODB_URI is not defined");
  process.exit(1);
}

// Schemas & Models
const JobApplicationSchema = new mongoose.Schema(
  {
    jobId: { type: String, default: "", trim: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    roleTitle: { type: String, required: true },
    resumeUrl: { type: String, required: true },
    resumeFileName: { type: String, required: true },
    status: { type: String, default: "new" },
    statusUpdatedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);
const JobApplication = mongoose.models.JobApplication || mongoose.model("JobApplication", JobApplicationSchema);

const PocRequestSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    company: { type: String, required: true },
    industry: { type: String, required: true },
    industries: [String],
    message: { type: String, default: "" },
    status: { type: String, default: "new" },
  },
  { timestamps: true }
);
const PocRequest = mongoose.models.PocRequest || mongoose.model("PocRequest", PocRequestSchema);

const ContactMessageSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    company: { type: String, default: "" },
    email: { type: String, required: true },
    phone: { type: String, default: "" },
    message: { type: String, required: true },
    status: { type: String, default: "new" },
  },
  { timestamps: true }
);
const ContactMessage = mongoose.models.ContactMessage || mongoose.model("ContactMessage", ContactMessageSchema);

const NotificationSchema = new mongoose.Schema(
  {
    recipient: { type: mongoose.Schema.Types.ObjectId, required: true },
    sender: { type: mongoose.Schema.Types.ObjectId, required: true },
    senderName: { type: String, required: true },
    job: { type: mongoose.Schema.Types.ObjectId },
    jobTitle: { type: String },
    action: { type: String, required: true },
    message: { type: String, required: true },
    read: { type: Boolean, default: false },
  },
  { timestamps: true }
);
const Notification = mongoose.models.Notification || mongoose.model("Notification", NotificationSchema);

const AdminUser = mongoose.models.AdminUser || mongoose.model("AdminUser", new mongoose.Schema({}, { strict: false, collection: "adminusers" }));

// Helper data generator lists
const firstNames = ["John", "Sarah", "Alex", "David", "Emma", "Michael", "Sophia", "Daniel", "Olivia", "James", "Emily", "Robert", "Grace", "William", "Chloe", "Joseph", "Mia", "Matthew", "Ava", "Andrew"];
const lastNames = ["Doe", "Smith", "Johnson", "Brown", "Taylor", "Miller", "Wilson", "Davis", "Jones", "Anderson", "Thomas", "Jackson", "White", "Harris", "Martin", "Thompson", "Garcia", "Martinez", "Robinson", "Clark"];
const roles = ["Software Engineer", "Frontend Developer", "Backend Engineer", "Product Manager", "UI/UX Designer", "DevOps Engineer", "Marketing Lead", "HR Specialist", "Sales Executive", "Solution Architect"];
const companies = ["ABC Pvt Ltd", "Acme Corp", "Globex Corporation", "Stark Industries", "Wayne Enterprises", "Initech", "Umbrella Corp", "Cyberdyne Systems", "Hooli", "Soylent Corp"];
const industries = ["Technology", "Healthcare", "Finance", "Education", "Real Estate", "Automotive", "Retail", "Manufacturing", "Entertainment", "Logistics"];
const messages = [
  "Interested in exploring a collaboration for our upcoming enterprise scaling project.",
  "Looking to understand your security compliance and data protection practices.",
  "Requesting a proof-of-concept setup for our system integration team.",
  "We are highly interested in your software solutions and want to schedule a brief demo call.",
  "Could you provide more details regarding your pricing models and enterprise SLA options?"
];

// Helper: Get random item
function randomItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

// Helper: Get random date between start and end
function randomDate(start, end) {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

async function seed() {
  console.log("Connecting to MongoDB...");
  await mongoose.connect(MONGODB_URI);
  console.log("Connected successfully!");

  // Clear existing collections
  console.log("Clearing existing data...");
  await JobApplication.deleteMany({});
  await PocRequest.deleteMany({});
  await ContactMessage.deleteMany({});
  console.log("Collections cleared!");

  const now = new Date();
  // 1. Seed Job Applications (1245 total: 425 under review, 510 shortlisted, 310 not shortlisted)
  // Distribution: 40% in 2025, 60% in 2026 (Jan to July)
  const jobApps = [];
  const start2025 = new Date("2025-01-01T00:00:00Z");
  const end2025 = new Date("2025-12-31T23:59:59Z");
  const start2026 = new Date("2026-01-01T00:00:00Z");
  const end2026 = now; // current time in 2026

  const jobAppStatuses = [
    { status: "under review", count: 425 },
    { status: "shortlisted", count: 510 },
    { status: "not shortlisted", count: 310 }
  ];

  console.log("Generating 1245 Job Applications...");
  for (const group of jobAppStatuses) {
    for (let i = 0; i < group.count; i++) {
      const is2025 = Math.random() < 0.4;
      const createdAt = randomDate(is2025 ? start2025 : start2026, is2025 ? end2025 : end2026);
      
      const fName = randomItem(firstNames);
      const lName = randomItem(lastNames);
      jobApps.push({
        jobId: "",
        firstName: fName,
        lastName: lName,
        email: `${fName.toLowerCase()}.${lName.toLowerCase()}@example.com`,
        phone: `+91 ${Math.floor(6000000000 + Math.random() * 4000000000)}`,
        roleTitle: randomItem(roles),
        resumeUrl: "/uploads/job/resumefiles/dummy-resume.pdf",
        resumeFileName: "resume.pdf",
        status: group.status,
        createdAt,
        updatedAt: createdAt,
        statusUpdatedAt: createdAt
      });
    }
  }

  // Insert Job Applications in batches
  console.log("Inserting Job Applications into Database...");
  await JobApplication.insertMany(jobApps);
  console.log("Inserted Job Applications successfully.");

  // 2. Seed POC Requests (356 total: 72 under review, 201 approved, 83 rejected)
  const pocRequests = [];
  const pocStatuses = [
    { status: "under review", count: 72 },
    { status: "approved", count: 201 },
    { status: "rejected", count: 83 }
  ];

  console.log("Generating 356 POC Requests...");
  for (const group of pocStatuses) {
    for (let i = 0; i < group.count; i++) {
      const is2025 = Math.random() < 0.4;
      const createdAt = randomDate(is2025 ? start2025 : start2026, is2025 ? end2025 : end2026);

      const fName = randomItem(firstNames);
      const lName = randomItem(lastNames);
      pocRequests.push({
        fullName: `${fName} ${lName}`,
        email: `${fName.toLowerCase()}@company.com`,
        company: randomItem(companies),
        industry: randomItem(industries),
        industries: [randomItem(industries)],
        message: randomItem(messages),
        status: group.status,
        createdAt,
        updatedAt: createdAt
      });
    }
  }

  console.log("Inserting POC Requests into Database...");
  await PocRequest.insertMany(pocRequests);
  console.log("Inserted POC Requests successfully.");

  // 3. Seed Contact Messages (187 total: 45 under review, 98 contacted, 44 ignored)
  const contactMessages = [];
  const contactStatuses = [
    { status: "under review", count: 45 },
    { status: "contacted", count: 98 },
    { status: "ignored", count: 44 }
  ];

  console.log("Generating 187 Contact Messages...");
  for (const group of contactStatuses) {
    for (let i = 0; i < group.count; i++) {
      const is2025 = Math.random() < 0.4;
      const createdAt = randomDate(is2025 ? start2025 : start2026, is2025 ? end2025 : end2026);

      const fName = randomItem(firstNames);
      const lName = randomItem(lastNames);
      contactMessages.push({
        name: `${fName} ${lName}`,
        company: randomItem(companies),
        email: `${fName.toLowerCase()}@example.com`,
        phone: `+91 ${Math.floor(6000000000 + Math.random() * 4000000000)}`,
        message: randomItem(messages),
        status: group.status,
        createdAt,
        updatedAt: createdAt
      });
    }
  }

  console.log("Inserting Contact Messages into Database...");
  await ContactMessage.insertMany(contactMessages);
  console.log("Inserted Contact Messages successfully.");

  // 4. Seed notifications for all Admin & HR users
  // We will create the 3 requested recent notifications:
  // - John Doe (Job Application, 2 min ago)
  // - Sarah (Contact Message, 12 min ago)
  // - ABC Pvt Ltd (POC Request, 30 min ago)
  console.log("Fetching staff members to assign notifications...");
  const staff = await AdminUser.find({
    role: { $in: ["Admin", "HR"] }
  });

  if (staff.length > 0) {
    console.log(`Found ${staff.length} staff members. Creating recent notifications...`);
    const notificationsToInsert = [];

    // Create the recent documents first so notifications align (or we can just create notification entries)
    // Job Application: John Doe (2 min ago)
    const johnDoeApp = await JobApplication.create({
      jobId: "",
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@example.com",
      phone: "+91 98765 43210",
      roleTitle: "Senior Frontend Engineer",
      resumeUrl: "/uploads/job/resumefiles/dummy-resume.pdf",
      resumeFileName: "resume.pdf",
      status: "new",
      createdAt: new Date(now.getTime() - 2 * 60 * 1000), // 2 min ago
      updatedAt: new Date(now.getTime() - 2 * 60 * 1000)
    });

    // Contact Message: Sarah (12 min ago)
    const sarahMsg = await ContactMessage.create({
      name: "Sarah",
      company: "Innovate LLC",
      email: "sarah@innovate.com",
      phone: "+1 555-0199",
      message: "Hello! We are looking to collaborate with your organization regarding cloud infrastructure services.",
      status: "new",
      createdAt: new Date(now.getTime() - 12 * 60 * 1000), // 12 min ago
      updatedAt: new Date(now.getTime() - 12 * 60 * 1000)
    });

    // POC Request: ABC Pvt Ltd (30 min ago)
    const abcPoc = await PocRequest.create({
      fullName: "David Miller",
      email: "dmiller@abcpvtltd.com",
      company: "ABC Pvt Ltd",
      industry: "Technology",
      industries: ["Technology"],
      message: "We request a detailed POC implementation structure for evaluation purposes.",
      status: "new",
      createdAt: new Date(now.getTime() - 30 * 60 * 1000), // 30 min ago
      updatedAt: new Date(now.getTime() - 30 * 60 * 1000)
    });

    for (const member of staff) {
      // John Doe (2 min ago)
      notificationsToInsert.push({
        recipient: member._id,
        sender: member._id,
        senderName: "System",
        action: "New Application",
        message: `New application received for "Senior Frontend Engineer" from John Doe.`,
        read: false,
        createdAt: new Date(now.getTime() - 2 * 60 * 1000),
        updatedAt: new Date(now.getTime() - 2 * 60 * 1000)
      });

      // Sarah (12 min ago)
      notificationsToInsert.push({
        recipient: member._id,
        sender: member._id,
        senderName: "System",
        action: "New Contact Message",
        message: `New contact message received from Sarah (Innovate LLC).`,
        read: false,
        createdAt: new Date(now.getTime() - 12 * 60 * 1000),
        updatedAt: new Date(now.getTime() - 12 * 60 * 1000)
      });

      // ABC Pvt Ltd (30 min ago)
      notificationsToInsert.push({
        recipient: member._id,
        sender: member._id,
        senderName: "System",
        action: "New POC Request",
        message: `New POC request received from ABC Pvt Ltd (David Miller).`,
        read: false,
        createdAt: new Date(now.getTime() - 30 * 60 * 1000),
        updatedAt: new Date(now.getTime() - 30 * 60 * 1000)
      });
    }

    await Notification.insertMany(notificationsToInsert);
    console.log("Seeded recent notifications successfully.");
  } else {
    console.log("No staff members found in database, skipped notification seeding.");
  }

  console.log("Closing connection...");
  await mongoose.connection.close();
  console.log("Database successfully seeded!");
}

seed().catch(console.error);
