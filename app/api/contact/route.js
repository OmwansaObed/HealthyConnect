import { NextResponse } from "next/server";
import Contact from "../../../models/Contact";
import { connectDB } from "../../../lib/db";
import { sendNewContactNotification } from "../../../utils/sendEmailResponse";

// Input Validation
function validateContactData(data) {
  const errors = {};
  const { name, email, subject, message, userType } = data;

  // Name
  if (!name || typeof name !== "string") {
    errors.name = "Name is required and must be a string";
  } else if (name.trim().length === 0) {
    errors.name = "Name cannot be empty";
  } else if (name.length > 100) {
    errors.name = "Name cannot exceed 100 characters";
  }

  // Email
  const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
  if (!email || typeof email !== "string") {
    errors.email = "Email is required and must be a string";
  } else if (!emailRegex.test(email.trim())) {
    errors.email = "Please enter a valid email address";
  }

  // Subject
  if (!subject || typeof subject !== "string") {
    errors.subject = "Subject is required and must be a string";
  } else if (subject.trim().length === 0) {
    errors.subject = "Subject cannot be empty";
  } else if (subject.length > 200) {
    errors.subject = "Subject cannot exceed 200 characters";
  }

  // Message
  if (!message || typeof message !== "string") {
    errors.message = "Message is required and must be a string";
  } else if (message.trim().length === 0) {
    errors.message = "Message cannot be empty";
  } else if (message.length > 1000) {
    errors.message = "Message cannot exceed 1000 characters";
  }

  // UserType (optional but must be valid if provided)
  const validUserTypes = ["professional", "facility", "other"];
  if (userType && !validUserTypes.includes(userType)) {
    errors.userType = "User type must be one of: professional, facility, other";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

// Rate Limiting (15 min window, 5 requests max per email)
const rateLimitMap = new Map();
function isRateLimited(email) {
  const now = Date.now();
  const windowMs = 15 * 60 * 1000; // 15 minutes
  const maxRequests = 5;

  const normalizedEmail = email.toLowerCase().trim();
  if (!rateLimitMap.has(normalizedEmail)) {
    rateLimitMap.set(normalizedEmail, { count: 1, resetTime: now + windowMs });
    return false;
  }

  const record = rateLimitMap.get(normalizedEmail);
  if (now > record.resetTime) {
    rateLimitMap.set(normalizedEmail, { count: 1, resetTime: now + windowMs });
    return false;
  }

  if (record.count >= maxRequests) {
    return true;
  }

  record.count++;
  return false;
}

/**
 * POST /api/contact
 * Handles new contact form submission
 */
export async function POST(request) {
  try {
    const body = await request.json();

    // Validate input
    const { isValid, errors } = validateContactData(body);
    if (!isValid) {
      return NextResponse.json(
        { success: false, message: "Validation failed", errors },
        { status: 400 }
      );
    }

    const {
      name,
      email,
      subject,
      message,
      userType = "professional",
      phone,
    } = body;
    const normalizedEmail = email.trim().toLowerCase();

    // Rate limiting
    if (isRateLimited(normalizedEmail)) {
      return NextResponse.json(
        {
          success: false,
          message: "Too many requests. Please try again later.",
        },
        { status: 429 }
      );
    }

    // Connect to DB
    await connectDB();

    // Create contact
    const newContact = await Contact.create({
      name: name.trim(),
      email: normalizedEmail,
      subject: subject.trim(),
      message: message.trim(),
      userType,
      phone: phone?.trim() || null,
      status: "pending",
      isRead: false,
    });

    // Send admin notification (non-critical, don't block on failure)
    try {
      await sendNewContactNotification({
        name: newContact.name,
        email: newContact.email,
        subject: newContact.subject,
        message: newContact.message,
        userType: newContact.userType,
        phone: newContact.phone,
      });
    } catch (emailError) {
      console.error("Failed to send admin notification email:", emailError);
    }

    return NextResponse.json(
      {
        success: true,
        message:
          "Your message has been sent successfully. We will get back to you soon!",
        data: {
          contactId: newContact._id,
          submittedAt: newContact.createdAt,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Contact form error:", error);

    // Handle known errors
    if (error.name === "ValidationError") {
      const errors = Object.fromEntries(
        Object.entries(error.errors).map(([k, v]) => [k, v.message])
      );
      return NextResponse.json(
        { success: false, message: "Validation failed", errors },
        { status: 400 }
      );
    }

    if (error.code === 11000) {
      return NextResponse.json(
        {
          success: false,
          message:
            "A message with this email was recently submitted. Please wait before sending another.",
        },
        { status: 409 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        message: "Internal server error. Please try again later.",
        ...(process.env.NODE_ENV === "development" && { error: error.message }),
      },
      { status: 500 }
    );
  }
}

/**
 * GET /api/contact
 * Retrieve paginated, filtered, and searchable list of contacts (Admin only)
 */
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = Math.max(1, parseInt(searchParams.get("page")) || 1);
    const limit = Math.min(
      100,
      Math.max(1, parseInt(searchParams.get("limit")) || 10)
    ); // Limit max limit
    const status = searchParams.get("status");
    const userType = searchParams.get("userType");
    const search = searchParams.get("search")?.trim();

    await connectDB();

    // Build query
    const query = {};
    if (status) query.status = status;
    if (userType) query.userType = userType;

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
        { subject: { $regex: search, $options: "i" } },
        { message: { $regex: search, $options: "i" } },
      ];
    }

    const skip = (page - 1) * limit;

    // Fetch paginated contacts
    const contacts = await Contact.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .select("-__v")
      .lean();

    const totalContacts = await Contact.countDocuments(query);
    const totalPages = Math.ceil(totalContacts / limit);

    // Aggregate stats
    const statusStats = await Contact.aggregate([
      { $group: { _id: "$status", count: { $sum: 1 } } },
    ]);
    const userTypeStats = await Contact.aggregate([
      { $group: { _id: "$userType", count: { $sum: 1 } } },
    ]);

    return NextResponse.json({
      success: true,
      data: {
        contacts,
        pagination: {
          currentPage: page,
          totalPages,
          totalContacts,
          itemsPerPage: limit,
          hasNextPage: page < totalPages,
          hasPrevPage: page > 1,
        },
        stats: {
          statusStats,
          userTypeStats,
          totalMessages: totalContacts,
        },
      },
    });
  } catch (error) {
    console.error("Error fetching contacts:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch contacts",
        ...(process.env.NODE_ENV === "development" && { error: error.message }),
      },
      { status: 500 }
    );
  }
}
