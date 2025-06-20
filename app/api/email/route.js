import { transporter, mailOptions } from "../../../utils/nodemailer";
import rateLimit from "../../../utils/rateLimit";

// Rate limiting to prevent abuse (e.g., 5 requests per minute per IP)
const limiter = rateLimit({
  interval: 60 * 1000, // 1 minute
  uniqueTokenPerInterval: 500, // Max users per interval
});

export async function POST(req) {
  const { to, subject, text, html } = await req.json();

  // Validate required fields
  if (!to || !subject || (!text && !html)) {
    return new Response(
      JSON.stringify({
        error: "Missing required fields: to, subject, and text or html",
      }),
      { status: 400 }
    );
  }

  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(to)) {
    return new Response(
      JSON.stringify({ error: "Invalid email address format" }),
      { status: 400 }
    );
  }

  try {
    // Apply rate limiting
    await limiter.check(5, req.headers.get("x-real-ip") || req.ip);

    // Send email
    await transporter.sendMail({
      ...mailOptions,
      to,
      subject,
      text: text || " ", // Fallback empty string if no text
      html: html || text || " ", // Fallback to text version if no html
    });

    console.log(`Email sent to ${to} with subject "${subject}"`);

    return new Response(
      JSON.stringify({
        success: true,
        message: "Email sent successfully",
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Email error:", error);

    // Handle rate limit errors
    if (error.message.includes("rate limit exceeded")) {
      return new Response(
        JSON.stringify({
          error: "Too many requests. Please try again later.",
        }),
        { status: 429 }
      );
    }

    return new Response(
      JSON.stringify({
        error: "Failed to send email",
        details: process.env.NODE_ENV === "development" ? error.message : null,
      }),
      { status: 500 }
    );
  }
}
export async function GET(req) {
  console.log("GET EMAIL API HIT");
  return new Response(JSON.stringify({ success: true }), { status: 200 });
}
