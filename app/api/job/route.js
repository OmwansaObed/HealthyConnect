import { connectDB } from "../../../lib/db.js";
import Job from "../../../models/Job.js";
import Notification from "../../../models/Notifications.js";
import User from "../../../models/User.js";
import { transporter, mailOptions } from "../../../utils/nodemailer.js";
import { NextResponse } from "next/server";
import { jobNotificationTemplate } from "../../../utils/templates/JobNotificationTemplate.js";

// Function to map job categories to professions
const mapJobToProfessions = (jobCategory, jobTitle, jobDescription) => {
  const professions = [];
  const jobText = `${jobCategory || ""} ${jobTitle} ${
    jobDescription || ""
  }`.toLowerCase();

  // Define profession mappings based on Kenyan healthcare system
  const professionMappings = {
    nurse: [
      "nurse",
      "nursing",
      "nurses",
      "registered nurse",
      "rn",
      "clinical nurse",
      "ward nurse",
      "icu nurse",
      "theatre nurse",
    ],
    cna: [
      "cna",
      "certified nursing assistant",
      "nursing assistant",
      "care assistant",
      "healthcare assistant",
      "cnas",
    ],
    administration: [
      "administration",
      "health administration",
      "hospital management",
      "admin",
    ],
    medical_officer: [
      "medical officer",
      "medical officers",
      "doctor",
      "doctors",
      "physician",
      "md",
      "medical doctor",
      "general practitioner",
      "gp",
    ],
    clinical_officer: [
      "clinical officer",
      "clinical officers",
      "cos",
      "co",
      "clinician",
      "clinical associate",
    ],
    care_giver: [
      "care giver",
      "caregivers",
      "caregiver",
      "home caregiver",
      "patient care",
      "elderly care",
      "care givers",
    ],
    home_based_caregiver: [
      "home-based caregiver",
      "home care",
      "in-home caregiver",
      "domiciliary care",
    ],
    public_health_officer: [
      "public health officer",
      "public health",
      "health surveillance",
      "health inspector",
    ],
    community_health_worker: [
      "community health worker",
      "chv",
      "chw",
      "community outreach",
      "health promoter",
    ],
    pharmacy: [
      "pharmacist",
      "pharmacy",
      "pharmaceutical",
      "drug",
      "medication",
      "dispenser",
      "pharmacy technician",
      "pharmtech",
      "pharmtechs",
      "pharmacists",
      "pharm tech",
      "pharm techs",
    ],
    laboratory: [
      "lab technician",
      "laboratory",
      "medical technologist",
      "lab tech",
      "lab techs",
      "labtech",
      "labtechs",
      "laboratory technician",
      "medical laboratory",
      "pathology",
    ],
    radiology: [
      "radiologist",
      "radiologists",
      "radiology",
      "imaging",
      "x-ray",
      "ct scan",
      "mri",
      "ultrasound",
      "diagnostic imaging",
      "sonography",
    ],
    nutritionist: ["nutritionist", "dietitian", "nutrition", "dietary"],
    dental: [
      "dentist",
      "dental",
      "orthodontist",
      "oral health",
      "dental surgeon",
    ],
    physiotherapy: [
      "physiotherapy",
      "physiotherapist",
      "physical therapy",
      "rehabilitation",
      "pt",
    ],
    occupational_therapy: [
      "occupational therapy",
      "occupational therapist",
      "rehab therapy",
      "adl training",
    ],
    speech_therapy: [
      "speech therapy",
      "speech therapist",
      "communication disorder",
      "slp",
    ],
    psychology: [
      "psychologist",
      "psychology",
      "mental health",
      "counselor",
      "therapist",
    ],
    psychiatry: [
      "psychiatry",
      "psychiatrist",
      "mental illness",
      "behavioral medicine",
    ],
    medical_technician: [
      "medical technician",
      "med tech",
      "health technician",
      "clinical technician",
    ],
    medical_engineer: [
      "medical engineer",
      "biomedical engineer",
      "clinical engineer",
    ],
    orthopedics: [
      "orthopedics",
      "orthopedic",
      "bone specialist",
      "musculoskeletal",
    ],
    optometry: ["optometry", "optometrist", "eye care", "vision", "eye health"],
    anesthesiology: [
      "anesthesiology",
      "anesthetist",
      "anesthesiologist",
      "sedation",
    ],
    surgery: ["surgeon", "surgery", "surgical specialist", "operation"],
    midwifery: [
      "midwife",
      "midwifery",
      "maternal health",
      "delivery",
      "obstetric",
    ],
    pediatrics: [
      "pediatrics",
      "pediatrician",
      "child doctor",
      "children’s health",
    ],
    gynecology: [
      "gynecology",
      "gynecologist",
      "obstetrician",
      "women’s health",
    ],
    general_practitioner: [
      "general practitioner",
      "gp",
      "family doctor",
      "primary care",
    ],
    health_records_officer: [
      "health records officer",
      "records clerk",
      "medical records",
      "health data",
    ],
    health_administration: [
      "health administration",
      "hospital admin",
      "health management",
    ],
    hospital_porter: ["hospital porter", "medical porter", "transport aide"],
    hospital_cleaner: [
      "hospital cleaner",
      "medical cleaner",
      "sanitation worker",
    ],
    ambulance_driver: ["ambulance driver", "emergency driver", "ems driver"],
    emergency_medical_technician_emt: [
      "emergency medical technician",
      "emt",
      "paramedic",
      "first responder",
      "ambulance technician",
    ],
    telemedicine: ["telemedicine", "virtual care", "online consultation"],
    health_educator: [
      "health educator",
      "health education",
      "wellness trainer",
      "health promoter",
    ],
    hiv_aids_counselor: [
      "hiv counselor",
      "aids counselor",
      "vct",
      "testing and counseling",
      "hiv/aids counselor",
    ],
    social_worker: [
      "social worker",
      "social work",
      "community health",
      "case manager",
    ],
    vaccination_outreach: [
      "vaccination outreach",
      "immunization campaign",
      "vaccine mobilizer",
    ],
    medical_sales_rep: [
      "medical sales rep",
      "pharma sales",
      "healthcare representative",
    ],
    health_insurance_agent: [
      "health insurance agent",
      "insurance advisor",
      "medical coverage agent",
    ],
    occupational_health_officer: [
      "occupational health officer",
      "workplace safety",
      "employee health",
    ],
    environmental_health_officer: [
      "environmental health officer",
      "sanitation officer",
      "environmental inspector",
    ],
    biomedical_scientist: [
      "biomedical scientist",
      "biomedical researcher",
      "lab scientist",
    ],
    mortuary_attendant: [
      "mortuary attendant",
      "funeral attendant",
      "morgue assistant",
    ],
    first_responder: [
      "first responder",
      "emergency care",
      "pre-hospital care",
      "emergency worker",
    ],
    coHo: ["coHo"],
  };

  // Check which professions match the job
  Object.entries(professionMappings).forEach(([profession, keywords]) => {
    if (keywords.some((keyword) => jobText.includes(keyword))) {
      professions.push(profession);
    }
  });

  return professions;
};

// Function to send job notifications
const sendJobNotifications = async (jobData) => {
  try {
    // Determine target professions for this job
    const targetProfessions = mapJobToProfessions(
      jobData.category,
      jobData.title,
      jobData.description
    );

    console.log("Target professions for job notifications:", targetProfessions);

    if (targetProfessions.length === 0) {
      console.log("No specific profession match found for job:", jobData.title);
      return { emailsSent: 0, message: "No matching professions found" };
    }

    // Find users with matching professions
    const targetUsers = await User.find({
      profession: { $in: targetProfessions },
      email: { $exists: true },
      // Optional: Add a field to check if user wants job notifications
      // jobNotifications: { $ne: false }
    }).select("email username profession");

    console.log(
      `Found ${targetUsers.length} users matching professions:`,
      targetProfessions
    );

    if (targetUsers.length === 0) {
      return {
        emailsSent: 0,
        message: "No users found with matching professions",
      };
    }

    // Send emails to all matching users
    let emailsSent = 0;
    let emailsFailed = 0;

    for (const user of targetUsers) {
      try {
        await transporter.sendMail({
          ...mailOptions,
          to: user.email,
          subject: `🎯 New ${jobData.title} Position Available - ${
            jobData.location?.county || "Kenya"
          }`,
          html: jobNotificationTemplate(
            user.username,
            jobData.title,
            jobData.description,
            jobData.location || {},
            jobData.postedBy || "HealthyConnect",
            jobData._id,
            jobData.salary || "Negotiable",
            jobData.type
          ),
        });

        console.log(
          `Job notification sent to ${user.email} (${user.profession})`
        );
        emailsSent++;
      } catch (error) {
        console.error(
          `Failed to send job notification to ${user.email}:`,
          error
        );
        emailsFailed++;
      }
    }

    return {
      emailsSent,
      emailsFailed,
      totalUsers: targetUsers.length,
      targetProfessions,
    };
  } catch (error) {
    console.error("Job notification error:", error);
    return { emailsSent: 0, error: error.message };
  }
};

export async function POST(request) {
  await connectDB();
  try {
    const data = await request.json();

    // Only require title - most essential field
    if (!data.title || data.title.trim() === "") {
      return NextResponse.json(
        { error: "Job title is required" },
        { status: 400 }
      );
    }

    // Validate phone number only if it's provided and not empty
    if (data.phone && data.phone.trim() !== "") {
      if (
        !data.phone.startsWith("07") &&
        !data.phone.startsWith("011") &&
        !data.phone.startsWith("+254") &&
        !data.phone.startsWith("0")
      ) {
        return NextResponse.json(
          { error: "Phone number must start with 07 or 011" },
          { status: 400 }
        );
      }
    }

    const cleanedData = {
      ...data,
      title: data.title.trim(),
      // Only include fields that have actual values
      ...(data.description && { description: data.description.trim() }),
      ...(data.phone && { phone: data.phone.trim() }),
      ...(data.postedBy && { postedBy: data.postedBy.trim() }),
      ...(data.salary && { salary: data.salary.trim() }),
      ...(data.type && { type: data.type }),
      ...(data.experience && { experience: data.experience }),
      ...(data.category && { category: data.category }),
      // Handle location
      location: {
        state: data.location?.state?.trim() || "",
        county: data.location?.county?.trim() || "",
      },
      // Handle preferences - use defaults from model if not provided
      preference: {
        gender: data.preference?.gender || "any",
        age: data.preference?.age || "any",
        contactType: data.preference?.contactType || "any",
        time: data.preference?.time || "any",
        certificate: data.preference?.certificate || "any",
        completedRecently: data.preference?.completedRecently || false,
      },
    };

    const job = await Job.create(cleanedData);

    // Create a notification for the new job (existing functionality)
    await Notification.create({
      type: "job_posted",
      message: `${job.title} was posted by ${job.postedBy || "Anonymous"}.`,
      jobId: job._id,
    });

    // Send email notifications to matching professionals
    let notificationResult = { emailsSent: 0 };
    try {
      notificationResult = await sendJobNotifications(job);
      console.log("Job notification result:", notificationResult);
    } catch (notificationError) {
      console.error("Failed to send job notifications:", notificationError);
      // Don't fail the job creation if email notifications fail
    }

    return NextResponse.json(
      {
        job,
        notifications: {
          emailsSent: notificationResult.emailsSent,
          emailsFailed: notificationResult.emailsFailed || 0,
          totalUsers: notificationResult.totalUsers || 0,
          targetProfessions: notificationResult.targetProfessions || [],
          message: notificationResult.message || null,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Job creation error:", error);

    // Handle validation errors specifically
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

// GET request handler to fetch all jobs
export async function GET(request) {
  try {
    await connectDB();

    // Fetch all jobs without pagination
    const jobs = await Job.find({}).sort({ createdAt: -1 });

    const total = jobs.length;
    console.log("Total jobs found:", jobs.length);
    return NextResponse.json({
      jobs,
      total,
    });
  } catch (error) {
    console.error("Jobs API Error:", error);
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

    // Allow updating any subset of fields
    if (Object.keys(updateData).length === 0) {
      return NextResponse.json(
        { error: "At least one field to update is required" },
        { status: 400 }
      );
    }

    // Validate phone if it's being updated
    if (updateData.phone && updateData.phone.trim() !== "") {
      if (
        !updateData.phone.startsWith("07") &&
        !updateData.phone.startsWith("011")
      ) {
        return NextResponse.json(
          { error: "Phone number must start with 07 or 011" },
          { status: 400 }
        );
      }
    }

    const updatedJob = await Job.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true, runValidators: true }
    );

    if (!updatedJob) {
      return NextResponse.json({ error: "Job not found" }, { status: 404 });
    }

    return NextResponse.json({ job: updatedJob }, { status: 200 });
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

// DELETE request handler to delete a job by ID
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

    return NextResponse.json(
      { message: "Job deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Job deletion error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to delete job" },
      { status: 500 }
    );
  }
}
