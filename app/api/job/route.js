import { connectDB } from "../../../lib/db.js";
import Job from "../../../models/Job.js";
import Notification from "../../../models/Notifications.js";
import User from "../../../models/User.js";
import { transporter, mailOptions } from "../../../utils/nodemailer.js";
import { NextResponse } from "next/server";
import { jobNotificationTemplate } from "../../../utils/templates/JobNotificationTemplate.js";

/**
 * IMPROVED EMAIL QUEUE SYSTEM
 * Fixes race conditions, retry logic, and runs completely in background
 */
class EmailQueue {
  constructor() {
    this.queue = [];
    this.retryQueue = [];
    this.processing = false;
    this.batchSize = 5; // Reduced for better rate limiting
    this.delayBetweenBatches = 3000; // 3 seconds between batches
    this.delayBetweenEmails = 500; // 500ms between individual emails
    this.maxRetries = 3;
    this.retryDelay = 5000; // 5 seconds before retry
  }

  /**
   * Add emails to queue with proper async handling (NON-BLOCKING)
   */
  addToQueue(emailJobs) {
    console.log(`Adding ${emailJobs.length} emails to queue`);

    // Add retry count to each job
    const jobsWithRetry = emailJobs.map((job) => ({
      ...job,
      retries: 0,
      addedAt: new Date(),
    }));

    this.queue.push(...jobsWithRetry);

    // Start processing in background without waiting
    this.ensureProcessing();

    return {
      queued: emailJobs.length,
      totalInQueue: this.queue.length + this.retryQueue.length,
    };
  }

  /**
   * Ensure processing starts without race conditions (FIRE AND FORGET)
   */
  ensureProcessing() {
    if (this.processing) {
      console.log("Queue already processing, skipping...");
      return;
    }

    this.processing = true;

    // Process queue in background without blocking
    this.processQueue()
      .catch((error) => {
        console.error("Queue processing failed:", error);
      })
      .finally(() => {
        this.processing = false;
      });
  }

  /**
   * Process email queue with proper error handling (BACKGROUND PROCESS)
   */
  async processQueue() {
    console.log(
      `Starting email queue processing. Queue size: ${this.queue.length}`
    );

    while (this.queue.length > 0 || this.retryQueue.length > 0) {
      try {
        // Process retry queue first
        if (this.retryQueue.length > 0) {
          console.log(`Processing ${this.retryQueue.length} retry emails`);
          await this.processRetryQueue();
        }

        // Process main queue
        if (this.queue.length > 0) {
          const batch = this.queue.splice(0, this.batchSize);
          console.log(`Processing batch of ${batch.length} emails`);

          const results = await this.processBatch(batch);

          // Handle failed emails
          const failedEmails = results.filter((r) => r.status === "failed");
          if (failedEmails.length > 0) {
            await this.handleFailedEmails(failedEmails);
          }

          // Wait between batches
          if (this.queue.length > 0 || this.retryQueue.length > 0) {
            console.log(
              `Waiting ${this.delayBetweenBatches}ms before next batch...`
            );
            await this.delay(this.delayBetweenBatches);
          }
        }
      } catch (error) {
        console.error("Batch processing error:", error);

        // If it's a service-wide error, pause processing
        if (this.isServiceError(error)) {
          console.log("Service error detected, pausing for 30 seconds...");
          await this.delay(30000);
        }
      }
    }

    console.log("Email queue processing completed");
  }

  /**
   * Process retry queue with exponential backoff
   */
  async processRetryQueue() {
    const readyToRetry = this.retryQueue.filter((job) => {
      const timeSinceLastTry = Date.now() - job.lastRetryAt;
      const backoffDelay = this.retryDelay * Math.pow(2, job.retries - 1);
      return timeSinceLastTry >= backoffDelay;
    });

    if (readyToRetry.length === 0) return;

    // Remove from retry queue
    this.retryQueue = this.retryQueue.filter(
      (job) => !readyToRetry.includes(job)
    );

    // Process retry batch
    const results = await this.processBatch(readyToRetry);

    // Handle still-failed emails
    const stillFailed = results.filter((r) => r.status === "failed");
    if (stillFailed.length > 0) {
      await this.handleFailedEmails(stillFailed);
    }
  }

  /**
   * Process batch with individual error handling
   */
  async processBatch(batch) {
    const results = [];

    for (let i = 0; i < batch.length; i++) {
      const emailJob = batch[i];

      try {
        // Add delay between emails
        if (i > 0) {
          await this.delay(this.delayBetweenEmails);
        }

        await this.sendEmail(emailJob);

        results.push({
          status: "success",
          email: emailJob.to,
          job: emailJob,
        });

        console.log(`✓ Email sent to ${emailJob.to}`);
      } catch (error) {
        console.error(
          `✗ Failed to send email to ${emailJob.to}:`,
          error.message
        );

        results.push({
          status: "failed",
          email: emailJob.to,
          error: error,
          job: emailJob,
        });
      }
    }

    return results;
  }

  /**
   * Handle failed emails with proper retry logic
   */
  async handleFailedEmails(failedResults) {
    for (const result of failedResults) {
      const emailJob = result.job;

      if (emailJob.retries < this.maxRetries) {
        emailJob.retries += 1;
        emailJob.lastRetryAt = Date.now();

        // Add to separate retry queue instead of main queue
        this.retryQueue.push(emailJob);

        console.log(
          `Scheduled retry for ${emailJob.to} (attempt ${emailJob.retries}/${this.maxRetries})`
        );
      } else {
        console.error(
          `❌ Permanently failed to send email to ${emailJob.to} after ${this.maxRetries} attempts`
        );

        // Log to a failed emails collection or external service
        await this.logPermanentFailure(emailJob, result.error);
      }
    }
  }

  /**
   * Send individual email with better error handling
   */
  async sendEmail(emailJob) {
    try {
      const info = await transporter.sendMail({
        ...mailOptions,
        to: emailJob.to,
        subject: emailJob.subject,
        html: emailJob.html,
      });

      // Log successful send
      console.log(
        `Email sent to ${emailJob.to}, Message ID: ${info.messageId}`
      );

      return info;
    } catch (error) {
      // Check if it's a temporary or permanent error
      if (this.isTemporaryError(error)) {
        throw new Error(`Temporary error: ${error.message}`);
      } else {
        throw new Error(`Permanent error: ${error.message}`);
      }
    }
  }

  /**
   * Check if error is temporary (should retry)
   */
  isTemporaryError(error) {
    const temporaryErrors = [
      "ETIMEDOUT",
      "ECONNRESET",
      "ENOTFOUND",
      "rate limit",
      "too many requests",
      "service unavailable",
    ];

    return temporaryErrors.some((tempError) =>
      error.message.toLowerCase().includes(tempError.toLowerCase())
    );
  }

  /**
   * Check if it's a service-wide error
   */
  isServiceError(error) {
    const serviceErrors = [
      "authentication failed",
      "invalid credentials",
      "service unavailable",
      "connection refused",
    ];

    return serviceErrors.some((serviceError) =>
      error.message.toLowerCase().includes(serviceError.toLowerCase())
    );
  }

  /**
   * Log permanent failures for monitoring
   */
  async logPermanentFailure(emailJob, error) {
    try {
      // This could be saved to database or external logging service
      console.error("PERMANENT EMAIL FAILURE:", {
        email: emailJob.to,
        subject: emailJob.subject,
        error: error.message,
        retries: emailJob.retries,
        jobId: emailJob.jobId,
        timestamp: new Date().toISOString(),
      });

      // Optionally save to database
      // await FailedEmail.create({
      //   email: emailJob.to,
      //   subject: emailJob.subject,
      //   error: error.message,
      //   jobId: emailJob.jobId,
      //   finalAttempt: new Date()
      // });
    } catch (logError) {
      console.error("Failed to log permanent email failure:", logError);
    }
  }

  /**
   * Utility delay function
   */
  delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  /**
   * Get comprehensive queue status
   */
  getStatus() {
    return {
      mainQueue: this.queue.length,
      retryQueue: this.retryQueue.length,
      totalQueued: this.queue.length + this.retryQueue.length,
      processing: this.processing,
      nextRetry:
        this.retryQueue.length > 0
          ? Math.min(
              ...this.retryQueue.map((job) => job.lastRetryAt + this.retryDelay)
            )
          : null,
    };
  }

  /**
   * Clear all queues (for testing/debugging)
   */
  clearQueues() {
    this.queue = [];
    this.retryQueue = [];
    console.log("All queues cleared");
  }
}

// Global email queue instance
const emailQueue = new EmailQueue();

/**
 * Enhanced profession mapping
 */
class ProfessionMatcher {
  constructor() {
    this.professionMappings = {
      // Physicians and Clinical Professionals
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
          "coho",
        ],
        priority: 1,
      },
      "general practitioner": {
        keywords: [
          "general practitioner",
          "family physician",
          "primary care physician",
        ],
        priority: 1,
      },

      // Nursing and Midwifery
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
      midwifery: {
        keywords: [
          "midwife",
          "midwives",
          "midwifery",
          "registered midwife",
          "rm",
        ],
        priority: 2,
      },
      "care giver": {
        keywords: [
          "care giver",
          "caregiver",
          "home-based caregiver",
          "patient attendant",
          "nursing aide",
        ],
        priority: 3,
      },
      cna: {
        keywords: [
          "certified nursing assistant",
          "cna",
          "nursing assistant",
          "health aide",
        ],
        priority: 3,
      },

      // Pharmacy
      pharmacy: {
        keywords: [
          "pharmacist",
          "pharmacy",
          "pharmaceutical",
          "pharmacy technician",
          "pharmacy assistant",
          "pharm",
          "pharmtech",
          "pharm tech",
          "pharmtechs",
          "dispensary",
        ],
        priority: 2,
      },

      // Diagnostic Services
      laboratory: {
        keywords: [
          "laboratory technician",
          "medical laboratory",
          "lab technician",
          "pathology",
          "diagnostics",
          "lab tech",
          "medical lab scientist",
          "mls",
          "laboratory technologist",
          "lab technologist",
          "labtech",
          "lab tech",
          "labtechs",
        ],
        priority: 3,
      },
      radiology: {
        keywords: [
          "radiologist",
          "radiology",
          "x-ray technician",
          "radiographer",
          "radiology technician",
          "ultrasound technician",
          "sonographer",
        ],
        priority: 3,
      },

      // Allied Health Professionals
      physiotherapy: {
        keywords: [
          "physiotherapist",
          "physical therapist",
          "physiotherapy",
          "pt",
        ],
        priority: 3,
      },
      "occupational therapy": {
        keywords: ["occupational therapist", "occupational therapy", "ot"],
        priority: 3,
      },
      "speech therapy": {
        keywords: [
          "speech therapist",
          "speech pathologist",
          "speech therapy",
          "slp",
        ],
        priority: 3,
      },
      nutritionist: {
        keywords: ["nutritionist", "dietician", "dietitian", "nutrition"],
        priority: 3,
      },
      dental: {
        keywords: [
          "dentist",
          "dental",
          "dental officer",
          "dental surgeon",
          "dental technician",
          "dental assistant",
          "oral health",
        ],
        priority: 3,
      },
      optometry: {
        keywords: ["optometrist", "optometry", "ophthalmic", "eye care"],
        priority: 3,
      },

      // Mental Health
      psychology: {
        keywords: [
          "psychologist",
          "psychology",
          "clinical psychologist",
          "counseling psychologist",
        ],
        priority: 3,
      },
      psychiatry: {
        keywords: ["psychiatrist", "psychiatry"],
        priority: 2,
      },
      "hiv/aids counselor": {
        keywords: [
          "hiv counselor",
          "aids counselor",
          "hiv/aids counselor",
          "hiv testing",
        ],
        priority: 4,
      },

      // Specialized Medical Fields
      anesthesiology: {
        keywords: [
          "anesthesiologist",
          "anesthetist",
          "anesthesia",
          "anesthesiology",
        ],
        priority: 2,
      },
      surgery: {
        keywords: ["surgeon", "surgery", "surgical", "general surgery"],
        priority: 2,
      },
      pediatrics: {
        keywords: ["pediatrician", "pediatrics", "child health"],
        priority: 2,
      },
      gynecology: {
        keywords: [
          "gynecologist",
          "obgyn",
          "ob/gyn",
          "gynecology",
          "obstetrics",
        ],
        priority: 2,
      },
      orthopedics: {
        keywords: ["orthopedic", "orthopedics", "orthopedic surgeon"],
        priority: 2,
      },

      // Public and Community Health
      "public health officer": {
        keywords: [
          "public health officer",
          "public health",
          "epidemiologist",
          "disease control",
        ],
        priority: 3,
      },
      "community health worker": {
        keywords: [
          "community health worker",
          "community health",
          "chw",
          "health promoter",
        ],
        priority: 4,
      },
      "health educator": {
        keywords: ["health educator", "health education", "patient educator"],
        priority: 4,
      },
      "vaccination outreach": {
        keywords: ["vaccination", "immunization", "vaccine", "outreach worker"],
        priority: 4,
      },

      // Emergency Services
      "emergency medical technician (emt)": {
        keywords: [
          "emergency medical technician",
          "emt",
          "paramedic",
          "emergency care",
        ],
        priority: 3,
      },
      "first responder": {
        keywords: [
          "first responder",
          "emergency responder",
          "disaster response",
        ],
        priority: 4,
      },
      "ambulance driver": {
        keywords: ["ambulance driver", "emergency driver"],
        priority: 5,
      },

      // Administration and Support
      administration: {
        keywords: [
          "administrator",
          "administration",
          "hospital admin",
          "health admin",
          "medical admin",
          "clinic manager",
          "healthcare executive",
        ],
        priority: 4,
      },
      "health records officer": {
        keywords: [
          "health records",
          "medical records",
          "health information",
          "records officer",
          "him",
        ],
        priority: 4,
      },
      "health administration": {
        keywords: [
          "health administration",
          "healthcare administration",
          "hospital administration",
        ],
        priority: 4,
      },

      // Support Staff
      "hospital porter": {
        keywords: ["hospital porter", "porter", "ward assistant"],
        priority: 5,
      },
      "hospital cleaner": {
        keywords: [
          "hospital cleaner",
          "sanitation worker",
          "cleaner",
          "janitor",
        ],
        priority: 5,
      },
      "mortuary attendant": {
        keywords: ["mortuary", "mortuary attendant", "morgue"],
        priority: 5,
      },

      // Technical and Engineering
      "medical technician": {
        keywords: [
          "medical technician",
          "biomedical technician",
          "equipment technician",
        ],
        priority: 3,
      },
      "medical engineer": {
        keywords: [
          "medical engineer",
          "biomedical engineer",
          "clinical engineer",
        ],
        priority: 3,
      },
      "biomedical scientist": {
        keywords: ["biomedical scientist", "medical scientist"],
        priority: 3,
      },

      // Business and Sales
      "medical sales rep": {
        keywords: [
          "medical sales",
          "pharma sales",
          "medical representative",
          "drug rep",
        ],
        priority: 4,
      },
      "health insurance agent": {
        keywords: ["health insurance", "medical insurance", "insurance agent"],
        priority: 4,
      },

      // Specialized Health Fields
      "occupational health officer": {
        keywords: [
          "occupational health",
          "workplace health",
          "industrial health",
        ],
        priority: 3,
      },
      "environmental health officer": {
        keywords: ["environmental health", "public health inspector", "eho"],
        priority: 3,
      },
      telemedicine: {
        keywords: ["telemedicine", "telehealth", "remote healthcare"],
        priority: 4,
      },
      "social worker": {
        keywords: [
          "social worker",
          "medical social worker",
          "hospital social worker",
        ],
        priority: 4,
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

const professionMatcher = new ProfessionMatcher();

/**
 * NON-BLOCKING JOB NOTIFICATION SERVICE
 * Queues emails without waiting for them to be sent
 */
class AsyncJobNotificationService {
  constructor() {
    this.maxUsersPerJob = 1000; // Limit users per job posting
  }

  /**
   * Queue job notifications for background processing (NON-BLOCKING)
   */
  async queueJobNotifications(jobData) {
    try {
      console.log("Queuing job notifications for:", jobData.title);

      // Determine target professions
      const targetProfessions = professionMatcher.mapJobToProfessions(
        jobData.category,
        jobData.title,
        jobData.description
      );

      if (targetProfessions.length === 0) {
        return {
          status: "no_matches",
          message: "No matching professions found",
          targetProfessions: [],
          usersQueued: 0,
        };
      }

      // Find matching users
      const targetUsers = await User.find({
        profession: { $in: targetProfessions },
        email: { $exists: true, $ne: null, $ne: "" },
      })
        .select("email username profession")
        .limit(this.maxUsersPerJob)
        .lean();

      if (targetUsers.length === 0) {
        return {
          status: "no_users",
          message: "No users found with matching professions",
          targetProfessions,
          usersQueued: 0,
        };
      }

      // Prepare email jobs for queue
      const emailJobs = targetUsers.map((user) => ({
        to: user.email,
        subject: this.generateEmailSubject(jobData),
        html: jobNotificationTemplate(
          user.username || "Healthcare Professional",
          jobData.title,
          jobData.description || "No description provided",
          jobData.location || {},
          jobData.postedBy || "Not listed",
          jobData.salary,
          jobData.type || "Not specified"
        ),
        userId: user._id,
        jobId: jobData._id,
        profession: user.profession,
      }));

      // Add to background queue (NON-BLOCKING - returns immediately)
      const queueResult = emailQueue.addToQueue(emailJobs);

      return {
        status: "queued",
        message: "Email notifications queued for background processing",
        targetProfessions,
        usersQueued: targetUsers.length,
        queueResult,
        queueStatus: emailQueue.getStatus(),
      };
    } catch (error) {
      console.error("Failed to queue job notifications:", error);
      return {
        status: "error",
        message: error.message,
        targetProfessions: [],
        usersQueued: 0,
      };
    }
  }

  generateEmailSubject(jobData) {
    const location =
      jobData.location?.county || jobData.location?.state || "Kenya";
    const jobType = jobData.type ? ` (${jobData.type})` : "";
    return `🎯 New ${jobData.title} Position${jobType} - ${location}`;
  }
}

const asyncNotificationService = new AsyncJobNotificationService();

/**
 * Job Validator
 */
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
    const cleanedData = { ...data, title: data.title?.trim() };

    if (data.description?.trim())
      cleanedData.description = data.description.trim();
    if (data.phone?.trim()) cleanedData.phone = data.phone.trim();
    if (data.postedBy?.trim()) cleanedData.postedBy = data.postedBy.trim();
    if (data.salary?.trim()) cleanedData.salary = data.salary.trim();
    if (data.type) cleanedData.type = data.type;
    if (data.experience) cleanedData.experience = data.experience;
    if (data.category) cleanedData.category = data.category;

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
 * IMMEDIATE JOB POSTING - Create job and queue emails in background
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

    // Create job - THIS HAPPENS IMMEDIATELY
    const job = await Job.create(cleanedData);
    console.log("Job created successfully:", job._id);

    // Create system notification - IMMEDIATE
    await Notification.create({
      type: "job_posted",
      message: `${job.title} was posted by ${job.postedBy || "Not listed"}.`,
      jobId: job._id,
    });

    // Queue email notifications (NON-BLOCKING - happens in background)
    // We don't await this, so it doesn't block the response
    asyncNotificationService
      .queueJobNotifications(job)
      .then((notificationResult) => {
        console.log("Email notification queuing result:", notificationResult);
      })
      .catch((error) => {
        console.error("Email notification queuing error:", error);
      });

    // Return immediately - job is created, emails will be sent in background
    return NextResponse.json(
      {
        success: true,
        job,
        message:
          "Job created successfully. Email notifications are being processed in the background.",
        emailQueue: {
          status: "queued",
          message: "Email notifications queued for background processing",
          queueStatus: emailQueue.getStatus(),
        },
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
 * GET - Fetch jobs and queue status
 */
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const action = searchParams.get("action");

    if (action === "queue-status") {
      return NextResponse.json({
        success: true,
        queueStatus: emailQueue.getStatus(),
      });
    }

    // Existing job fetching logic
    await connectDB();

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
      queueStatus: emailQueue.getStatus(), // Include queue status in response
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
 * PATCH - Update job
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

    return NextResponse.json({ success: true, job: updatedJob });
  } catch (error) {
    console.error("Job update error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to update job" },
      { status: 500 }
    );
  }
}

/**
 * DELETE - Delete job
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
