import User from "../../../models/User";
import { connectDB } from "../../../lib/db";
import { transporter } from "../../../utils/nodemailer";
import { jobNotificationTemplate } from "../../../utils/templates/JobNotificationTemplate";

export async function POST(req) {
  try {
    const { jobData, targetProfessions } = await req.json();

    // Validate required fields
    if (!jobData || !targetProfessions || !Array.isArray(targetProfessions)) {
      return new Response(
        JSON.stringify({ error: "Missing jobData or targetProfessions array" }),
        { status: 400 }
      );
    }

    await connectDB();

    // Find users with matching professions who want job notifications
    const targetUsers = await User.find({
      profession: { $in: targetProfessions },
      email: { $exists: true },
      // Add a field to check if user wants job notifications (optional)
      // jobNotifications: { $ne: false }
    }).select("email username profession");

    console.log(
      `Found ${targetUsers.length} users matching professions:`,
      targetProfessions
    );

    if (targetUsers.length === 0) {
      return new Response(
        JSON.stringify({
          success: true,
          message: "No users found with matching professions",
          emailsSent: 0,
        }),
        { status: 200 }
      );
    }

    // Send emails to all matching users
    const emailPromises = targetUsers.map(async (user) => {
      try {
        await transporter.sendMail({
          ...mailOptions,
          to: user.email,
          subject: `🎯 New ${jobData.title} Position Available - ${jobData.location}`,
          html: jobNotificationTemplate(
            user.username,
            jobData.title,
            jobData.description,
            jobData.location,
            jobData.company,
            jobData._id || jobData.id
          ),
        });

        console.log(
          `Job notification sent to ${user.email} (${user.profession})`
        );
        return { success: true, email: user.email };
      } catch (error) {
        console.error(
          `Failed to send job notification to ${user.email}:`,
          error
        );
        return { success: false, email: user.email, error: error.message };
      }
    });

    // Wait for all emails to be sent
    const results = await Promise.allSettled(emailPromises);

    const successful = results.filter(
      (result) => result.status === "fulfilled" && result.value.success
    ).length;

    const failed = results.length - successful;

    return new Response(
      JSON.stringify({
        success: true,
        message: `Job notifications processed`,
        emailsSent: successful,
        emailsFailed: failed,
        totalUsers: targetUsers.length,
        targetProfessions,
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Job notification error:", error);
    return new Response(
      JSON.stringify({
        error: "Failed to send job notifications",
        details: process.env.NODE_ENV === "development" ? error.message : null,
      }),
      { status: 500 }
    );
  }
}

// GET endpoint to test the API
export async function GET(req) {
  return new Response(
    JSON.stringify({
      message: "Job notification API is running",
      availableProfessions: [
        "nurse",
        "cna",
        "medical_officer",
        "clinical_officer",
        "radiologist",
        "pharmacist",
        "lab_technician",
        "doctor",
      ],
    }),
    { status: 200 }
  );
}
