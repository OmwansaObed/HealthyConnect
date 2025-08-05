import { connectDB } from "../../../lib/db.js";
import Job from "../../../models/Job.js";
import Notification from "../../../models/Notifications.js";
import User from "../../../models/User.js";
import { transporter, mailOptions } from "../../../utils/nodemailer.js";
import { NextResponse } from "next/server";
import { jobNotificationTemplate } from "../../../utils/templates/JobNotificationTemplate.js";

class ProfessionMatcher {
  constructor() {
    this.professionMappings = {
      // Medical Professionals
      "medical officer": {
        keywords: [
          "medical officer",
          "medical officers",
          "medical doctor",
          "physician",
          "general practitioner",
          "gp",
          "md",
        ],
        priority: 1,
      },
      "clinical officer": {
        keywords: [
          "clinical officer",
          "clinical officers",
          "registered clinical officer",
          "rco",
          "clinical associate",
        ],
        priority: 1,
      },

      // Nursing Professionals
      nursing: {
        keywords: [
          "registered nurse",
          "staff nurse",
          "ward nurse",
          "icu nurse",
          "theatre nurse",
          "charge nurse",
          "head nurse",
          "nursing supervisor",
          "nursing",
          "nurses",
          "nurse",
          "rn",
        ],
        priority: 2,
      },
      cna: {
        keywords: [
          "certified nursing assistant",
          "nursing assistant",
          "care assistant",
          "healthcare assistant",
          "patient care assistant",
          "cna",
          "cnas",
        ],
        priority: 2,
      },

      // Allied Health Professionals
      pharmacy: {
        keywords: [
          "pharmacist",
          "pharmacy technician",
          "pharmaceutical technician",
          "pharmacy",
          "pharmaceutical",
          "drug dispenser",
          "medication specialist",
          "pharmtech",
          "pharm tech",
        ],
        priority: 2,
      },
      laboratory: {
        keywords: [
          "laboratory technician",
          "lab technician",
          "medical technologist",
          "laboratory scientist",
          "pathology technician",
          "lab tech",
          "medical laboratory",
          "laboratory",
          "lab scientist",
        ],
        priority: 2,
      },
      radiology: {
        keywords: [
          "radiologic technologist",
          "radiology technician",
          "imaging technician",
          "x-ray technician",
          "ct technician",
          "mri technician",
          "ultrasound technician",
          "radiologist",
          "radiology",
          "medical imaging",
        ],
        priority: 2,
      },

      // Specialized Medical Fields
      anesthesiology: {
        keywords: [
          "anesthesiologist",
          "anesthetist",
          "anesthesia technician",
          "anesthesiology",
          "perioperative nurse",
        ],
        priority: 1,
      },
      surgery: {
        keywords: [
          "surgeon",
          "surgical technician",
          "operating room technician",
          "surgery",
          "surgical specialist",
          "scrub nurse",
          "or nurse",
        ],
        priority: 1,
      },
      "emergency medical technician (emt)": {
        keywords: [
          "emergency medical technician",
          "paramedic",
          "emt",
          "first responder",
          "ambulance technician",
          "emergency care technician",
          "pre-hospital care",
        ],
        priority: 1,
      },

      // Therapy and Rehabilitation
      physiotherapy: {
        keywords: [
          "physiotherapist",
          "physical therapist",
          "physiotherapy",
          "physical therapy",
          "rehabilitation therapist",
          "pt",
        ],
        priority: 2,
      },
      "occupational therapy": {
        keywords: [
          "occupational therapist",
          "occupational therapy",
          "rehabilitation specialist",
          "ot",
        ],
        priority: 2,
      },
      "speech therapy": {
        keywords: [
          "speech therapist",
          "speech pathologist",
          "communication specialist",
          "speech therapy",
          "slp",
        ],
        priority: 2,
      },

      // Mental Health
      psychology: {
        keywords: [
          "psychologist",
          "clinical psychologist",
          "counseling psychologist",
          "psychology",
          "mental health counselor",
          "therapist",
        ],
        priority: 2,
      },
      psychiatry: {
        keywords: [
          "psychiatrist",
          "psychiatric nurse",
          "mental health specialist",
          "psychiatry",
          "behavioral health specialist",
        ],
        priority: 1,
      },

      // Specialized Care
      midwifery: {
        keywords: [
          "midwife",
          "certified midwife",
          "nurse midwife",
          "midwifery",
          "maternal health specialist",
          "delivery specialist",
        ],
        priority: 2,
      },
      pediatrics: {
        keywords: [
          "pediatrician",
          "pediatric nurse",
          "child health specialist",
          "pediatrics",
          "children's health",
          "pediatric specialist",
        ],
        priority: 1,
      },
      gynecology: {
        keywords: [
          "gynecologist",
          "obstetrician",
          "women's health specialist",
          "gynecology",
          "obstetrics",
          "reproductive health",
        ],
        priority: 1,
      },
      orthopedics: {
        keywords: [
          "orthopedic surgeon",
          "orthopedic specialist",
          "bone specialist",
          "orthopedics",
          "musculoskeletal specialist",
          "joint specialist",
        ],
        priority: 1,
      },

      // Diagnostic and Technical
      nutritionist: {
        keywords: [
          "nutritionist",
          "dietitian",
          "clinical nutritionist",
          "nutrition specialist",
          "dietary consultant",
        ],
        priority: 2,
      },
      dental: {
        keywords: [
          "dentist",
          "dental hygienist",
          "dental assistant",
          "dental technician",
          "oral health specialist",
          "orthodontist",
        ],
        priority: 2,
      },
      optometry: {
        keywords: [
          "optometrist",
          "optician",
          "eye care specialist",
          "optometry",
          "vision specialist",
          "eye health",
        ],
        priority: 2,
      },

      // Public Health and Community
      "public health officer": {
        keywords: [
          "public health officer",
          "health surveillance officer",
          "public health specialist",
          "health inspector",
          "epidemiologist",
        ],
        priority: 2,
      },
      "community health worker": {
        keywords: [
          "community health worker",
          "community health volunteer",
          "health promoter",
          "chw",
          "chv",
          "community outreach worker",
        ],
        priority: 3,
      },
      "environmental health officer": {
        keywords: [
          "environmental health officer",
          "sanitation officer",
          "environmental health specialist",
          "health and safety officer",
        ],
        priority: 2,
      },

      // Care and Support Services
      "care giver": {
        keywords: [
          "caregiver",
          "care giver",
          "patient care aide",
          "personal care assistant",
          "home health aide",
        ],
        priority: 3,
      },
      "home-based caregiver": {
        keywords: [
          "home-based caregiver",
          "home care aide",
          "in-home caregiver",
          "domiciliary care worker",
          "private duty nurse",
        ],
        priority: 3,
      },

      // Administrative and Support
      "health administration": {
        keywords: [
          "health administrator",
          "hospital administrator",
          "health management",
          "healthcare administrator",
          "medical administrator",
        ],
        priority: 3,
      },
      "health records officer": {
        keywords: [
          "health records officer",
          "medical records clerk",
          "health information technician",
          "medical coding specialist",
        ],
        priority: 3,
      },

      // Technical and Engineering
      "medical technician": {
        keywords: [
          "medical technician",
          "biomedical technician",
          "health technician",
          "clinical technician",
          "medical equipment technician",
        ],
        priority: 2,
      },
      "medical engineer": {
        keywords: [
          "biomedical engineer",
          "medical engineer",
          "clinical engineer",
          "healthcare technology specialist",
        ],
        priority: 2,
      },
      "biomedical scientist": {
        keywords: [
          "biomedical scientist",
          "medical scientist",
          "clinical scientist",
          "laboratory scientist",
          "research scientist",
        ],
        priority: 2,
      },

      // Specialized Services
      "social worker": {
        keywords: [
          "medical social worker",
          "healthcare social worker",
          "social worker",
          "case manager",
          "patient advocate",
        ],
        priority: 3,
      },
      "health educator": {
        keywords: [
          "health educator",
          "wellness coordinator",
          "health promotion specialist",
          "community educator",
          "patient educator",
        ],
        priority: 3,
      },
      "hiv/aids counselor": {
        keywords: [
          "hiv counselor",
          "aids counselor",
          "vct counselor",
          "hiv/aids counselor",
          "testing counselor",
          "prevention counselor",
        ],
        priority: 2,
      },

      // Sales and Insurance
      "medical sales rep": {
        keywords: [
          "medical sales representative",
          "pharmaceutical sales rep",
          "healthcare sales",
          "medical device sales",
          "pharma rep",
        ],
        priority: 3,
      },
      "health insurance agent": {
        keywords: [
          "health insurance agent",
          "medical insurance advisor",
          "healthcare insurance specialist",
          "benefits coordinator",
        ],
        priority: 3,
      },

      // Support and Auxiliary Services
      "hospital porter": {
        keywords: [
          "hospital porter",
          "medical porter",
          "patient transport aide",
          "hospital transport",
          "medical transport",
        ],
        priority: 4,
      },
      "hospital cleaner": {
        keywords: [
          "hospital cleaner",
          "medical facility cleaner",
          "healthcare cleaner",
          "hospital housekeeping",
          "medical sanitation",
        ],
        priority: 4,
      },
      "ambulance driver": {
        keywords: [
          "ambulance driver",
          "emergency driver",
          "medical transport driver",
          "ems driver",
          "patient transport driver",
        ],
        priority: 3,
      },

      // Emerging Fields
      telemedicine: {
        keywords: [
          "telemedicine specialist",
          "telehealth coordinator",
          "virtual care provider",
          "remote healthcare",
          "digital health",
        ],
        priority: 2,
      },

      // Specialized Officers
      "occupational health officer": {
        keywords: [
          "occupational health officer",
          "workplace health specialist",
          "industrial health officer",
          "employee health coordinator",
        ],
        priority: 2,
      },
      "vaccination outreach": {
        keywords: [
          "vaccination coordinator",
          "immunization specialist",
          "vaccine outreach worker",
          "vaccination campaign worker",
        ],
        priority: 3,
      },

      // Other Services
      "mortuary attendant": {
        keywords: [
          "mortuary attendant",
          "funeral home attendant",
          "morgue assistant",
          "pathology assistant",
        ],
        priority: 4,
      },
      "first responder": {
        keywords: [
          "first responder",
          "emergency responder",
          "crisis responder",
          "disaster response",
          "emergency services",
        ],
        priority: 2,
      },
      coho: {
        keywords: ["coho"],
      },
    };
  }

  createWordBoundaryRegex(keyword) {
    const escapedKeyword = keyword.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    return new RegExp(`\\b${escapedKeyword}\\b`, "i");
  }

  matchesKeyword(jobText, keyword) {
    if (keyword.includes(" ")) {
      return jobText.includes(keyword.toLowerCase());
    }
    const regex = this.createWordBoundaryRegex(keyword);
    return regex.test(jobText);
  }

  mapJobToProfessions(jobCategory, jobTitle, jobDescription) {
    const jobText = `${jobCategory || ""} ${jobTitle || ""} ${
      jobDescription || ""
    }`
      .toLowerCase()
      .trim();

    if (!jobText) return [];

    const matchedProfessions = [];
    const matchDetails = {};

    const sortedProfessions = Object.entries(this.professionMappings).sort(
      ([, a], [, b]) => a.priority - b.priority
    );

    for (const [profession, config] of sortedProfessions) {
      const matchedKeywords = config.keywords.filter((keyword) =>
        this.matchesKeyword(jobText, keyword)
      );

      if (matchedKeywords.length > 0) {
        matchedProfessions.push(profession);
        matchDetails[profession] = {
          matchedKeywords,
          priority: config.priority,
        };
      }
    }

    if (matchedProfessions.length > 1) {
      const highestPriority = Math.min(
        ...matchedProfessions.map((p) => matchDetails[p].priority)
      );
      return matchedProfessions.filter(
        (p) => matchDetails[p].priority === highestPriority
      );
    }

    return matchedProfessions;
  }
}

class JobNotificationService {
  constructor() {
    this.maxEmailsPerBatch = 50;
    this.emailDelay = 50;
    this.professionMatcher = new ProfessionMatcher();
  }

  async sendSingleNotification(email, username, jobData) {
    try {
      await transporter.sendMail({
        ...mailOptions,
        to: email,
        subject: this.generateEmailSubject(jobData),
        html: jobNotificationTemplate(
          username || "Healthcare Professional",
          jobData.title,
          jobData.description || "No description provided",
          jobData.location || {},
          jobData.postedBy || "Not listed",
          jobData._id,
          jobData.type || "Not specified"
        ),
      });
      return { success: true, email };
    } catch (error) {
      console.error(`Failed to send to ${email}:`, error.message);
      return { success: false, email, error: error.message };
    }
  }

  async sendNotificationsAsync(jobData) {
    try {
      const targetProfessions = this.professionMatcher.mapJobToProfessions(
        jobData.category,
        jobData.title,
        jobData.description
      );

      if (targetProfessions.length === 0) {
        console.log("No matching professions found - skipping notifications");
        return;
      }

      const targetUsers = await User.find({
        profession: { $in: targetProfessions },
        email: { $exists: true, $ne: null, $ne: "" },
      })
        .select("email username profession location")
        .limit(this.maxEmailsPerBatch)
        .lean();

      if (targetUsers.length === 0) {
        console.log("No users found for matched professions");
        return;
      }

      // Start sending emails in background without waiting
      this.sendEmailsInBackground(targetUsers, jobData);
    } catch (error) {
      console.error("Notification error:", error);
    }
  }

  async sendEmailsInBackground(users, jobData) {
    try {
      for (const [index, user] of users.entries()) {
        if (index > 0 && this.emailDelay > 0) {
          await new Promise((resolve) => setTimeout(resolve, this.emailDelay));
        }
        await this.sendSingleNotification(user.email, user.username, jobData);
      }
    } catch (error) {
      console.error("Background email sending error:", error);
    }
  }

  generateEmailSubject(jobData) {
    const location =
      jobData.location?.county || jobData.location?.state || "Kenya";
    const jobType = jobData.type ? ` (${jobData.type})` : "";
    return `🎯 New ${jobData.title} Position${jobType} - ${location}`;
  }
}

class JobValidator {
  static validatePhoneNumber(phone) {
    if (!phone || phone.trim() === "") return true;
    const cleanPhone = phone.trim();
    const validPrefixes = ["07", "011", "+254", "01"];
    return validPrefixes.some((prefix) => cleanPhone.startsWith(prefix));
  }

  static validateRequiredFields(data) {
    const errors = [];
    if (!data.title || data.title.trim() === "") {
      errors.push("Job title is required");
    }
    return errors;
  }

  static validateOptionalFields(data) {
    const errors = [];
    if (data.phone && !this.validatePhoneNumber(data.phone)) {
      errors.push("Phone number must start with 07, 011, +254, or 01");
    }
    return errors;
  }

  static sanitizeJobData(data) {
    const cleanedData = {
      ...data,
      title: data.title?.trim(),
      description: data.description?.trim(),
      phone: data.phone?.trim(),
      postedBy: data.postedBy?.trim(),
      salary: data.salary?.trim(),
      type: data.type,
      experience: data.experience,
      category: data.category,
      location: {
        state: data.location?.state?.trim() || "",
        county: data.location?.county?.trim() || "",
      },
      preference: {
        gender: data.preference?.gender || "any",
        age: data.preference?.age || "any",
        contactType: data.preference?.contactType || "any",
        time: data.preference?.time || "any",
        certificate: data.preference?.certificate || "any",
        completedRecently: Boolean(data.preference?.completedRecently),
      },
    };
    return cleanedData;
  }
}

const notificationService = new JobNotificationService();

export async function POST(request) {
  try {
    await connectDB();
    const data = await request.json();

    const requiredFieldErrors = JobValidator.validateRequiredFields(data);
    if (requiredFieldErrors.length > 0) {
      return NextResponse.json(
        { error: requiredFieldErrors.join(", ") },
        { status: 400 }
      );
    }

    const optionalFieldErrors = JobValidator.validateOptionalFields(data);
    if (optionalFieldErrors.length > 0) {
      return NextResponse.json(
        { error: optionalFieldErrors.join(", ") },
        { status: 400 }
      );
    }

    const cleanedData = JobValidator.sanitizeJobData(data);
    const job = await Job.create(cleanedData);

    await Notification.create({
      type: "job_posted",
      message: `${job.title}position was posted`,
      jobId: job._id,
    });

    // Start notifications in background without waiting
    notificationService
      .sendNotificationsAsync(job)
      .catch((err) => console.error("Background notification error:", err));

    return NextResponse.json(
      {
        success: true,
        job,
        message: "Job posted successfully. Notifications are being sent.",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Job creation error:", error);
    if (error.name === "ValidationError") {
      const validationErrors = Object.values(error.errors).map(
        (err) => err.message
      );
      return NextResponse.json(
        { error: `Validation failed: ${validationErrors.join(", ")}` },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: error.message || "Failed to create job" },
      { status: 500 }
    );
  }
}

export async function GET(request) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page")) || 1;
    const limit = parseInt(searchParams.get("limit")) || 50;
    const category = searchParams.get("category");
    const location = searchParams.get("location");
    const type = searchParams.get("type");

    const filter = {};
    if (category) filter.category = category;
    if (location) {
      filter.$or = [
        { "location.county": new RegExp(location, "i") },
        { "location.state": new RegExp(location, "i") },
      ];
    }
    if (type) filter.type = type;

    const skip = (page - 1) * limit;
    const [jobs, total] = await Promise.all([
      Job.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
      Job.countDocuments(filter),
    ]);

    return NextResponse.json({
      success: true,
      jobs,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        totalJobs: total,
        hasNextPage: page < Math.ceil(total / limit),
        hasPrevPage: page > 1,
      },
    });
  } catch (error) {
    console.error("Jobs fetch error:", error);
    return NextResponse.json(
      { error: "Failed to fetch jobs" },
      { status: 500 }
    );
  }
}

export async function PATCH(request) {
  try {
    await connectDB();
    const { id, ...updateData } = await request.json();

    if (!id) {
      return NextResponse.json(
        { error: "Job ID is required" },
        { status: 400 }
      );
    }

    if (Object.keys(updateData).length === 0) {
      return NextResponse.json(
        { error: "At least one field to update is required" },
        { status: 400 }
      );
    }

    const optionalFieldErrors = JobValidator.validateOptionalFields(updateData);
    if (optionalFieldErrors.length > 0) {
      return NextResponse.json(
        { error: optionalFieldErrors.join(", ") },
        { status: 400 }
      );
    }

    const updatedJob = await Job.findByIdAndUpdate(
      id,
      { $set: updateData, updatedAt: new Date() },
      { new: true, runValidators: true }
    );

    if (!updatedJob) {
      return NextResponse.json({ error: "Job not found" }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      job: updatedJob,
    });
  } catch (error) {
    console.error("Job update error:", error);
    if (error.name === "ValidationError") {
      const validationErrors = Object.values(error.errors).map(
        (err) => err.message
      );
      return NextResponse.json(
        { error: `Validation failed: ${validationErrors.join(", ")}` },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: error.message || "Failed to update job" },
      { status: 500 }
    );
  }
}

export async function DELETE(request) {
  try {
    await connectDB();
    const { id } = await request.json();

    if (!id) {
      return NextResponse.json(
        { error: "Job ID is required" },
        { status: 400 }
      );
    }

    const deletedJob = await Job.findByIdAndDelete(id);
    if (!deletedJob) {
      return NextResponse.json({ error: "Job not found" }, { status: 404 });
    }

    await Notification.deleteMany({ jobId: id });
    return NextResponse.json({
      success: true,
      message: "Job deleted successfully",
    });
  } catch (error) {
    console.error("Job deletion error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to delete job" },
      { status: 500 }
    );
  }
}
