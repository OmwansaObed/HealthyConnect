// app/api/contacts/route.js
import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "../../../lib/db";
import Contact from "../../../models/Contact.js";

// GET - Fetch all contacts with pagination and filtering
export async function GET(request) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page")) || 1;
    const limit = parseInt(searchParams.get("limit")) || 10;
    const status = searchParams.get("status");
    const userType = searchParams.get("userType");
    const search = searchParams.get("search");

    // Build query
    const query = {};
    if (status) query.status = status;
    if (userType) query.userType = userType;
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
        { subject: { $regex: search, $options: "i" } },
      ];
    }

    const skip = (page - 1) * limit;

    const [contacts, total] = await Promise.all([
      Contact.find(query)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      Contact.countDocuments(query),
    ]);

    const totalPages = Math.ceil(total / limit);

    return NextResponse.json({
      success: true,
      data: contacts,
      pagination: {
        currentPage: page,
        totalPages,
        totalItems: total,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1,
      },
    });
  } catch (error) {
    console.error("GET /api/contacts error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch contacts",
        message: error.message,
      },
      { status: 500 }
    );
  }
}

// POST - Create a new contact message
export async function POST(request) {
  try {
    await connectDB();

    const body = await request.json();

    // Validate required fields
    const { name, email, subject, message, userType } = body;

    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        {
          success: false,
          error: "Missing required fields",
          required: ["name", "email", "subject", "message"],
        },
        { status: 400 }
      );
    }

    // Create new contact
    const contact = new Contact({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      subject: subject.trim(),
      message: message.trim(),
      userType: userType || "professional",
    });

    await contact.save();

    // You could add email notification logic here
    // await sendNotificationEmail(contact);

    return NextResponse.json(
      {
        success: true,
        data: contact,
        message: "Contact message sent successfully",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("POST /api/contacts error:", error);

    if (error.name === "ValidationError") {
      return NextResponse.json(
        {
          success: false,
          error: "Validation error",
          details: Object.values(error.errors).map((err) => err.message),
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        error: "Failed to create contact message",
        message: error.message,
      },
      { status: 500 }
    );
  }
}

// DELETE - Delete multiple contacts (admin only)
export async function DELETE(request) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const ids = searchParams.get("ids")?.split(",");

    if (!ids || ids.length === 0) {
      return NextResponse.json(
        {
          success: false,
          error: "No contact IDs provided",
        },
        { status: 400 }
      );
    }

    const result = await Contact.deleteMany({
      _id: { $in: ids },
    });

    return NextResponse.json({
      success: true,
      message: `Successfully deleted ${result.deletedCount} contact(s)`,
      deletedCount: result.deletedCount,
    });
  } catch (error) {
    console.error("DELETE /api/contacts error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to delete contacts",
        message: error.message,
      },
      { status: 500 }
    );
  }
}
