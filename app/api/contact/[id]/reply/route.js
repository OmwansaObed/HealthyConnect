// app/api/contact/[id]/reply/route.js
import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "../../../../../lib/db";
import { sendEmailResponse } from "../../../../../utils/sendEmailResponse";
import Contact from "../../../../../models/Contact";

/**
 * POST /api/contact/[id]/reply
 * Send a reply to a contact form submission
 */
export async function POST(request, context) {
  try {
    // Connect to database
    await connectDB();

    const { id } = await context.params;
    const body = await request.json();
    const { reply, repliedBy } = body;

    // Validate required fields
    if (!reply || !reply.trim()) {
      return NextResponse.json(
        { success: false, message: "Reply message is required" },
        { status: 400 }
      );
    }

    if (!repliedBy || !repliedBy.trim()) {
      return NextResponse.json(
        { success: false, message: "Replied by field is required" },
        { status: 400 }
      );
    }

    // Find the contact message
    const contact = await Contact.findById(id);
    if (!contact) {
      return NextResponse.json(
        { success: false, message: "Contact message not found" },
        { status: 404 }
      );
    }

    // Send email reply
    const emailResult = await sendEmailResponse({
      to: contact.email,
      subject: contact.subject,
      replyMessage: reply,
      originalMessage: contact.message,
      recipientName: contact.name,
      adminName: repliedBy,
    });

    if (!emailResult.success) {
      return NextResponse.json(
        {
          success: false,
          message: "Failed to send email reply",
          error: emailResult.error,
        },
        { status: 500 }
      );
    }

    // Update the contact record in database using your existing method
    const updatedContact = await contact.addReply(reply, repliedBy);

    // Also update additional fields for email tracking
    updatedContact.emailSent = true;
    updatedContact.emailMessageId = emailResult.messageId;
    await updatedContact.save();

    return NextResponse.json(
      {
        success: true,
        message: "Reply sent successfully",
        data: {
          contact: updatedContact,
          emailMessageId: emailResult.messageId,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error sending reply:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Internal server error",
        error:
          process.env.NODE_ENV === "development" ? error.message : undefined,
      },
      { status: 500 }
    );
  }
}

/**
 * GET /api/contact/[id]/reply
 * Get reply status for a contact message
 */
export async function GET(request, context) {
  try {
    await connectDB();

    const { id } = await context.params;

    const contact = await Contact.findById(id).select(
      "reply repliedBy repliedAt status emailSent emailMessageId name email subject message"
    );

    if (!contact) {
      return NextResponse.json(
        { success: false, message: "Contact message not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        data: {
          hasReply: !!contact.reply,
          reply: contact.reply,
          repliedBy: contact.repliedBy,
          repliedAt: contact.repliedAt,
          status: contact.status,
          emailSent: contact.emailSent,
          emailMessageId: contact.emailMessageId,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching reply status:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Internal server error",
        error:
          process.env.NODE_ENV === "development" ? error.message : undefined,
      },
      { status: 500 }
    );
  }
}
