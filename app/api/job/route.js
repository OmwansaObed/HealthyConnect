import { connectDB } from "../../../lib/db.js";
import Job from "../../../models/Job.js";
import Notification from "../../../models/Notifications.js";
import User from "../../../models/User.js";
import { transporter, mailOptions } from "../../../utils/nodemailer.js";
import { NextResponse } from "next/server";
import { jobNotificationTemplate } from "../../../utils/templates/JobNotificationTemplate.js";

/**
 * Enhanced profession mapping with better keyword specificity
 * Uses exact phrase matching and word boundaries to prevent false positives
 */
class ProfessionMatcher {
  constructor() {
    // Ordered by specificity - more specific professions first
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

  /**
   * Create word boundary regex for better matching
   */
  createWordBoundaryRegex(keyword) {
    const escapedKeyword = keyword.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    return new RegExp(`\\b${escapedKeyword}\\b`, "i");
  }

  /**
   * Check if a keyword matches in the job text
   */
  matchesKeyword(jobText, keyword) {
    // For multi-word phrases, use includes
    if (keyword.includes(" ")) {
      return jobText.includes(keyword.toLowerCase());
    }

    // For single words, use word boundaries to prevent partial matches
    const regex = this.createWordBoundaryRegex(keyword);
    return regex.test(jobText);
  }

  /**
   * Map job details to relevant professions
   */
  mapJobToProfessions(jobCategory, jobTitle, jobDescription) {
    const jobText = `${jobCategory || ""} ${jobTitle || ""} ${
      jobDescription || ""
    }`
      .toLowerCase()
      .trim();

    if (!jobText) {
      console.log("No job text provided for profession matching");
      return [];
    }

    console.log("Analyzing job text:", jobText);

    const matchedProfessions = [];
    const matchDetails = {};

    // Sort professions by priority (lower number = higher priority)
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

        console.log(
          `✓ ${profession} matched (priority ${config.priority}):`,
          matchedKeywords
        );
      }
    }

    // If we have multiple matches, prefer higher priority (lower number) professions
    if (matchedProfessions.length > 1) {
      const highestPriority = Math.min(
        ...matchedProfessions.map((p) => matchDetails[p].priority)
      );
      const filteredProfessions = matchedProfessions.filter(
        (p) => matchDetails[p].priority === highestPriority
      );

      console.log(
        `Filtered to highest priority (${highestPriority}):`,
        filteredProfessions
      );
      return filteredProfessions;
    }

    console.log("Final matched professions:", matchedProfessions);
    return matchedProfessions;
  }
}

// Initialize the profession matcher
const professionMatcher = new ProfessionMatcher();

/**
 * Enhanced job notification service
 */
class JobNotificationService {
  constructor() {
    this.maxEmailsPerBatch = 50; // Prevent overwhelming email service
    this.emailDelay = 50; // Delay between emails in ms
  }

  /**
   * Send job notifications with improved error handling and logging
   */
  async sendJobNotifications(jobData) {
    try {
      console.log("Starting job notification process for:", jobData.title);

      // Determine target professions
      const targetProfessions = professionMatcher.mapJobToProfessions(
        jobData.category,
        jobData.title,
        jobData.description
      );

      if (targetProfessions.length === 0) {
        console.log(
          "No specific profession matches found for job:",
          jobData.title
        );
        return {
          emailsSent: 0,
          emailsFailed: 0,
          message: "No matching professions found",
          targetProfessions: [],
        };
      }

      console.log("Target professions:", targetProfessions);

      // Find matching users with enhanced query
      const targetUsers = await User.find({
        profession: { $in: targetProfessions },
        email: { $exists: true, $ne: null, $ne: "" },
        // Add additional filters if needed
        // isActive: { $ne: false },
        // emailNotifications: { $ne: false }
      })
        .select("email username profession location")
        .limit(this.maxEmailsPerBatch)
        .lean(); // Use lean() for better performance

      console.log(`Found ${targetUsers.length} users matching professions`);

      if (targetUsers.length === 0) {
        return {
          emailsSent: 0,
          emailsFailed: 0,
          message: "No users found with matching professions",
          targetProfessions,
        };
      }

      // Send emails with better error handling
      let emailsSent = 0;
      let emailsFailed = 0;
      const failedEmails = [];

      for (const user of targetUsers) {
        try {
          // Add small delay to prevent overwhelming email service
          if (emailsSent > 0) {
            await new Promise((resolve) =>
              setTimeout(resolve, this.emailDelay)
            );
          }

          await transporter.sendMail({
            ...mailOptions,
            to: user.email,
            subject: this.generateEmailSubject(jobData),
            html: jobNotificationTemplate(
              user.username || "Healthcare Professional",
              jobData.title,
              jobData.description || "No description provided",
              jobData.location || {},
              jobData.postedBy || "Not listed",
              jobData._id,

              jobData.type || "Not specified"
            ),
          });

          console.log(
            `✓ Notification sent to ${user.email} (${user.profession})`
          );
          emailsSent++;
        } catch (error) {
          console.error(
            `✗ Failed to send notification to ${user.email}:`,
            error.message
          );
          emailsFailed++;
          failedEmails.push({
            email: user.email,
            error: error.message,
          });
        }
      }

      const result = {
        emailsSent,
        emailsFailed,
        totalUsers: targetUsers.length,
        targetProfessions,
        failedEmails: emailsFailed > 0 ? failedEmails : undefined,
      };

      console.log("Job notification summary:", result);
      return result;
    } catch (error) {
      console.error("Job notification service error:", error);
      return {
        emailsSent: 0,
        emailsFailed: 0,
        error: error.message,
        targetProfessions: [],
      };
    }
  }

  /**
   * Generate dynamic email subject based on job data
   */
  generateEmailSubject(jobData) {
    const location =
      jobData.location?.county || jobData.location?.state || "Kenya";
    const jobType = jobData.type ? ` (${jobData.type})` : "";

    return `🎯 New ${jobData.title} Position${jobType} - ${location}`;
  }
}

// Initialize notification service
const notificationService = new JobNotificationService();

/**
 * Enhanced input validation
 */
class JobValidator {
  static validatePhoneNumber(phone) {
    if (!phone || phone.trim() === "") return true; // Optional field

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

    // Add more field validations as needed

    return errors;
  }

  static sanitizeJobData(data) {
    const cleanedData = {
      ...data,
      title: data.title?.trim(),
    };

    // Only include fields that have actual values
    if (data.description?.trim())
      cleanedData.description = data.description.trim();
    if (data.phone?.trim()) cleanedData.phone = data.phone.trim();
    if (data.postedBy?.trim()) cleanedData.postedBy = data.postedBy.trim();
    if (data.salary?.trim()) cleanedData.salary = data.salary.trim();
    if (data.type) cleanedData.type = data.type;
    if (data.experience) cleanedData.experience = data.experience;
    if (data.category) cleanedData.category = data.category;

    // Handle nested objects
    cleanedData.location = {
      state: data.location?.state?.trim() || "",
      county: data.location?.county?.trim() || "",
    };

    cleanedData.preference = {
      gender: data.preference?.gender || "any",
      age: data.preference?.age || "any",
      contactType: data.preference?.contactType || "any",
      time: data.preference?.time || "any",
      certificate: data.preference?.certificate || "any",
      completedRecently: Boolean(data.preference?.completedRecently),
    };

    return cleanedData;
  }
}

/**
 * POST - Create a new job
 */
export async function POST(request) {
  try {
    await connectDB();
    const data = await request.json();

    // Validate required fields
    const requiredFieldErrors = JobValidator.validateRequiredFields(data);
    if (requiredFieldErrors.length > 0) {
      return NextResponse.json(
        { error: requiredFieldErrors.join(", ") },
        { status: 400 }
      );
    }

    // Validate optional fields
    const optionalFieldErrors = JobValidator.validateOptionalFields(data);
    if (optionalFieldErrors.length > 0) {
      return NextResponse.json(
        { error: optionalFieldErrors.join(", ") },
        { status: 400 }
      );
    }

    // Sanitize and prepare data
    const cleanedData = JobValidator.sanitizeJobData(data);

    // Create job
    const job = await Job.create(cleanedData);
    console.log("Job created successfully:", job._id);

    // Create system notification
    await Notification.create({
      type: "job_posted",
      message: `${job.title} was posted by ${job.postedBy || "Not listed"}.`,
      jobId: job._id,
    });

    // Send email notifications (don't let this fail the job creation)
    let notificationResult = {
      emailsSent: 0,
      emailsFailed: 0,
      message: "Notifications skipped due to error",
    };

    try {
      notificationResult = await notificationService.sendJobNotifications(job);
    } catch (notificationError) {
      console.error("Failed to send job notifications:", notificationError);
      // Continue with successful job creation even if notifications fail
    }

    return NextResponse.json(
      {
        success: true,
        job,
        notifications: notificationResult,
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

/**
 * GET - Fetch jobs with optional filtering and pagination
 */
export async function GET(request) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page")) || 1;
    const limit = parseInt(searchParams.get("limit")) || 50;
    const category = searchParams.get("category");
    const location = searchParams.get("location");
    const type = searchParams.get("type");

    // Build query filter
    const filter = {};
    if (category) filter.category = category;
    if (location) {
      filter.$or = [
        { "location.county": new RegExp(location, "i") },
        { "location.state": new RegExp(location, "i") },
      ];
    }
    if (type) filter.type = type;

    // Execute query with pagination
    const skip = (page - 1) * limit;
    const [jobs, total] = await Promise.all([
      Job.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
      Job.countDocuments(filter),
    ]);

    console.log(`Found ${jobs.length} jobs (${total} total) - Page ${page}`);

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

/**
 * PATCH - Update an existing job
 */
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

    // Validate update data
    const optionalFieldErrors = JobValidator.validateOptionalFields(updateData);
    if (optionalFieldErrors.length > 0) {
      return NextResponse.json(
        { error: optionalFieldErrors.join(", ") },
        { status: 400 }
      );
    }

    // Update job
    const updatedJob = await Job.findByIdAndUpdate(
      id,
      { $set: updateData, updatedAt: new Date() },
      { new: true, runValidators: true }
    );

    if (!updatedJob) {
      return NextResponse.json({ error: "Job not found" }, { status: 404 });
    }

    console.log("Job updated successfully:", id);

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

/**
 * DELETE - Remove a job
 */
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

    // Clean up related notifications
    await Notification.deleteMany({ jobId: id });

    console.log("Job deleted successfully:", id);

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
